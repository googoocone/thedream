'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { createClient } from '@/utils/supabase/client'
import HorizontalScholarshipCard from '@/components/HorizontalScholarshipCard'
import Link from 'next/link'
import LoginModal from '@/components/ui/LoginModal'

interface Scholarship {
    id: string;
    name: string;
    group_name?: string; // Added group_name
    foundation: string;
    amount: string;
    tags: string[];
    application_end: string;
    target_school_type?: string;
    special_criteria?: string[];
    min_gpa?: number;
}

interface ScholarshipListProps {
    initialFilters?: {
        birth?: string;
        edu?: string;
        major?: string;
        tag?: string;
        search?: string;
    };
    isGuestSearch?: boolean;
}

function calculateDDay(dateStr: string | null) {
    if (!dateStr) return "상시";
    const target = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    target.setHours(0, 0, 0, 0);

    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "마감";
    if (diffDays === 0) return "D-Day";
    return `D-${diffDays}`;
}

export default function ScholarshipList({ initialFilters, isGuestSearch = false }: ScholarshipListProps) {
    const [scholarships, setScholarships] = useState<Scholarship[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState(initialFilters?.search || '')
    const [visibleCount, setVisibleCount] = useState(8)
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
    const ITEMS_PER_LOAD = 8
    const supabase = createClient()
    const observerTarget = useRef(null)

    useEffect(() => {
        const fetchAndSortScholarships = async () => {
            setLoading(true)

            // 1. Fetch ALL scholarships (Added group_name)
            let query = supabase
                .from('scholarships')
                .select('id, name, group_name, foundation, amount, tags, application_end, target_school_type, target_major_category, target_universities, special_criteria, min_gpa')

            // 2. Search filter
            if (searchTerm) {
                query = query.ilike('name', `%${searchTerm}%`)
            }

            // 3. Category Filters
            if (initialFilters?.edu) {
                if (initialFilters.edu === 'university') {
                    query = query.in('target_school_type', ['university', 'college'])
                } else if (initialFilters.edu === 'high_school') {
                    query = query.eq('target_school_type', 'high_school')
                } else {
                    query = query.eq('target_school_type', initialFilters.edu)
                }
            }

            if (initialFilters?.major) {
                // Approximate mapping for major categories if needed
                if (initialFilters.major === 'arts_sports') {
                    // Match any category containing '예체능'
                    query = query.ilike('target_major_category', '%예체능%')
                } else if (initialFilters.major === 'stem') {
                    // Match Engineering OR Natural Sciences
                    // using .or() syntax for Supabase: field.ilike.val,field.ilike.val
                    query = query.or('target_major_category.ilike.%공학%,target_major_category.ilike.%자연%,target_major_category.ilike.%이공%,target_major_category.ilike.%과학%')
                } else {
                    query = query.eq('target_major_category', initialFilters.major)
                }
            }

            // Tag filtering (e.g. startup, social_support)
            if (initialFilters?.tag) {
                if (initialFilters.tag === 'social_support') {
                    // Social support covers various family/environment criteria
                    const socialCriteria = ['low_income', 'single_parent', 'multicultural', 'north_defector', 'farmer', 'work_student', 'disabled', 'veteran'];
                    query = query.overlaps('special_criteria', socialCriteria);
                } else if (initialFilters.tag === 'merit') {
                    // Merit: Requires grades (min_gpa > 0) AND accessible to 3.5 GPA (min_gpa <= 3.5)
                    query = query.gt('min_gpa', 0).lte('min_gpa', 3.5);
                } else {
                    query = query.contains('tags', [initialFilters.tag])
                }
            }

            const { data, error } = await query

            if (data) {
                // Deduplicate by group_name if exists, otherwise name (Client-side)
                const uniqueData = data.filter((scholarship, index, self) =>
                    index === self.findIndex((t) => (
                        (t.group_name || t.name) === (scholarship.group_name || scholarship.name)
                    ))
                );

                // 3. Custom Sorting: Active first, then Closed.
                const today = new Date();
                today.setHours(0, 0, 0, 0);

                const sorted = uniqueData.sort((a, b) => {
                    const dateA = a.application_end ? new Date(a.application_end) : new Date(9999, 11, 31);
                    const dateB = b.application_end ? new Date(b.application_end) : new Date(9999, 11, 31);

                    // Check if closed (date < today)
                    const isClosedA = dateA < today;
                    const isClosedB = dateB < today;

                    if (isClosedA !== isClosedB) {
                        return isClosedA ? 1 : -1; // Active (false) comes first
                    }

                    // If both active or both closed, sort by date ascending (closest first)
                    return dateA.getTime() - dateB.getTime();
                });

                setScholarships(sorted);
            } else if (error) {
                console.error("Error fetching scholarships:", error);
            }
            setLoading(false)
        }

        // Debounce search
        const timer = setTimeout(() => {
            fetchAndSortScholarships()
        }, 300)

        return () => clearTimeout(timer)
    }, [supabase, searchTerm]) // Removed 'initialFilters' from deps to avoid loop if object is unstable, but user didn't change this.

    // Infinite Scroll Observer
    const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
        const [target] = entries;
        if (target.isIntersecting && !loading) {
            setVisibleCount(prev => prev + ITEMS_PER_LOAD)
        }
    }, [loading]);

    useEffect(() => {
        const observer = new IntersectionObserver(handleObserver, {
            root: null,
            rootMargin: "20px",
            threshold: 1.0
        });

        const currentTarget = observerTarget.current;
        if (currentTarget) {
            observer.observe(currentTarget);
        }

        return () => {
            if (currentTarget) {
                observer.unobserve(currentTarget);
            }
        }
    }, [handleObserver]);

    // Reset visible count on search
    const displayedScholarships = scholarships.slice(0, visibleCount);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
        setVisibleCount(ITEMS_PER_LOAD)
    }

    return (
        <div>
            <LoginModal
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
            />

            {/* Guest Search Incentive Banner */}
            {isGuestSearch && (
                <div className="bg-gradient-to-r from-[#0984E3] to-[#74b9ff] rounded-2xl p-6 mb-8 text-white shadow-lg transform transition-all hover:scale-[1.01]">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div>
                            <h3 className="text-xl font-bold mb-2">
                                🚀 더 많은 장학금을 찾고 싶으신가요?
                            </h3>
                            <p className="text-blue-100">
                                프로필을 완성하면 <strong>수백 개의 맞춤 장학금</strong>을 더 발견할 수 있어요!
                                <br />
                                <span className="text-sm opacity-80">
                                    (현재 입력하신 정보: {initialFilters?.edu || '학력 미입력'}, {initialFilters?.major || '전공 미입력'})
                                </span>
                            </p>
                        </div>
                        <Link
                            href="/signup"
                            className="px-6 py-3 bg-white text-[#0984E3] font-bold rounded-xl hover:bg-blue-50 transition-colors shadow-md whitespace-nowrap"
                        >
                            3초 만에 가입하고 확인하기
                        </Link>
                    </div>
                </div>
            )}

            {/* Search Bar */}
            <div className="mb-6">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="장학금 명으로 검색해보세요"
                        value={searchTerm}
                        onChange={handleSearch}
                        className="w-full px-4 py-3 pl-10 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0984E3]/20 focus:border-[#0984E3] transition-all"
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        🔍
                    </span>
                </div>
            </div>

            {loading && scholarships.length === 0 ? (
                <div className="text-center py-20 text-gray-500">로딩 중...</div>
            ) : scholarships.length === 0 ? (
                <div className="text-center py-20">
                    <div className="text-4xl mb-4">📭</div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">검색 결과가 없습니다.</h3>
                </div>
            ) : (
                <>
                    <div className="flex flex-col gap-4 mb-8">
                        {displayedScholarships.map((scholarship) => (
                            isGuestSearch ? (
                                <div
                                    key={scholarship.id}
                                    onClick={() => setIsLoginModalOpen(true)}
                                    className="cursor-pointer"
                                >
                                    <HorizontalScholarshipCard
                                        dDay={calculateDDay(scholarship.application_end)}
                                        title={scholarship.group_name || scholarship.name} // Display Group Name
                                        location={scholarship.foundation}
                                        tags={scholarship.tags || []}
                                        amount={scholarship.amount}
                                    />
                                </div>
                            ) : (
                                <Link key={scholarship.id} href={`/scholarships/${scholarship.id}`}>
                                    <HorizontalScholarshipCard
                                        dDay={calculateDDay(scholarship.application_end)}
                                        title={scholarship.group_name || scholarship.name} // Display Group Name
                                        location={scholarship.foundation}
                                        tags={scholarship.tags || []}
                                        amount={scholarship.amount}
                                    />
                                </Link>
                            )
                        ))}
                    </div>

                    {/* Infinite Scroll Sentinel */}
                    {visibleCount < scholarships.length && (
                        <div ref={observerTarget} className="h-10 flex justify-center items-center">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#0984E3]"></div>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

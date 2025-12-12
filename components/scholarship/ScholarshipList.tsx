'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { createClient } from '@/utils/supabase/client'
import HorizontalScholarshipCard from '@/components/HorizontalScholarshipCard'
import Link from 'next/link'

interface Scholarship {
    id: string;
    name: string;
    foundation: string;
    amount: string;
    tags: string[];
    application_end: string;
}

interface ScholarshipListProps {
    initialFilters?: {
        birth?: string;
        edu?: string;
        major?: string;
        tag?: string;
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
    const [searchTerm, setSearchTerm] = useState('')
    const [visibleCount, setVisibleCount] = useState(8)
    const ITEMS_PER_LOAD = 8
    const supabase = createClient()
    const observerTarget = useRef(null)

    useEffect(() => {
        const fetchAndSortScholarships = async () => {
            setLoading(true)

            // 1. Fetch ALL scholarships (needed for client-side custom sorting)
            let query = supabase
                .from('scholarships')
                .select('id, name, foundation, amount, tags, application_end, target_school_type, target_major_category')

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
                    // Assuming DB value is '예체능' or similar. 
                    query = query.eq('target_major_category', '예체능')
                } else {
                    query = query.eq('target_major_category', initialFilters.major)
                }
            }

            // Tag filtering (e.g. startup, social_support)
            // Note: DB 'tags' column is text[], so use .contains
            // But 'category' might be better for 'startup'? OR 'special_criteria'?
            // Providing basic support for 'tag' filter if passed
            if (initialFilters?.tag) {
                // If tag is 'startup', maybe look in special_criteria or tags
                // For now, let's look in tags array
                query = query.contains('tags', [initialFilters.tag])
            }

            const { data, error } = await query

            if (data) {
                // Deduplicate by name (Client-side)
                const uniqueData = data.filter((scholarship, index, self) =>
                    index === self.findIndex((t) => (
                        t.name === scholarship.name
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
    }, [supabase, searchTerm])

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
                                    onClick={() => {
                                        if (confirm("상세 정보는 회원가입 후 확인할 수 있습니다.\n3초 만에 가입하고 모든 정보를 확인하세요! 🚀")) {
                                            window.location.href = "/signup";
                                        }
                                    }}
                                    className="cursor-pointer"
                                >
                                    <HorizontalScholarshipCard
                                        dDay={calculateDDay(scholarship.application_end)}
                                        title={scholarship.name}
                                        location={scholarship.foundation}
                                        tags={scholarship.tags || []}
                                        amount={scholarship.amount}
                                    />
                                </div>
                            ) : (
                                <Link key={scholarship.id} href={`/scholarships/${scholarship.id}`}>
                                    <HorizontalScholarshipCard
                                        dDay={calculateDDay(scholarship.application_end)}
                                        title={scholarship.name}
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

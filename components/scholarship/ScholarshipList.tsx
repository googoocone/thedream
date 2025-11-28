'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { createClient } from '@/utils/supabase/client'
import ScholarshipCard from '@/components/ScholarshipCard'
import Link from 'next/link'

interface Scholarship {
    id: string;
    name: string;
    foundation: string;
    amount: string;
    tags: string[];
    application_end: string;
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

export default function ScholarshipList() {
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
                .select('id, name, foundation, amount, tags, application_end')

            // 2. Search filter (can still be done on DB side to reduce data)
            if (searchTerm) {
                query = query.ilike('name', `%${searchTerm}%`)
            }

            const { data, error } = await query

            if (data) {
                // 3. Custom Sorting: Active first, then Closed.
                const today = new Date();
                today.setHours(0, 0, 0, 0);

                const sorted = data.sort((a, b) => {
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

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => {
            if (observerTarget.current) {
                observer.unobserve(observerTarget.current);
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        {displayedScholarships.map((scholarship) => (
                            <Link key={scholarship.id} href={`/scholarships/${scholarship.id}`}>
                                <ScholarshipCard
                                    dDay={calculateDDay(scholarship.application_end)}
                                    title={scholarship.name}
                                    location={scholarship.foundation}
                                    tags={scholarship.tags || []}
                                    amount={scholarship.amount}
                                />
                            </Link>
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

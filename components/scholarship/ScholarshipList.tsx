'use client'

import { useEffect, useState } from 'react'
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
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const ITEMS_PER_PAGE = 6
    const supabase = createClient()

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
                setTotalPages(Math.ceil(sorted.length / ITEMS_PER_PAGE));
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

    // 4. Client-side Pagination
    const paginatedScholarships = scholarships.slice(
        (page - 1) * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE
    );

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
        setPage(1) // Reset to first page on search
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

            {loading ? (
                <div className="text-center py-20 text-gray-500">로딩 중...</div>
            ) : scholarships.length === 0 ? (
                <div className="text-center py-20">
                    <div className="text-4xl mb-4">📭</div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">검색 결과가 없습니다.</h3>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        {paginatedScholarships.map((scholarship) => (
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

                    {/* Pagination */}
                    <div className="flex justify-center gap-2">
                        <button
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className="px-4 py-2 rounded-lg border border-gray-200 disabled:opacity-50 hover:bg-gray-50"
                        >
                            이전
                        </button>
                        <span className="px-4 py-2 text-gray-600">
                            {page} / {totalPages}
                        </span>
                        <button
                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                            className="px-4 py-2 rounded-lg border border-gray-200 disabled:opacity-50 hover:bg-gray-50"
                        >
                            다음
                        </button>
                    </div>
                </>
            )}
        </div>
    )
}

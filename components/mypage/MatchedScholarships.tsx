'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { calculateMatchScore, Scholarship, UserProfile, extractUserKeywords, detectScholarshipRegions } from '@/utils/matching'
import Link from 'next/link'

export default function MatchedScholarships() {
    const [matches, setMatches] = useState<{ scholarship: Scholarship, score: number }[]>([])
    const [loading, setLoading] = useState(true)
    const supabase = createClient()

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 1. Get User
                const { data: { user: authUser } } = await supabase.auth.getUser()

                if (!authUser) {
                    setLoading(false)
                    return
                }

                const { data: userData } = await supabase
                    .from('users')
                    .select('*')
                    .eq('id', authUser.id)
                    .single()

                if (!userData) {
                    setLoading(false)
                    return
                }

                // 2. Get All Scholarships
                const { data: scholarshipData } = await supabase
                    .from('scholarships')
                    .select('*')

                if (scholarshipData) {
                    // 3. Calculate Matches
                    const results = scholarshipData
                        .map(scholarship => ({
                            scholarship,
                            score: calculateMatchScore(userData as UserProfile, scholarship)
                        }))
                        .filter(result => result.score > 0) // Only keep matches with score > 0
                        .sort((a, b) => b.score - a.score) // Sort by score

                    setMatches(results)
                }
            } catch (error) {
                console.error('Error fetching matches:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [supabase])

    if (loading) return <div className="p-8 text-center text-gray-500">장학금 정보를 불러오는 중입니다...</div>

    if (matches.length === 0) {
        return (
            <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-100">
                <p className="text-gray-500 mb-2">현재 조건에 맞는 장학금이 없습니다.</p>
                <p className="text-sm text-gray-400">프로필 정보를 업데이트하거나 새로운 공고를 기다려주세요.</p>
            </div>
        )
    }

    // Separate into categories if needed, or just show list
    const openMatches = matches.filter(m => {
        const endDate = new Date(m.scholarship.application_end)
        const today = new Date()
        return endDate >= today
    })

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
                <h3 className="text-xl font-bold text-gray-900">추천 장학금</h3>
                <span className="bg-[var(--primary)] text-white text-xs px-2 py-1 rounded-full font-medium">
                    {matches.length}건
                </span>
            </div>

            <div className="grid gap-4">
                {matches.map(({ scholarship, score }) => (
                    <div key={scholarship.id} className="bg-white border border-gray-100 rounded-xl p-6 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <span className="text-sm text-gray-500 font-medium">{scholarship.foundation}</span>
                                <div className="flex items-center gap-2 mt-1">
                                    <h4 className="text-lg font-bold text-gray-900">{scholarship.name}</h4>
                                    <span className={`text-sm font-bold px-2 py-0.5 rounded ${score >= 80 ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                                        {score}점
                                    </span>
                                </div>
                            </div>
                            <Link href={`/scholarships/${scholarship.id}`} className="text-blue-500 text-sm hover:underline shrink-0 px-3 py-1 bg-blue-50 rounded-lg">
                                자세히 보기
                            </Link>
                        </div>

                        <div className="text-sm text-gray-600 space-y-1 mb-4">
                            <p>{scholarship.amount}</p>
                            <p className="text-gray-400 text-xs">신청기간: ~ {scholarship.application_end}</p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {/* Region Tags */}
                            {detectScholarshipRegions(scholarship).map((region, i) => (
                                <span key={`r-${i}`} className="text-xs bg-red-50 text-red-600 px-2 py-1 rounded">
                                    {region}
                                </span>
                            ))}
                            {/* Hash Tags */}
                            {scholarship.target_hashtags?.slice(0, 3).map((tag, i) => (
                                <span key={`t-${i}`} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

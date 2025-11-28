'use client'

import { useEffect, useState } from 'react'
import ManageInfo from './ManageInfo'
import ScholarshipList from '@/components/scholarship/ScholarshipList'
import { createClient } from '@/utils/supabase/client'
import { calculateMatchScore, Scholarship } from '@/utils/matching'
import ScholarshipCard from '@/components/ScholarshipCard'
import Link from 'next/link'

interface MyPageTabsProps {
    userData?: any;
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

export default function MyPageTabs({ userData }: MyPageTabsProps) {
    const [activeTab, setActiveTab] = useState('matched')
    const [matchedScholarships, setMatchedScholarships] = useState<(Scholarship & { score: number })[]>([])
    const [loading, setLoading] = useState(true)
    const supabase = createClient()

    const tabs = [
        { id: 'matched', label: '맞춤 장학금', icon: '🤖' },
        { id: 'all', label: '전체 장학금', icon: '📋' },
        { id: 'liked', label: '찜한 장학금', icon: '❤️' },
        { id: 'manage_info', label: '내 정보 관리', icon: '⚙️' },
    ]

    useEffect(() => {
        const fetchAndMatch = async () => {
            if (!userData) return;

            const { data: scholarships } = await supabase
                .from('scholarships')
                .select('*')
                .order('created_at', { ascending: false });

            if (scholarships) {
                const scored = scholarships.map((s: any) => ({
                    ...s,
                    score: calculateMatchScore(userData, s)
                }));

                // Sort by score desc
                scored.sort((a: any, b: any) => b.score - a.score);
                setMatchedScholarships(scored);
            }
            setLoading(false);
        }

        if (activeTab === 'matched') {
            fetchAndMatch();
        }
    }, [activeTab, userData, supabase])

    return (
        <div className="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100 min-h-[500px]">
            {/* Tabs Header */}
            <div className="flex border-b border-gray-100 mb-6 overflow-x-auto">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-6 py-4 text-sm font-bold transition-colors whitespace-nowrap ${activeTab === tab.id
                            ? 'text-[#FF9F43] border-b-2 border-[#FF9F43]'
                            : 'text-gray-400 hover:text-gray-600'
                            }`}
                    >
                        <span>{tab.icon}</span>
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div>
                {activeTab === 'manage_info' && <ManageInfo userData={userData} />}

                {activeTab === 'matched' && (
                    <div>
                        <div className="text-center mb-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">맞춤 장학금</h3>
                            <p className="text-gray-500">회원님의 프로필을 분석하여 가장 적합한 장학금을 추천해드립니다.</p>
                        </div>

                        {loading ? (
                            <div className="text-center py-20 text-gray-500">분석 중...</div>
                        ) : matchedScholarships.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {matchedScholarships.map((scholarship) => (
                                    <Link key={scholarship.id} href={`/scholarships/${scholarship.id}`} className="relative block">
                                        <div className="absolute top-4 right-4 z-10 bg-[#FF9F43] text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                                            {scholarship.score}% 일치
                                        </div>
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
                        ) : (
                            <div className="text-center py-20">
                                <div className="text-4xl mb-4">🤔</div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">추천할 장학금이 없어요.</h3>
                                <p className="text-gray-500">프로필 정보를 더 자세히 입력해보세요!</p>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'all' && (
                    <div>
                        <div className="text-center mb-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">전체 장학금</h3>
                            <p className="text-gray-500">등록된 모든 장학금을 확인해보세요.</p>
                        </div>
                        <ScholarshipList />
                    </div>
                )}

                {activeTab === 'liked' && (
                    <div className="text-center py-20">
                        <div className="text-4xl mb-4">❤️</div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">찜한 장학금</h3>
                        <p className="text-gray-500">관심 있는 장학금을 모아보세요.</p>
                        <p className="text-sm text-gray-400 mt-2">(준비 중입니다)</p>
                    </div>
                )}
            </div>
        </div>
    )
}

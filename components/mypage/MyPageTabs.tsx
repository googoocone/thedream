'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import ManageInfo from './ManageInfo'
import ScholarshipList from '@/components/scholarship/ScholarshipList'
import { createClient } from '@/utils/supabase/client'
import { calculateMatchScore, Scholarship } from '@/utils/matching'
import HorizontalScholarshipCard from '@/components/HorizontalScholarshipCard'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import SubscriptionModal from '@/components/SubscriptionModal'
import ScholarshipCalendar from './ScholarshipCalendar'
import DocumentVault from './DocumentVault'

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
    const searchParams = useSearchParams()
    const initialTab = searchParams.get('tab') || 'matched'
    const [activeTab, setActiveTab] = useState(initialTab)
    const [matchedScholarships, setMatchedScholarships] = useState<(Scholarship & { score: number })[]>([])
    const [visibleCount, setVisibleCount] = useState(8)
    const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false)
    const ITEMS_PER_LOAD = 8
    const observerTarget = useRef(null)
    const [loading, setLoading] = useState(true)
    const supabase = createClient()

    const tabs = [
        { id: 'calendar', label: '장학금 달력', icon: '📅' },
        { id: 'matched', label: '맞춤 장학금', icon: '🤖' },
        { id: 'all', label: '전체 장학금', icon: '📋' },
        { id: 'liked', label: '찜한 장학금', icon: '❤️' },
        { id: 'manage_info', label: '내 정보 관리', icon: '⚙️' },
        { id: 'documents', label: '서류 보관함', icon: '🗄️' },
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

                // Filter out disqualified (score 0) and sort by score desc
                const filtered = scored.filter((s: any) => s.score > 0);
                filtered.sort((a: any, b: any) => b.score - a.score);
                setMatchedScholarships(filtered);
            }
            setLoading(false);
        }

        if (activeTab === 'matched') {
            fetchAndMatch();
        }
    }, [activeTab, userData, supabase])

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
    }, [handleObserver, activeTab]); // Re-attach observer when tab changes

    const displayedMatchedScholarships = matchedScholarships.slice(0, visibleCount);

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
                            <>
                                <div className="flex flex-col gap-4">
                                    {displayedMatchedScholarships.map((scholarship, index) => {
                                        // Subscription Logic:
                                        // If user is NOT subscribed, only the FIRST item (index 0) is unlocked.
                                        // All others (index > 0) are locked.
                                        const isLocked = !userData?.is_subscribed && index > 0;

                                        return (
                                            <div key={scholarship.id} onClick={(e) => {
                                                if (isLocked) {
                                                    e.preventDefault();
                                                    setIsSubscriptionModalOpen(true);
                                                }
                                            }}>
                                                {isLocked ? (
                                                    // Locked Card: No Link, just the card with blur
                                                    <HorizontalScholarshipCard
                                                        dDay={calculateDDay(scholarship.application_end)}
                                                        title={scholarship.name}
                                                        location={scholarship.foundation}
                                                        tags={scholarship.tags || []}
                                                        amount={scholarship.amount}
                                                        isLocked={true}
                                                    />
                                                ) : (
                                                    // Unlocked Card: Link to Detail Page
                                                    <Link href={`/scholarships/${scholarship.id}`}>
                                                        <HorizontalScholarshipCard
                                                            dDay={calculateDDay(scholarship.application_end)}
                                                            title={scholarship.name}
                                                            location={scholarship.foundation}
                                                            tags={scholarship.tags || []}
                                                            amount={scholarship.amount}
                                                            isLocked={false}
                                                            score={scholarship.score}
                                                        />
                                                    </Link>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                                {/* Infinite Scroll Sentinel */}
                                {visibleCount < matchedScholarships.length && (
                                    <div ref={observerTarget} className="h-10 flex justify-center items-center mt-4">
                                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#0984E3]"></div>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="text-center py-20">
                                <div className="text-4xl mb-4">🤔</div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">추천할 장학금이 없어요.</h3>
                                <p className="text-gray-500">프로필 정보를 더 자세히 입력해보세요!</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Subscription Modal */}
                <SubscriptionModal
                    isOpen={isSubscriptionModalOpen}
                    onClose={() => setIsSubscriptionModalOpen(false)}
                    userId={userData?.id}
                />

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

                {activeTab === 'calendar' && <ScholarshipCalendar />}
                {activeTab === 'documents' && <DocumentVault userData={userData} />}
            </div>
        </div>
    )
}

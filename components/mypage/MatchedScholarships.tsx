'use client'

import { useState } from 'react'

// Mock data for scholarships
const MOCK_SCHOLARSHIPS = [
    {
        id: 1,
        title: '희망 사다리 장학금 1유형',
        foundation: '한국장학재단',
        amount: '등록금 전액 + 생활비 200만원',
        dday: 'D-15',
        status: 'open',
        endDate: '2025.12.31'
    },
    {
        id: 2,
        title: '푸른등대 기부장학금',
        foundation: '한국장학재단',
        amount: '생활비 150만원',
        dday: 'D-5',
        status: 'open',
        endDate: '2025.12.20'
    },
    {
        id: 3,
        title: '드림 장학금',
        foundation: '드림재단',
        amount: '학업장려금 100만원',
        dday: '마감',
        status: 'closed',
        endDate: '2025.11.30'
    },
    {
        id: 4,
        title: '미래 인재 육성 장학금',
        foundation: '미래재단',
        amount: '등록금 50%',
        dday: '예정',
        status: 'upcoming',
        endDate: '2026.03.01'
    }
]

export default function MatchedScholarships() {
    const openScholarships = MOCK_SCHOLARSHIPS.filter(s => s.status === 'open')
    const closedScholarships = MOCK_SCHOLARSHIPS.filter(s => s.status !== 'open')

    return (
        <div className="space-y-12">
            {/* Open Scholarships */}
            <section>
                <div className="flex items-center gap-2 mb-6">
                    <h3 className="text-xl font-bold text-gray-900">지원 가능</h3>
                    <span className="bg-[var(--primary)] text-white text-xs px-2 py-1 rounded-full font-medium">
                        {openScholarships.length}
                    </span>
                </div>

                <div className="grid gap-4">
                    {openScholarships.map((scholarship) => (
                        <div key={scholarship.id} className="bg-white border border-gray-100 rounded-xl p-6 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-sm text-gray-500 font-medium">{scholarship.foundation}</span>
                                <span className="text-[var(--primary)] font-bold bg-orange-50 px-3 py-1 rounded-full text-sm">
                                    {scholarship.dday}
                                </span>
                            </div>
                            <h4 className="text-lg font-bold text-gray-900 mb-2">{scholarship.title}</h4>
                            <p className="text-gray-600 text-sm mb-4">{scholarship.amount}</p>
                            <div className="text-xs text-gray-400">
                                마감일: {scholarship.endDate}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Closed/Upcoming Scholarships */}
            <section>
                <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">다음 기회에</h3>
                    <p className="text-gray-500 text-sm bg-gray-50 p-4 rounded-lg border border-gray-100">
                        현재 지원기간이 아니지만 적합한 장학 리스트를 추천합니다. <br className="md:hidden" />
                        기존 내용을 확인하고 차기 선발을 노려보세요.
                    </p>
                </div>

                <div className="grid gap-4">
                    {closedScholarships.map((scholarship) => (
                        <div key={scholarship.id} className="bg-gray-50 border border-gray-100 rounded-xl p-6 opacity-75 hover:opacity-100 transition-opacity">
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-sm text-gray-500 font-medium">{scholarship.foundation}</span>
                                <span className="text-gray-500 font-medium bg-gray-200 px-3 py-1 rounded-full text-sm">
                                    {scholarship.status === 'upcoming' ? '예정' : '마감'}
                                </span>
                            </div>
                            <h4 className="text-lg font-bold text-gray-700 mb-2">{scholarship.title}</h4>
                            <p className="text-gray-500 text-sm mb-4">{scholarship.amount}</p>
                            <div className="text-xs text-gray-400">
                                {scholarship.status === 'upcoming' ? '오픈예정' : '마감일'}: {scholarship.endDate}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}

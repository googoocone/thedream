'use client'

import { useState } from 'react'
import ManageInfo from './ManageInfo'

export default function MyPageTabs() {
    const [activeTab, setActiveTab] = useState('내 정보 관리')

    const tabs = [
        { id: 'liked', label: '찜한 장학금', icon: '❤️' },
        { id: 'applied', label: '지원한 장학금', icon: '📋' },
        { id: 'ai_rec', label: 'AI 추천', icon: '🤖' },
        { id: 'manage_info', label: '내 정보 관리', icon: '⚙️' },
    ]

    return (
        <div className="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100 min-h-[500px]">
            {/* Tabs Header */}
            <div className="flex border-b border-gray-100 mb-6 overflow-x-auto">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.label)}
                        className={`flex items-center gap-2 px-6 py-4 text-sm font-bold transition-colors whitespace-nowrap ${activeTab === tab.label
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
                {activeTab === '내 정보 관리' ? (
                    <ManageInfo />
                ) : (
                    <div className="text-center py-20">
                        <div className="text-4xl mb-4">🚧</div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{activeTab} 준비 중</h3>
                        <p className="text-gray-500">아직 해당 기능이 구현되지 않았습니다.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

'use client'

import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

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

export default function ScholarshipDetailPage() {
    const params = useParams();
    const id = params?.id as string;
    const [scholarship, setScholarship] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('info');
    const supabase = createClient();

    useEffect(() => {
        if (!id) return;

        const fetchScholarship = async () => {
            const { data, error } = await supabase
                .from('scholarships')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                console.error("Error fetching scholarship:", error);
                setLoading(false);
                return;
            }

            if (data) {
                setScholarship(data);
            }
            setLoading(false);
        };
        fetchScholarship();
    }, [id, supabase]);

    if (loading) return <div className="min-h-screen flex items-center justify-center">로딩 중...</div>;
    if (!scholarship) return notFound();

    const dDay = calculateDDay(scholarship.application_end);

    return (
        <div className="min-h-screen bg-gray-50 pb-32">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-[#00C6FF] to-[#0072FF] text-white pt-12 pb-24 px-6 relative overflow-hidden">
                <div className="max-w-4xl mx-auto relative z-10">
                    <Link href="/mypage" className="inline-block text-white/80 hover:text-white mb-6 transition-colors">
                        ← 목록으로
                    </Link>
                    <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                        {scholarship.name}
                    </h1>

                    <div className="flex flex-wrap gap-4">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 flex items-center gap-3">
                            <span className="text-2xl">📅</span>
                            <div>
                                <p className="text-xs text-white/80">마감일</p>
                                <p className="font-bold">
                                    {scholarship.application_end ? new Date(scholarship.application_end).toLocaleDateString() : '상시 모집'}
                                    <span className="ml-2 text-[#FFD700]">{dDay}</span>
                                </p>
                            </div>
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 flex items-center gap-3">
                            <span className="text-2xl">💰</span>
                            <div>
                                <p className="text-xs text-white/80">지원 금액</p>
                                <p className="font-bold">{scholarship.amount}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Decorative Circle */}
                <div className="absolute -right-20 -top-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
            </div>

            {/* Main Content Container */}
            <div className="max-w-4xl mx-auto px-6 -mt-12 relative z-20">

                {/* Tabs */}
                <div className="bg-white rounded-t-2xl shadow-sm border-b border-gray-100 flex overflow-hidden">
                    {[
                        { id: 'info', label: '📑 장학 정보' },
                        { id: 'selection', label: '🎯 선발 기준' },
                        { id: 'contact', label: '📞 접수 / 문의처' },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-1 py-4 text-center font-bold transition-colors ${activeTab === tab.id
                                    ? 'text-[#0072FF] border-b-2 border-[#0072FF] bg-blue-50/30'
                                    : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="bg-white rounded-b-2xl shadow-sm p-8 min-h-[400px]">

                    {/* Tab 1: Scholarship Info */}
                    {activeTab === 'info' && (
                        <div className="space-y-8">
                            {/* Target Card */}
                            <div className="border border-gray-100 rounded-2xl p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <span className="text-xl">🎯</span> 장학 대상
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-gray-50 p-4 rounded-xl">
                                        <p className="text-xs text-gray-500 mb-1">장학 종류</p>
                                        <p className="font-bold text-gray-800">{scholarship.category || '기타'}</p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-xl">
                                        <p className="text-xs text-gray-500 mb-1">후원 기관</p>
                                        <p className="font-bold text-gray-800">{scholarship.foundation}</p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-xl col-span-1 md:col-span-2">
                                        <p className="text-xs text-gray-500 mb-1">선발 대상</p>
                                        <p className="font-bold text-gray-800">{scholarship.target_description || '-'}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Benefits Card */}
                            <div className="border border-gray-100 rounded-2xl p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <span className="text-xl">✨</span> 장학 혜택
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex gap-4">
                                        <span className="text-gray-500 min-w-[80px]">혜택 유형</span>
                                        <span className="font-medium text-gray-800">{scholarship.benefit_type || '-'}</span>
                                    </div>
                                    <div className="flex gap-4">
                                        <span className="text-gray-500 min-w-[80px]">지원 금액</span>
                                        <span className="font-medium text-gray-800">{scholarship.amount}</span>
                                    </div>
                                    {scholarship.extra_benefits && (
                                        <div className="flex gap-4">
                                            <span className="text-gray-500 min-w-[80px]">추가 혜택</span>
                                            <span className="font-medium text-gray-800">{scholarship.extra_benefits}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Payment Method Card */}
                            <div className="border border-gray-100 rounded-2xl p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <span className="text-xl">📋</span> 지원 방식
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex gap-4">
                                        <span className="text-gray-500 min-w-[80px]">지급 방식</span>
                                        <span className="font-medium text-gray-800">{scholarship.payment_method || '-'}</span>
                                    </div>
                                    <div className="flex gap-4">
                                        <span className="text-gray-500 min-w-[80px]">지급 기간</span>
                                        <span className="font-medium text-gray-800">{scholarship.payment_period || '-'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Tab 2: Selection Criteria */}
                    {activeTab === 'selection' && (
                        <div className="space-y-8">
                            {/* Eligibility Card */}
                            <div className="border border-gray-100 rounded-2xl p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <span className="text-xl">🎓</span> 선발 대상
                                </h3>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {scholarship.tags?.map((tag: string, idx: number) => (
                                        <span key={idx} className="bg-[#FF9F43] text-white px-3 py-1 rounded-full text-sm font-bold">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                    {scholarship.target_description}
                                </p>
                            </div>

                            {/* Detailed Criteria Card */}
                            <div className="border border-gray-100 rounded-2xl p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <span className="text-xl">📝</span> 상세 자격 요건
                                </h3>
                                <div className="bg-gray-50 p-6 rounded-xl">
                                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                        {scholarship.eligibility || '상세 자격 요건이 없습니다.'}
                                    </p>
                                </div>
                            </div>

                            {/* Selection Count Card */}
                            <div className="border border-gray-100 rounded-2xl p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <span className="text-xl">👥</span> 선발 인원
                                </h3>
                                <p className="text-xl font-bold text-gray-800">
                                    {scholarship.selection_count || '-'}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Tab 3: Contact */}
                    {activeTab === 'contact' && (
                        <div className="space-y-8">
                            {/* Application Method Card */}
                            <div className="border border-gray-100 rounded-2xl p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <span className="text-xl">✅</span> 접수 방법
                                </h3>
                                <div className="bg-gray-50 p-6 rounded-xl">
                                    <p className="font-bold text-gray-800 mb-2">{scholarship.application_method}</p>
                                    <p className="text-sm text-gray-500">
                                        접수 기간: {scholarship.application_period || `${scholarship.application_start} ~ ${scholarship.application_end}`}
                                    </p>
                                </div>
                            </div>

                            {/* Required Documents Card */}
                            <div className="border border-gray-100 rounded-2xl p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <span className="text-xl">📂</span> 제출 서류
                                </h3>
                                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                    {scholarship.required_documents || '-'}
                                </p>
                            </div>

                            {/* Contact Info Card */}
                            <div className="border border-gray-100 rounded-2xl p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <span className="text-xl">📞</span> 문의처
                                </h3>
                                <p className="text-gray-700 font-medium">
                                    {scholarship.contact || '-'}
                                </p>
                            </div>

                            {/* Reference Site Card */}
                            {scholarship.link && (
                                <div className="border border-gray-100 rounded-2xl p-6">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <span className="text-xl">🔗</span> 참고 사이트
                                    </h3>
                                    <a
                                        href={scholarship.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[#0072FF] hover:underline break-all"
                                    >
                                        {scholarship.link}
                                    </a>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Sticky Footer */}
            <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] z-50">
                <div className="max-w-4xl mx-auto flex justify-center">
                    <a
                        href={scholarship.link || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gradient-to-r from-[#FF9F43] to-[#FF6B6B] text-white text-lg font-bold py-4 px-12 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2"
                    >
                        지원하기 🚀
                    </a>
                </div>
            </div>
        </div>
    );
}

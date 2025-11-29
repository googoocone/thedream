'use client'

import React from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

interface SubscriptionModalProps {
    isOpen: boolean;
    onClose: () => void;
    userId: string;
}

export default function SubscriptionModal({ isOpen, onClose, userId }: SubscriptionModalProps) {
    const router = useRouter()
    const supabase = createClient()

    if (!isOpen) return null;

    const handleSubscribe = async () => {
        // Mock Payment Process
        // In a real app, this would integrate with a payment gateway (Toss, KakaoPay, etc.)

        const confirmed = confirm("월 4,900원 결제를 진행하시겠습니까? (테스트: 확인 시 바로 구독됨)");
        if (!confirmed) return;

        try {
            // Update user subscription status
            const { error } = await supabase
                .from('users')
                .update({ is_subscribed: true })
                .eq('id', userId);

            if (error) throw error;

            alert("구독이 완료되었습니다! 모든 장학금을 확인하세요.");
            onClose();
            router.refresh(); // Refresh to update UI
        } catch (error) {
            console.error('Subscription error:', error);
            alert("결제 처리 중 오류가 발생했습니다.");
        }
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl transform transition-all animate-in fade-in zoom-in duration-200">

                {/* Header Image / Gradient */}
                <div className="h-32 bg-gradient-to-br from-[#FF9F43] to-[#FF6B6B] relative flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                    <div className="text-center text-white z-10">
                        <div className="text-4xl mb-1">🔓</div>
                        <h2 className="text-xl font-bold">Premium Plan</h2>
                    </div>

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Body */}
                <div className="p-8 text-center space-y-6">
                    <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-gray-900">
                            모든 장학금을<br />확인하고 싶으신가요?
                        </h3>
                        <p className="text-gray-500">
                            커피 한 잔 값으로<br />
                            <span className="text-[#FF6B6B] font-bold">300만 원 장학금</span> 기회를 잡으세요.
                        </p>
                    </div>

                    {/* Features List */}
                    <div className="bg-gray-50 rounded-2xl p-5 text-left space-y-3">
                        <div className="flex items-center gap-3">
                            <span className="text-[#0984E3]">✅</span>
                            <span className="text-gray-700 font-medium">모든 맞춤 장학금 리스트 잠금 해제</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-[#0984E3]">✅</span>
                            <span className="text-gray-700 font-medium">마감 임박 장학금 알림 (D-Day)</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-[#0984E3]">✅</span>
                            <span className="text-gray-700 font-medium">합격자 데이터 열람 (준비중)</span>
                        </div>
                    </div>

                    {/* Price & Action */}
                    <div className="space-y-3">
                        <div className="text-center">
                            <span className="text-gray-400 line-through text-sm">월 9,900원</span>
                            <span className="ml-2 text-2xl font-bold text-[#0984E3]">월 4,900원</span>
                        </div>
                        <button
                            onClick={handleSubscribe}
                            className="w-full py-4 bg-[#0984E3] hover:bg-[#0072FF] text-white rounded-xl font-bold text-lg shadow-lg shadow-blue-200 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                        >
                            지금 잠금 해제하기
                        </button>
                        <p className="text-xs text-gray-400">
                            언제든지 해지 가능합니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

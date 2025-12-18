'use client'

import { createClient } from '@/utils/supabase/client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Lock } from 'lucide-react'
import Link from 'next/link'

interface LoginModalProps {
    isOpen: boolean
    onClose: () => void
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-colors"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", duration: 0.5 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-white rounded-2xl shadow-2xl z-50 overflow-hidden"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors p-1"
                        >
                            <X size={20} />
                        </button>

                        <div className="p-8 text-center">
                            {/* Icon */}
                            <div className="w-16 h-16 bg-[#eaf4fe] rounded-full mx-auto mb-6 flex items-center justify-center text-[#0984E3]">
                                <Lock size={32} />
                            </div>

                            {/* Content */}
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                회원가입이 필요해요
                            </h3>
                            <p className="text-gray-500 mb-8 leading-relaxed text-sm">
                                상세 정보는 가입 후 확인할 수 있습니다.<br />
                                <strong>3초 만에 가입</strong>하고 혜택을 놓치지 마세요! 🚀
                            </p>

                            {/* Buttons */}
                            <div className="space-y-3">
                                <button
                                    type="button"
                                    onClick={async () => {
                                        const supabase = createClient()
                                        await supabase.auth.signInWithOAuth({
                                            provider: 'kakao',
                                            options: {
                                                redirectTo: `${window.location.origin}/auth/callback`,
                                                queryParams: {
                                                    scope: 'profile_nickname',
                                                },
                                            },
                                        })
                                    }}
                                    className="relative flex w-full items-center justify-center gap-2 rounded-xl bg-[#FEE500] py-3.5 text-sm font-semibold text-[#000000] hover:bg-[#FDD835] active:scale-[0.98] transition-all"
                                >
                                    <img
                                        src="/kakao-talk.png"
                                        alt="Kakao Talk"
                                        className="w-5 h-5 absolute left-4"
                                    />
                                    카카오로 3초 만에 시작하기
                                </button>

                                <div className="relative flex py-2 items-center">
                                    <div className="flex-grow border-t border-gray-200"></div>
                                    <span className="flex-shrink-0 mx-4 text-gray-400 text-xs">또는</span>
                                    <div className="flex-grow border-t border-gray-200"></div>
                                </div>

                                <Link
                                    href="/signup"
                                    className="block w-full py-3.5 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 active:scale-[0.98] transition-all"
                                >
                                    이메일로 회원가입
                                </Link>
                                <div className="flex justify-center items-center gap-2 text-sm text-gray-400">
                                    <span>이미 계정이 있으신가요?</span>
                                    <Link
                                        href="/login"
                                        className="text-gray-600 font-medium hover:text-[#0984E3] hover:underline underline-offset-4"
                                    >
                                        로그인
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}

'use client'

import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { User } from '@supabase/supabase-js'
import { useState } from 'react'

export default function AuthButton({ user }: { user: User | null }) {
    const router = useRouter()
    const supabase = createClient()
    const [isOpen, setIsOpen] = useState(false)

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.refresh()
    }

    return (
        <div className="flex gap-3 items-center relative">
            {user ? (
                <div className="relative">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-sm font-medium text-white bg-[var(--primary)] hover:opacity-90 px-4 py-2 rounded-full transition-opacity flex items-center gap-2 cursor-pointer"
                    >
                        내 계정
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    </button>

                    {isOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 z-50 ring-1 ring-black ring-opacity-5 border border-gray-100">
                            <Link
                                href="/mypage"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                마이페이지
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                로그아웃
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <>
                    <Link
                        href="/login"
                        className="text-sm font-medium text-gray-600 hover:text-gray-900 px-3 py-2"
                    >
                        로그인
                    </Link>
                    <Link
                        href="/signup"
                        className="text-sm font-medium text-white bg-[var(--primary)] hover:opacity-90 px-4 py-2 rounded-md transition-opacity"
                    >
                        회원가입
                    </Link>
                </>
            )}
        </div>
    )
}

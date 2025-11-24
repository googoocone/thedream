'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { User } from '@supabase/supabase-js'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import AuthButton from './AuthButton'

export default function Navigation({ user }: { user: User | null }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const router = useRouter()
    const supabase = createClient()

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.refresh()
        setIsMenuOpen(false)
    }

    return (
        <nav className="w-full h-[60px] flex justify-between items-center px-6 max-w-7xl mx-auto relative z-50">
            {/* Logo Section */}
            <Link href="/" className="flex items-center z-50">
                <Image
                    src="/logo.png"
                    alt="The Dream Logo"
                    width={45}
                    height={46}
                    className="object-contain"
                />
                <span className="text-2xl font-bold text-[var(--primary)] hidden md:block">
                    The Dream
                </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:block">
                <AuthButton user={user} />
            </div>

            {/* Mobile Hamburger Button */}
            <button
                className="md:hidden z-50 p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                <div className="w-6 h-5 flex flex-col justify-between">
                    <span className={`block w-full h-0.5 bg-black transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2.5' : ''}`} />
                    <span className={`block w-full h-0.5 bg-black transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
                    <span className={`block w-full h-0.5 bg-black transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                </div>
            </button>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 bg-white z-40 transition-transform duration-300 ease-in-out md:hidden pt-[80px] px-6 ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'
                    }`}
            >
                <div className="flex flex-col gap-4 text-lg font-medium">
                    {user ? (
                        <>
                            <div className="py-4 border-b border-gray-100">
                                <span className="text-gray-500 text-sm">안녕하세요,</span><br />
                                <span className="text-[var(--primary)] font-bold">{user.email?.split('@')[0]}</span>님
                            </div>
                            <Link
                                href="/mypage"
                                className="py-2 hover:text-[var(--primary)]"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                마이페이지
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="text-left py-2 hover:text-[var(--primary)]"
                            >
                                로그아웃
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="py-2 hover:text-[var(--primary)]"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                로그인
                            </Link>
                            <Link
                                href="/signup"
                                className="py-2 hover:text-[var(--primary)]"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                회원가입
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
}

'use default'
'use client'

import { createClient } from '@/utils/supabase/client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

import LoadingOverlay from '@/components/ui/LoadingOverlay'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()
    const supabase = createClient()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const { data: { user }, error: signInError } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (signInError) {
            setError(signInError.message)
            setLoading(false)
        } else if (user) {
            // Check if user has a profile with nickname
            const { data: profile } = await supabase
                .from('users')
                .select('nickname')
                .eq('id', user.id)
                .single()

            if (!profile?.nickname) {
                router.push('/profile/edit?step=1')
            } else {
                router.push('/')
            }
            router.refresh()
        }
    }

    const handleKakaoLogin = async () => {
        setLoading(true)
        setError(null)
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'kakao',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
                queryParams: {
                    scope: 'account_email,profile_nickname',
                },
            },
        })

        if (error) {
            setError(error.message)
            setLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-white">
            <LoadingOverlay isVisible={loading} message="로그인 중입니다..." />
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <h2 className="text-sm font-bold text-gray-900">
                        로그인
                    </h2>
                </div>

                <form className="mt-8 space-y-4" onSubmit={handleLogin}>
                    <div className="space-y-4">
                        <div>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="relative block w-full h-[56px] rounded-full border-0 py-3 px-5 text-gray-900 bg-gray-100 ring-0 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 outline-none"
                                placeholder="이메일"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="relative block w-full h-[56px] rounded-full border-0 py-3 px-5 text-gray-900 bg-gray-100 ring-0 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 outline-none"
                                placeholder="비밀번호"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm text-center">{error}</div>
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative flex w-full h-[56px] justify-center items-center rounded-full bg-[var(--primary)] px-3 py-3 text-sm font-semibold text-white hover:bg-[var(--primary)]/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:opacity-50"
                        >
                            {loading ? '로그인 중...' : '로그인'}
                        </button>
                    </div>

                    <div className="flex items-center justify-center gap-4 text-xs text-blue-400 mt-4">
                        <Link href="/signup" className="hover:underline">Sign Up</Link>
                        <Link href="/forgot-password" className="hover:underline">Forgot Password</Link>
                        <Link href="/contact" className="hover:underline">Contact Us</Link>
                    </div>

                    <div className="relative mt-8">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t border-gray-200" />
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-white px-2 text-sm text-gray-500">or</span>
                        </div>
                    </div>

                    <div className="mt-6">
                        <button
                            type="button"
                            onClick={handleKakaoLogin}
                            disabled={loading}
                            className="group relative flex w-full items-center justify-center gap-2 rounded-full bg-white border border-gray-200 hover:border-gray-400 px-3 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 disabled:opacity-50"
                        >
                            <Image
                                src="/kakao-talk.png"
                                alt="Kakao Talk"
                                width={20}
                                height={20}
                                className="w-5 h-5"
                            />
                            카카오로 로그인
                        </button>
                    </div>
                </form>

                <div className="mt-12 text-center">
                    <p className="text-xs text-gray-400">
                        개인정보 보호 정책
                    </p>
                </div>
            </div>
        </div>
    )
}

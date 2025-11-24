'use default'
'use client'

import { createClient } from '@/utils/supabase/client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function SignupPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [message, setMessage] = useState<string | null>(null)
    const supabase = createClient()

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        setMessage(null)

        if (password !== confirmPassword) {
            setError("Passwords do not match")
            setLoading(false)
            return
        }

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${window.location.origin}/auth/callback`,
            },
        })

        if (error) {
            setError(error.message)
        } else {
            setMessage('Check your email for the confirmation link!')
        }
        setLoading(false)
    }

    const handleKakaoSignUp = async () => {
        setLoading(true)
        setError(null)
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'kakao',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
                queryParams: {
                    scope: 'profile_nickname',
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
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <h2 className="text-sm font-bold text-gray-900">
                        회원가입
                    </h2>
                </div>

                <form className="mt-8 space-y-4" onSubmit={handleSignUp}>
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
                                autoComplete="new-password"
                                required
                                className="relative block w-full h-[56px] rounded-full border-0 py-3 px-5 text-gray-900 bg-gray-100 ring-0 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 outline-none"
                                placeholder="비밀번호"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                id="confirm-password"
                                name="confirm-password"
                                type="password"
                                autoComplete="new-password"
                                required
                                className="relative block w-full h-[56px] rounded-full border-0 py-3 px-5 text-gray-900 bg-gray-100 ring-0 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 outline-none"
                                placeholder="비밀번호 확인"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm text-center">{error}</div>
                    )}
                    {message && (
                        <div className="text-green-500 text-sm text-center">{message}</div>
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative flex w-full h-[56px] justify-center items-center rounded-full bg-black px-3 py-3 text-sm font-semibold text-white hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:opacity-50"
                        >
                            {loading ? '가입 중...' : '회원가입'}
                        </button>
                    </div>

                    <div className="flex items-center justify-center gap-4 text-xs text-blue-400 mt-4">
                        <Link href="/login" className="hover:underline">Already have an account? Login</Link>
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
                            onClick={handleKakaoSignUp}
                            disabled={loading}
                            className="group relative flex w-full items-center justify-center gap-2 rounded-full bg-white border border-gray-200 px-3 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 disabled:opacity-50"
                        >
                            <Image
                                src="/kakao-talk.png"
                                alt="Kakao Talk"
                                width={20}
                                height={20}
                                className="w-5 h-5"
                            />
                            카카오로 회원가입
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

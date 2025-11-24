'use client'

import { createClient } from '@/utils/supabase/client'
import { useState } from 'react'
import Link from 'next/link'

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const supabase = createClient()

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        setMessage(null)

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/auth/callback?next=/auth/update-password`,
        })

        if (error) {
            setError(error.message)
        } else {
            setMessage('Check your email for the password reset link!')
        }
        setLoading(false)
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <h2 className="text-sm font-bold text-gray-900">
                        비밀번호 재설정
                    </h2>
                    <p className="mt-2 text-xs text-gray-600">
                        가입한 이메일 주소를 입력하시면 재설정 링크를 보내드립니다.
                    </p>
                </div>

                <form className="mt-8 space-y-4" onSubmit={handleResetPassword}>
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
                            {loading ? '링크 보내기...' : '재설정 링크 보내기'}
                        </button>
                    </div>

                    <div className="flex items-center justify-center gap-4 text-xs text-blue-400 mt-4">
                        <Link href="/login" className="hover:underline">로그인으로 돌아가기</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

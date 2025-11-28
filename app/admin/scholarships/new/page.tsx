'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

export default function NewScholarshipPage() {
    const router = useRouter()
    const supabase = createClient()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        foundation: '',
        description: '',
        amount: '',
        application_start: '',
        application_end: '',
        tags: '' // Comma separated
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        const { error } = await supabase
            .from('scholarships')
            .insert({
                ...formData,
                tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean)
            })

        if (error) {
            alert('등록 실패: ' + error.message)
        } else {
            alert('장학금이 등록되었습니다.')
            router.push('/admin/scholarships')
            router.refresh()
        }
        setLoading(false)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">새 장학금 등록</h1>

            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 space-y-6">
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">장학금명</label>
                    <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#0984E3] outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">재단명</label>
                    <input
                        type="text"
                        name="foundation"
                        required
                        value={formData.foundation}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#0984E3] outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">지원 금액</label>
                    <input
                        type="text"
                        name="amount"
                        placeholder="예: 등록금 전액, 200만원"
                        value={formData.amount}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#0984E3] outline-none"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">신청 시작일</label>
                        <input
                            type="date"
                            name="application_start"
                            value={formData.application_start}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#0984E3] outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">신청 마감일</label>
                        <input
                            type="date"
                            name="application_end"
                            value={formData.application_end}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#0984E3] outline-none"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">태그 (쉼표로 구분)</label>
                    <input
                        type="text"
                        name="tags"
                        placeholder="예: 소득분위, 성적우수, 경기도"
                        value={formData.tags}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#0984E3] outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">상세 설명</label>
                    <textarea
                        name="description"
                        rows={5}
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#0984E3] outline-none resize-none"
                    />
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#0984E3] text-white font-bold py-4 rounded-xl hover:bg-[#0984E3]/90 transition-colors disabled:opacity-50"
                    >
                        {loading ? '등록 중...' : '장학금 등록하기'}
                    </button>
                </div>
            </form>
        </div>
    )
}

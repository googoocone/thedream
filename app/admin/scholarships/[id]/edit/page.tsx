'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useParams, useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import FileUpload from '@/components/ui/FileUpload'

// Dynamically import BlockNoteEditor to avoid SSR issues
const BlockNoteEditor = dynamic(() => import('@/components/BlockNoteEditor'), { ssr: false })

export default function EditScholarshipPage() {
    const params = useParams()
    const router = useRouter()
    const id = params?.id as string
    const supabase = createClient()

    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [formData, setFormData] = useState<any>({})

    useEffect(() => {
        const fetchScholarship = async () => {
            const { data, error } = await supabase
                .from('scholarships')
                .select('*')
                .eq('id', id)
                .single()

            if (data) {
                setFormData(data)
            }
            setLoading(false)
        }
        fetchScholarship()
    }, [id, supabase])

    const handleSave = async () => {
        setSaving(true)
        const { error } = await supabase
            .from('scholarships')
            .update(formData)
            .eq('id', id)

        if (!error) {
            alert('저장되었습니다.')
            router.push('/admin/scholarships')
        } else {
            alert('저장 중 오류가 발생했습니다.')
            console.error(error)
        }
        setSaving(false)
    }

    const handleChange = (field: string, value: any) => {
        setFormData((prev: any) => ({ ...prev, [field]: value }))
    }

    if (loading) return <div className="p-8">Loading...</div>

    return (
        <div className="max-w-5xl mx-auto pb-20">
            <div className="flex justify-between items-center mb-8 sticky top-0 bg-gray-50 py-4 z-10">
                <h1 className="text-2xl font-bold text-gray-900">장학금 수정</h1>
                <div className="flex gap-2">
                    <button
                        onClick={() => router.back()}
                        className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-lg"
                    >
                        취소
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="px-4 py-2 bg-[#0984E3] text-white rounded-lg hover:bg-[#0984E3]/90 disabled:opacity-50"
                    >
                        {saving ? '저장 중...' : '저장하기'}
                    </button>
                </div>
            </div>

            <div className="space-y-8">
                {/* 1. 기본 정보 */}
                <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">기본 정보</h2>
                    <div className="grid grid-cols-2 gap-6">
                        <Field label="장학 제목" value={formData.name} onChange={(v) => handleChange('name', v)} />
                        <Field label="후원 기관" value={formData.foundation} onChange={(v) => handleChange('foundation', v)} />
                        <Field label="장학 종류" value={formData.category} onChange={(v) => handleChange('category', v)} />
                        <Field label="url" value={formData.link} onChange={(v) => handleChange('link', v)} />
                    </div>
                </section>

                {/* 2. 혜택 정보 */}
                <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">혜택 정보</h2>
                    <div className="grid grid-cols-2 gap-6">
                        <Field label="혜택 유형" value={formData.benefit_type} onChange={(v) => handleChange('benefit_type', v)} />
                        <Field label="지원 금액" value={formData.amount} onChange={(v) => handleChange('amount', v)} />
                        <Field label="지급 방식" value={formData.payment_method} onChange={(v) => handleChange('payment_method', v)} />
                        <Field label="지급 기간" value={formData.payment_period} onChange={(v) => handleChange('payment_period', v)} />
                        <Field label="추가 혜택" value={formData.extra_benefits} onChange={(v) => handleChange('extra_benefits', v)} fullWidth />
                    </div>
                </section>

                {/* 3. 선발 대상 (상세) */}
                <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">선발 대상</h2>
                    <div className="grid grid-cols-2 gap-6">
                        <Field label="대상학년" value={formData.target_grade} onChange={(v) => handleChange('target_grade', v)} />
                        <Field label="최소학점" value={formData.min_gpa} onChange={(v) => handleChange('min_gpa', v)} />
                        <Field label="최대소득" value={formData.max_income} onChange={(v) => handleChange('max_income', v)} />
                        <Field label="성별" value={formData.target_gender} onChange={(v) => handleChange('target_gender', v)} />
                        <Field label="대학종류" value={formData.target_school_type} onChange={(v) => handleChange('target_school_type', v)} />
                        <Field label="지역" value={formData.target_region} onChange={(v) => handleChange('target_region', v)} />
                        <Field label="전공계열" value={formData.target_major} onChange={(v) => handleChange('target_major', v)} />
                        <Field label="직전이수학점" value={formData.min_prev_semester_credits} onChange={(v) => handleChange('min_prev_semester_credits', v)} />
                        <Field label="특화자격" value={formData.specific_qualification} onChange={(v) => handleChange('specific_qualification', v)} />
                        <Field label="국적" value={formData.target_nationality} onChange={(v) => handleChange('target_nationality', v)} />
                        <Field label="선발 인원" value={formData.selection_count} onChange={(v) => handleChange('selection_count', v)} />
                        <Field label="대상 해시태그 (콤마 구분)" value={formData.target_hashtags?.join(', ')} onChange={(v) => handleChange('target_hashtags', v.split(',').map((s: string) => s.trim()))} fullWidth />
                        <Field label="선발 대상 (요약)" value={formData.target_description} onChange={(v) => handleChange('target_description', v)} fullWidth />
                    </div>
                    <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">신청 자격 (상세)</label>
                        <BlockNoteEditor
                            initialContent={formData.eligibility}
                            onChange={(content) => handleChange('eligibility', content)}
                        />
                    </div>
                </section>

                {/* 4. 접수 정보 */}
                <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">접수 정보</h2>
                    <div className="grid grid-cols-2 gap-6">
                        <Field label="접수 횟수" value={formData.application_count} onChange={(v) => handleChange('application_count', v)} />
                        <Field label="접수 기간 (텍스트)" value={formData.application_period} onChange={(v) => handleChange('application_period', v)} />
                        <Field label="마감 기한 (날짜)" value={formData.application_end} onChange={(v) => handleChange('application_end', v)} type="date" />
                        <Field label="접수 방법" value={formData.application_method} onChange={(v) => handleChange('application_method', v)} />
                        <Field label="문의처" value={formData.contact} onChange={(v) => handleChange('contact', v)} />
                    </div>
                    <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">제출 서류</label>
                        <BlockNoteEditor
                            initialContent={formData.required_documents}
                            onChange={(content) => handleChange('required_documents', content)}
                        />
                    </div>
                </section>

                {/* 5. 첨부파일 */}
                <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">첨부파일</h2>
                    <FileUpload
                        onUploadComplete={(files) => setFormData((prev: any) => ({ ...prev, attachments: files }))}
                        existingFiles={formData.attachments}
                    />
                </section>

                {/* 6. 상세 내용 (BlockNote) */}
                <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">상세 내용</h2>
                    <BlockNoteEditor
                        initialContent={formData.description}
                        onChange={(content) => handleChange('description', content)}
                    />
                </section>
            </div>
        </div>
    )
}

interface FieldProps {
    label: string;
    value: any;
    onChange: (value: any) => void;
    type?: string;
    fullWidth?: boolean;
    multiline?: boolean;
}

function Field({ label, value, onChange, type = 'text', fullWidth = false, multiline = false }: FieldProps) {
    return (
        <div className={fullWidth ? 'col-span-2' : ''}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            {multiline ? (
                <textarea
                    value={value || ''}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0984E3]/20 focus:border-[#0984E3] min-h-[100px]"
                />
            ) : (
                <input
                    type={type}
                    value={value || ''}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0984E3]/20 focus:border-[#0984E3]"
                />
            )}
        </div>
    )
}

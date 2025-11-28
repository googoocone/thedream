'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import BenefitBanner from '@/components/profile/BenefitBanner'
import StepPersonalInfo from '@/components/profile/StepPersonalInfo'
import StepHighSchool from '@/components/profile/StepHighSchool'
import StepUniversity from '@/components/profile/StepUniversity'
import StepFinancial from '@/components/profile/StepFinancial'
import StepAdditional from '@/components/profile/StepAdditional'
import confetti from 'canvas-confetti'
import CountUpAnimation from '@/components/ui/CountUpAnimation'
import { calculateCompletion, calculatePotentialScholarships } from '@/utils/profileCalculator'

export default function ProfileEditPage() {
    const [currentStep, setCurrentStep] = useState(1)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [formData, setFormData] = useState<any>({})
    const router = useRouter()
    const supabase = createClient()

    // Derived state for gamification
    const completion = calculateCompletion(formData);
    const potentialScholarships = calculatePotentialScholarships(completion);

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) {
                router.push('/login')
                return
            }

            const { data } = await supabase
                .from('users')
                .select('*')
                .eq('id', user.id)
                .single()

            if (data) {
                setFormData(data)
            }
            setLoading(false)
        }

        fetchUser()
    }, [router, supabase])

    // Check for query param to set initial step
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const stepParam = params.get('step');
        if (stepParam) {
            setCurrentStep(parseInt(stepParam));
        }
    }, []);

    const handleChange = (field: string, value: any) => {
        setFormData((prev: any) => ({ ...prev, [field]: value }))
    }

    const handleSave = async () => {
        setSaving(true)
        const { data: { user } } = await supabase.auth.getUser()

        if (user) {
            const { error } = await supabase
                .from('users')
                .update(formData)
                .eq('id', user.id)

            if (error) {
                alert('저장 중 오류가 발생했습니다.')
            } else {
                // Celebration effect!
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 }
                });

                // If it's the last step, go to mypage, else go to next step
                if (currentStep === 5) {
                    setTimeout(() => router.push('/mypage'), 1000); // Delay for confetti
                } else {
                    setTimeout(() => setCurrentStep(prev => prev + 1), 500);
                }
            }
        }
        setSaving(false)
    }

    const steps = [
        { id: 1, label: '인적사항', icon: '📝' },
        { id: 2, label: '고등학교', icon: '🏫' },
        { id: 3, label: '대학교', icon: '🎓' },
        { id: 4, label: '재정/가계', icon: '💰' },
        { id: 5, label: '기타', icon: '🎸' },
    ]

    const isStepComplete = (stepId: number) => {
        switch (stepId) {
            case 1: // Personal Info
                const basicInfo = !!(formData.nickname && formData.birth_date && formData.gender && formData.phone_number && formData.residence_type);
                if (!basicInfo) return false;
                if (formData.residence_type === 'diff' && !formData.parents_address) return false;
                return true;
            case 2: // High School
                // Optional fields, so effectively always complete unless we want to enforce at least one field?
                // For now, return true as they are marked (선택)
                return true;
            case 3: // University
                return !!(formData.school_name && formData.major && formData.current_grade && formData.current_semester && formData.enrollment_status && formData.school_type);
            case 4: // Financial
                return !!(formData.income_bracket && formData.family_size);
            case 5: // Additional
                return true; // Optional step
            default:
                return false;
        }
    }

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-[280px] bg-[#2D3436] text-white p-6 flex flex-col fixed top-[60px] h-[calc(100vh-80px)] z-40 hidden md:flex">


                <div className="mb-8 bg-white/10 rounded-xl p-4 transition-all duration-500">
                    <div className="text-sm opacity-70 mb-1">전체 완성도</div>
                    <div className="text-3xl font-bold mb-3">
                        <CountUpAnimation end={completion} />%
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-1.5 mb-2">
                        <div
                            className="bg-[#00CEC9] h-1.5 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${completion}%` }}
                        ></div>
                    </div>
                    <div className="text-xs opacity-60">
                        현재 매칭 가능: <span className="font-bold text-[#00CEC9]"><CountUpAnimation end={potentialScholarships} /></span>개<br />
                        완성 시: 87개 장학금
                    </div>
                </div>

                <nav className="flex-1 space-y-2 overflow-y-auto">
                    {steps.map((step) => {
                        const completed = isStepComplete(step.id);
                        const isCurrent = currentStep === step.id;

                        return (
                            <button
                                key={step.id}
                                onClick={() => setCurrentStep(step.id)}
                                className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${isCurrent
                                    ? 'bg-[#0984E3] text-white font-bold'
                                    : 'text-gray-400 hover:bg-white/5'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <span>{step.icon}</span>
                                    <span>{step.label}</span>
                                </div>
                                {/* Checkmark for completed steps */}
                                {completed && !isCurrent && (
                                    <span className="text-[#00CEC9]">✔</span>
                                )}
                                {/* Current step indicator */}
                                {isCurrent && (
                                    <span className="w-2 h-2 rounded-full bg-white"></span>
                                )}
                                {/* Incomplete step indicator */}
                                {!completed && !isCurrent && (
                                    <span className="w-2 h-2 rounded-full border border-gray-500"></span>
                                )}
                            </button>
                        )
                    })}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-[280px] p-4 md:p-8 max-w-5xl mx-auto">
                {/* Header (Mobile Logo) */}
                <div className="md:hidden mb-6 flex justify-between items-center">
                    <span className="text-xl font-bold text-[#2D3436]">The Dream</span>
                    <span className="text-sm font-bold text-[var(--primary)]">{currentStep}/5 단계</span>
                </div>

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {steps[currentStep - 1].icon} {steps[currentStep - 1].label}
                    </h1>
                    <p className="text-gray-500">
                        {currentStep === 1 && "기본적인 인적사항을 입력해주세요."}
                        {currentStep === 2 && "출신 고등학교 정보를 입력해주세요."}
                        {currentStep === 3 && "현재 대학교 정보를 입력해주세요."}
                        {currentStep === 4 && "가계 정보를 입력해주세요."}
                        {currentStep === 5 && "추가적인 정보를 자유롭게 입력해주세요."}
                    </p>
                </div>

                <BenefitBanner step={currentStep} />

                <div className="bg-white rounded-[20px] p-5 md:p-8 shadow-sm border border-gray-100 mb-8">
                    {currentStep === 1 && <StepPersonalInfo data={formData} onChange={handleChange} />}
                    {currentStep === 2 && <StepHighSchool data={formData} onChange={handleChange} />}
                    {currentStep === 3 && <StepUniversity data={formData} onChange={handleChange} />}
                    {currentStep === 4 && <StepFinancial data={formData} onChange={handleChange} />}
                    {currentStep === 5 && <StepAdditional data={formData} onChange={handleChange} />}
                </div>

                <div className="flex justify-between items-center">
                    <button
                        onClick={() => router.push('/mypage')}
                        className="text-gray-500 font-medium hover:text-gray-900"
                    >
                        나중에 하기
                    </button>

                    <div className="flex gap-3">
                        {currentStep > 1 && (
                            <button
                                onClick={() => setCurrentStep(prev => prev - 1)}
                                className="px-6 py-3 rounded-full border border-gray-200 text-gray-600 font-bold hover:bg-gray-50"
                            >
                                ← 이전
                            </button>
                        )}
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="px-8 py-3 rounded-full bg-[#00CEC9] text-white font-bold hover:opacity-90 disabled:opacity-50 shadow-md shadow-[#00CEC9]/20"
                        >
                            {saving ? '저장 중...' : (currentStep === 5 ? '완료' : '다음 단계 →')}
                        </button>
                    </div>
                </div>
            </main>
        </div>
    )
}

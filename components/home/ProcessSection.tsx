'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Sparkles, CheckCircle } from 'lucide-react'

const steps = [
    {
        id: 1,
        title: "STEP 1. 프로필 등록",
        description: "나의 학교, 학점, 소득분위 등 기본 정보를 입력하세요.\n3분이면 충분합니다.",
        icon: User,
        imagePlaceholder: "프로필 입력 화면 (step1.png)"
    },
    {
        id: 2,
        title: "STEP 2. AI 맞춤 매칭",
        description: "수많은 장학금 중 지원 가능한 공고만 AI가 자동으로 찾아줍니다.\n매일 업데이트되는 공고를 놓치지 마세요.",
        icon: Sparkles,
        imagePlaceholder: "AI 매칭 결과 화면 (step2.png)"
    },
    {
        id: 3,
        title: "STEP 3. 간편한 관리",
        description: "관심 있는 장학금을 저장하고 지원 일정을 관리하세요.\n합격 확률을 높여드립니다.",
        icon: CheckCircle,
        imagePlaceholder: "장학금 상세 및 관리 화면 (step3.png)"
    }
]

export default function ProcessSection() {
    const [activeStep, setActiveStep] = useState(1)
    const [isPaused, setIsPaused] = useState(false)

    useEffect(() => {
        if (isPaused) return

        const timer = setInterval(() => {
            setActiveStep((prev) => (prev % steps.length) + 1)
        }, 3000)

        return () => clearInterval(timer)
    }, [isPaused])

    return (
        <section className="w-full bg-white py-20">
            <div className="max-w-[1200px] mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        장학금 신청, <span className="text-[var(--primary)]">이렇게 쉬워집니다</span>
                    </h2>
                    <p className="text-gray-500">
                        복잡한 검색 없이 나에게 딱 맞는 장학금을 찾아보세요
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 items-center">
                    {/* Left: Image Area */}
                    <div className="w-full lg:w-1/2 ">
                        <div className="relative aspect-[4/3] bg-gray-100 rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                            <AnimatePresence mode="wait">
                                {steps.map((step) => (
                                    activeStep === step.id && (
                                        <motion.div
                                            key={step.id}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.3 }}
                                            className="absolute inset-0 flex items-center justify-center bg-gray-50"
                                        >
                                            {/* Placeholder for Screenshot */}
                                            <div className="text-center p-8">
                                                <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center text-gray-400">
                                                    <step.icon size={32} />
                                                </div>
                                                <p className="text-gray-400 font-medium">{step.imagePlaceholder}</p>
                                                <p className="text-sm text-gray-300 mt-2">1024 x 768 recommended</p>
                                            </div>
                                        </motion.div>
                                    )
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Right: Steps List */}
                    <div className="w-full lg:w-1/2 space-y-4">
                        {steps.map((step) => (
                            <button
                                key={step.id}
                                onClick={() => setActiveStep(step.id)}
                                onMouseEnter={() => setIsPaused(true)}
                                onMouseLeave={() => setIsPaused(false)}
                                className={`w-full text-left p-6 rounded-xl transition-all duration-300 relative overflow-hidden group ${activeStep === step.id
                                    ? 'bg-gray-50 shadow-sm ring-1 ring-gray-200'
                                    : 'hover:bg-gray-50'
                                    }`}
                            >
                                {/* Progress Bar Background (Active Only) */}
                                {activeStep === step.id && (
                                    <motion.div
                                        layoutId="activeBackground"
                                        className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--primary)]"
                                    />
                                )}

                                <div className="flex items-start gap-4">
                                    <div className={`p-3 rounded-lg transition-colors ${activeStep === step.id
                                        ? 'bg-white border border-gray-200 text-gray-900'
                                        : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200'
                                        }`}>
                                        <step.icon size={24} />
                                    </div>
                                    <div>
                                        <div className={`font-bold text-lg mb-1 transition-colors ${activeStep === step.id ? 'text-gray-900' : 'text-gray-400'
                                            }`}>
                                            {step.title}
                                        </div>
                                        <p className="text-gray-500 text-sm leading-relaxed whitespace-pre-line">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

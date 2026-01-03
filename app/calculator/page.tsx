'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CalculatorForm from '@/components/calculator/CalculatorForm';
import ScholarshipList from '@/components/calculator/ScholarshipList';

export default function CalculatorPage() {
    const [result, setResult] = useState<any>(null);

    const handleResult = (data: any) => {
        setResult(data);
    };

    const reset = () => {
        setResult(null);
    };

    return (
        <main className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
            {/* Header / Intro */}
            {!result && (
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
                        🤑 <span className="text-orange-500">장학금</span>, 놓치고 있지 않나요?
                    </h1>
                    <p className="text-gray-600 text-lg">
                        30초 만에 내가 받을 수 있는 장학금을 확인해보세요.
                    </p>
                </div>
            )}

            {/* Main Content Area */}
            <AnimatePresence mode="wait">
                {!result ? (
                    <motion.div
                        key="form"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="w-full"
                    >
                        <CalculatorForm onResult={handleResult} />
                    </motion.div>
                ) : (
                    <motion.div
                        key="list"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full"
                    >
                        <button
                            onClick={reset}
                            className="mb-8 flex items-center text-gray-500 hover:text-gray-900 transition-colors mx-auto"
                        >
                            ← 다시 계산하기
                        </button>
                        <ScholarshipList
                            scholarships={result.data || []}
                            totalAmount={result.totalAmount || 0}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}

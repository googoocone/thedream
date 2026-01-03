'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { majorCategories } from '@/data/majorCategories';
import { searchScholarships, CalculatorFormState } from '@/app/calculator/actions';
import { Loader2 } from 'lucide-react';

interface CalculatorFormProps {
    onResult: (result: any) => void;
}

export default function CalculatorForm({ onResult }: CalculatorFormProps) {
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<CalculatorFormState>({
        grade: 1,
        gpa: 3.5,
        income: 9, // Default to a neutral value
        residence: '서울',
        majorCategory: '공학계열',
    });

    const handleChange = (field: keyof CalculatorFormState, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const result = await searchScholarships(formData);
            onResult(result);
        } catch (error) {
            console.error(error);
            alert('오류가 발생했습니다. 다시 시도해주세요.');
        } finally {
            setLoading(false);
        }
    };

    const regions = [
        '서울', '경기', '인천', '부산', '대구', '광주', '대전', '울산',
        '세종', '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주'
    ];

    return (
        <div className="w-full max-w-md mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                    🎓 나의 장학금 찾기
                </h2>

                <div className="space-y-6">
                    {/* Grade */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">현재 학년</label>
                        <div className="grid grid-cols-4 gap-2">
                            {[1, 2, 3, 4].map((g) => (
                                <button
                                    key={g}
                                    onClick={() => handleChange('grade', g)}
                                    className={`py-3 rounded-xl transition-all duration-200 font-medium ${formData.grade === g
                                            ? 'bg-orange-500 text-white shadow-lg shadow-orange-200 transform scale-105'
                                            : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                                        }`}
                                >
                                    {g}학년
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Major */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">전공 계열</label>
                        <select
                            value={formData.majorCategory}
                            onChange={(e) => handleChange('majorCategory', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-orange-500 transition-all text-gray-800"
                        >
                            <option value="">선택해주세요</option>
                            {majorCategories.map((cat) => (
                                <option key={cat.name} value={cat.name}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Residence */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">거주 지역</label>
                        <select
                            value={formData.residence}
                            onChange={(e) => handleChange('residence', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-orange-500 transition-all text-gray-800"
                        >
                            {regions.map((r) => (
                                <option key={r} value={r}>{r}</option>
                            ))}
                        </select>
                    </div>

                    {/* GPA */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            직전 학기 학점 <span className="text-orange-500 font-normal ml-1">({formData.gpa.toFixed(1)} / 4.5)</span>
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="4.5"
                            step="0.1"
                            value={formData.gpa}
                            onChange={(e) => handleChange('gpa', parseFloat(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                        />
                        <div className="flex justify-between text-xs text-gray-400 mt-1">
                            <span>0.0</span>
                            <span>4.5</span>
                        </div>
                    </div>

                    {/* Income */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            소득 분위 <span className="text-orange-500 font-normal ml-1">({formData.income}구간)</span>
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="10"
                            step="1"
                            value={formData.income}
                            onChange={(e) => handleChange('income', parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                        />
                        <div className="flex justify-between text-xs text-gray-400 mt-1">
                            <span>0구간</span>
                            <span>10구간</span>
                        </div>
                        <p className="text-xs text-gray-400 mt-2 text-center">
                            * 잘 모르시겠다면 9~10구간으로 설정해주세요.
                        </p>
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full mt-6 py-4 bg-gray-900 hover:bg-black text-white rounded-xl font-bold shadow-lg transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="animate-spin w-5 h-5" />
                                계산 중...
                            </>
                        ) : (
                            '💸 내 지원금 확인하기'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

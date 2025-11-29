interface StepProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onChange: (field: string, value: any) => void;
}

export default function StepFinancial({ data, onChange }: StepProps) {
    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Income Bracket */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-900">소득 수준 (분위) <span className="text-gray-400 font-normal">(선택)</span></label>
                    <select
                        value={data.income_bracket || ''}
                        onChange={(e) => onChange('income_bracket', parseInt(e.target.value))}
                        className="w-full h-[52px] px-4 rounded-xl border border-gray-200 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] outline-none transition-all bg-white"
                    >
                        <option value="">선택해주세요</option>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                            <option key={i} value={i}>{i}구간</option>
                        ))}
                    </select>
                    <p className="text-xs text-gray-400">국가장학금 신청 시 소득분위 정보</p>
                </div>

                {/* Family Size */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-900">가구원 수 <span className="text-red-500">*</span></label>
                    <div className="relative">
                        <input
                            type="number"
                            value={data.family_size || ''}
                            onChange={(e) => onChange('family_size', parseInt(e.target.value))}
                            placeholder="4"
                            className="w-full h-[52px] px-4 rounded-xl border border-gray-200 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] outline-none transition-all"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">명</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

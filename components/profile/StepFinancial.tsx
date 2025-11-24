export default function StepFinancial({ data, onChange }: { data: any, onChange: (field: string, value: any) => void }) {
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

                {/* Family Size (Not in DB yet, but good for UI demo) */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-900">가구원 수 <span className="text-gray-400 font-normal">(선택)</span></label>
                    <select
                        value={data.family_size || ''}
                        onChange={(e) => onChange('family_size', parseInt(e.target.value))}
                        className="w-full h-[52px] px-4 rounded-xl border border-gray-200 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] outline-none transition-all bg-white"
                    >
                        <option value="">선택해주세요</option>
                        <option value="1">1인 가구</option>
                        <option value="2">2인 가구</option>
                        <option value="3">3인 가구</option>
                        <option value="4">4인 이상</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Single Parent / Grandparent */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-900">한부모/조손 가정 <span className="text-gray-400 font-normal">(선택)</span></label>
                    <select
                        value={data.is_single_parent === undefined ? '' : (data.is_single_parent ? 'yes' : 'no')}
                        onChange={(e) => onChange('is_single_parent', e.target.value === 'yes')}
                        className="w-full h-[52px] px-4 rounded-xl border border-gray-200 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] outline-none transition-all bg-white"
                    >
                        <option value="">선택해주세요</option>
                        <option value="yes">해당함</option>
                        <option value="no">해당없음</option>
                    </select>
                </div>

                {/* Multicultural */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-900">다문화 가정 <span className="text-gray-400 font-normal">(선택)</span></label>
                    <select
                        value={data.is_multicultural === undefined ? '' : (data.is_multicultural ? 'yes' : 'no')}
                        onChange={(e) => onChange('is_multicultural', e.target.value === 'yes')}
                        className="w-full h-[52px] px-4 rounded-xl border border-gray-200 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] outline-none transition-all bg-white"
                    >
                        <option value="">선택해주세요</option>
                        <option value="yes">해당함</option>
                        <option value="no">해당없음</option>
                    </select>
                </div>
            </div>

            {/* Disability */}
            <div className="space-y-2">
                <label className="text-sm font-bold text-gray-900">장애 여부 <span className="text-gray-400 font-normal">(선택)</span></label>
                <select
                    value={data.is_disabled === undefined ? '' : (data.is_disabled ? 'yes' : 'no')}
                    onChange={(e) => onChange('is_disabled', e.target.value === 'yes')}
                    className="w-full h-[52px] px-4 rounded-xl border border-gray-200 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] outline-none transition-all bg-white"
                >
                    <option value="">선택해주세요</option>
                    <option value="yes">해당함</option>
                    <option value="no">해당없음</option>
                </select>
            </div>
        </div>
    );
}

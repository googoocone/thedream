export default function StepPersonalInfo({ data, onChange }: { data: any, onChange: (field: string, value: any) => void }) {
    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-900">이름 <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        value={data.nickname || ''}
                        onChange={(e) => onChange('nickname', e.target.value)}
                        placeholder="홍길동"
                        className="w-full h-[52px] px-4 rounded-xl border border-gray-200 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] outline-none transition-all"
                    />
                </div>

                {/* Birthdate */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-900">생년월일 <span className="text-red-500">*</span></label>
                    <input
                        type="date"
                        value={data.birth_date || ''}
                        onChange={(e) => onChange('birth_date', e.target.value)}
                        className="w-full h-[52px] px-4 rounded-xl border border-gray-200 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] outline-none transition-all"
                    />
                </div>

                {/* Gender */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-900">성별 <span className="text-red-500">*</span></label>
                    <select
                        value={data.gender || ''}
                        onChange={(e) => onChange('gender', e.target.value)}
                        className="w-full h-[52px] px-4 rounded-xl border border-gray-200 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] outline-none transition-all bg-white"
                    >
                        <option value="">선택해주세요</option>
                        <option value="male">남성</option>
                        <option value="female">여성</option>
                    </select>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-900">연락처 <span className="text-red-500">*</span></label>
                    <input
                        type="tel"
                        value={data.phone_number || ''}
                        onChange={(e) => onChange('phone_number', e.target.value)}
                        placeholder="010-1234-5678"
                        className="w-full h-[52px] px-4 rounded-xl border border-gray-200 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] outline-none transition-all"
                    />
                </div>
            </div>

            {/* Address */}
            <div className="space-y-2">
                <label className="text-sm font-bold text-gray-900">주소 <span className="text-gray-400 font-normal">(선택)</span></label>
                <input
                    type="text"
                    value={data.address || ''}
                    onChange={(e) => onChange('address', e.target.value)}
                    placeholder="서울특별시 강남구..."
                    className="w-full h-[52px] px-4 rounded-xl border border-gray-200 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] outline-none transition-all"
                />
                <p className="text-xs text-gray-400">지역 기반 장학금 추천에 활용됩니다.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nationality */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-900">국적/시민권 국가 <span className="text-gray-400 font-normal">(선택)</span></label>
                    <select
                        value={data.nationality || 'Korea'}
                        onChange={(e) => onChange('nationality', e.target.value)}
                        className="w-full h-[52px] px-4 rounded-xl border border-gray-200 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] outline-none transition-all bg-white"
                    >
                        <option value="Korea">대한민국</option>
                        <option value="Other">기타 (재외국민/외국인)</option>
                    </select>
                </div>

                {/* Parents Address */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-900">부모/학생 여부 <span className="text-gray-400 font-normal">(선택)</span></label>
                    <select
                        value={data.residence_type || ''}
                        onChange={(e) => onChange('residence_type', e.target.value)}
                        className="w-full h-[52px] px-4 rounded-xl border border-gray-200 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] outline-none transition-all bg-white"
                    >
                        <option value="">선택해주세요</option>
                        <option value="same">부모님과 동거</option>
                        <option value="diff">부모님과 별거 (타지역)</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

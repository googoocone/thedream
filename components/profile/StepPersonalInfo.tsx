'use client'

import AddressSearch from '@/components/ui/AddressSearch'

interface StepProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any; // Using any for now as data structure is complex, but explicit any is better than implicit
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onChange: (field: string, value: any) => void;
}

export default function StepPersonalInfo({ data, onChange }: StepProps) {
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
                <label className="text-sm font-bold text-gray-900">주소 <span className="text-gray-400 font-normal"></span></label>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={data.address || ''}
                        readOnly
                        placeholder="주소 검색을 클릭하세요"
                        className="flex-1 h-[52px] px-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-600 focus:outline-none cursor-not-allowed"
                    />
                    <div className="h-[52px] flex items-center">
                        <AddressSearch onComplete={(addr: string) => onChange('address', addr)} />
                    </div>
                </div>
                <p className="text-xs text-gray-400">지역 기반 장학금 추천에 활용됩니다.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nationality */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-900">국적/시민권 국가 <span className="text-gray-400 font-normal"></span></label>
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
                    <label className="text-sm font-bold text-gray-900">부모/학생 여부 <span className="text-gray-400 font-normal"></span></label>
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

                {/* Parents Address Input (Only if diff) */}
                {data.residence_type === 'diff' && (
                    <div className="space-y-2 md:col-span-2">
                        <div className="flex justify-between items-center">
                            <label className="text-sm font-bold text-gray-900">부모님 거주지 주소 <span className="text-red-500">*</span></label>
                            <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                                <input
                                    type="checkbox"
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            onChange('parents_address', data.address)
                                        } else {
                                            onChange('parents_address', '')
                                        }
                                    }}
                                    className="w-4 h-4 rounded border-gray-300 text-[var(--primary)] focus:ring-[var(--primary)]"
                                />
                                내 주소와 동일
                            </label>
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={data.parents_address || ''}
                                readOnly
                                placeholder="주소 검색을 클릭하세요"
                                className="flex-1 h-[52px] px-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-600 focus:outline-none cursor-not-allowed"
                            />
                            <div className="h-[52px] flex items-center">
                                <AddressSearch onComplete={(addr: string) => onChange('parents_address', addr)} />
                            </div>
                        </div>
                    </div>
                )}

                {/* Religion */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-900">종교 <span className="text-gray-400 font-normal">(선택)</span></label>
                    <select
                        value={data.religion || ''}
                        onChange={(e) => onChange('religion', e.target.value)}
                        className="w-full h-[52px] px-4 rounded-xl border border-gray-200 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] outline-none transition-all bg-white"
                    >
                        <option value="">무교 / 선택 안함</option>
                        <option value="christianity">기독교 (개신교)</option>
                        <option value="catholic">천주교</option>
                        <option value="buddhism">불교</option>
                        <option value="won_buddhism">원불교</option>
                        <option value="other">기타</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

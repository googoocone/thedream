import SchoolSearch from '@/components/ui/SchoolSearch'

export default function StepHighSchool({ data, onChange }: { data: any, onChange: (field: string, value: any) => void }) {
    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* High School Type */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-900">출신 고등학교 유형 <span className="text-gray-400 font-normal">(선택)</span></label>
                    <select
                        value={data.high_school_type || ''}
                        onChange={(e) => onChange('high_school_type', e.target.value)}
                        className="w-full h-[52px] px-4 rounded-xl border border-gray-200 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] outline-none transition-all bg-white"
                    >
                        <option value="">선택해주세요</option>
                        <option value="general">일반고</option>
                        <option value="special_purpose">특목고 (과학고/외고 등)</option>
                        <option value="specialized">특성화고/마이스터고</option>
                        <option value="autonomous">자율고 (자사고/자공고)</option>
                        <option value="other">기타 (검정고시/해외고 등)</option>
                    </select>
                </div>

                {/* High School Name */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-900">출신 고등학교 <span className="text-gray-400 font-normal">(선택)</span></label>
                    <SchoolSearch
                        value={data.high_school_name}
                        onChange={(value: string) => onChange('high_school_name', value)}
                        type="high"
                        onSelect={(school) => {
                            onChange('high_school_name', school.name);
                            onChange('high_school_address', school.address);
                        }}
                    />
                </div>

                {/* CSAT Grade */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-900">수능 등급 (평균) <span className="text-gray-400 font-normal">(선택)</span></label>
                    <select
                        value={data.csat_grade || ''}
                        onChange={(e) => onChange('csat_grade', e.target.value)}
                        className="w-full h-[52px] px-4 rounded-xl border border-gray-200 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] outline-none transition-all bg-white"
                    >
                        <option value="">선택해주세요</option>
                        <option value="1">1등급 이내</option>
                        <option value="2">2등급 이내</option>
                        <option value="3">3등급 이내</option>
                        <option value="4">4등급 이내</option>
                        <option value="5">5등급 이내</option>
                        <option value="6">6등급 이내</option>
                        <option value="7">7등급 이내</option>
                        <option value="8">8등급 이내</option>
                        <option value="9">9등급 이내</option>
                    </select>
                </div>

                {/* High School GPA */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-900">고교 내신 (평균) <span className="text-gray-400 font-normal">(선택)</span></label>
                    <input
                        type="number"
                        step="0.1"
                        value={data.high_school_gpa || ''}
                        onChange={(e) => onChange('high_school_gpa', parseFloat(e.target.value))}
                        placeholder="3.5"
                        className="w-full h-[52px] px-4 rounded-xl border border-gray-200 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] outline-none transition-all"
                    />
                </div>
            </div>
        </div>
    );
}

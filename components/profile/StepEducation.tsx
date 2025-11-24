export default function StepEducation({ data, onChange }: { data: any, onChange: (field: string, value: any) => void }) {
    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Enrollment Status */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-900">재학 상태 <span className="text-red-500">*</span></label>
                    <select
                        value={data.enrollment_status || ''}
                        onChange={(e) => onChange('enrollment_status', e.target.value)}
                        className="w-full h-[52px] px-4 rounded-xl border border-gray-200 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] outline-none transition-all bg-white"
                    >
                        <option value="">선택해주세요</option>
                        <option value="enrolled">재학</option>
                        <option value="leave">휴학</option>
                        <option value="graduated">졸업</option>
                        <option value="expected">졸업예정</option>
                    </select>
                </div>

                {/* School Name */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-900">소속 학교 <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        value={data.school_name || ''}
                        onChange={(e) => onChange('school_name', e.target.value)}
                        placeholder="한국대학교"
                        className="w-full h-[52px] px-4 rounded-xl border border-gray-200 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] outline-none transition-all"
                    />
                </div>

                {/* Major */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-900">학과/전공 <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        value={data.major || ''}
                        onChange={(e) => onChange('major', e.target.value)}
                        placeholder="컴퓨터공학과"
                        className="w-full h-[52px] px-4 rounded-xl border border-gray-200 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] outline-none transition-all"
                    />
                </div>

                {/* Grade/Semester */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-900">학년/학기 <span className="text-red-500">*</span></label>
                    <select
                        value={data.current_grade ? `${data.current_grade}-${data.current_semester}` : ''}
                        onChange={(e) => {
                            const [grade, semester] = e.target.value.split('-');
                            onChange('current_grade', parseInt(grade));
                            onChange('current_semester', parseInt(semester));
                        }}
                        className="w-full h-[52px] px-4 rounded-xl border border-gray-200 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] outline-none transition-all bg-white"
                    >
                        <option value="">선택해주세요</option>
                        <option value="1-1">1학년 1학기</option>
                        <option value="1-2">1학년 2학기</option>
                        <option value="2-1">2학년 1학기</option>
                        <option value="2-2">2학년 2학기</option>
                        <option value="3-1">3학년 1학기</option>
                        <option value="3-2">3학년 2학기</option>
                        <option value="4-1">4학년 1학기</option>
                        <option value="4-2">4학년 2학기</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* GPA */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-900">학점 (GPA) <span className="text-gray-400 font-normal">(선택)</span></label>
                    <input
                        type="number"
                        step="0.01"
                        value={data.gpa || ''}
                        onChange={(e) => onChange('gpa', parseFloat(e.target.value))}
                        placeholder="3.8"
                        className="w-full h-[52px] px-4 rounded-xl border border-gray-200 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] outline-none transition-all"
                    />
                    <p className="text-xs text-gray-400">4.5 만점 기준</p>
                </div>

                {/* GPA Scale (Just for UI, we save standardized) */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-900">학점 만점 <span className="text-gray-400 font-normal">(선택)</span></label>
                    <select
                        className="w-full h-[52px] px-4 rounded-xl border border-gray-200 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] outline-none transition-all bg-white"
                    >
                        <option value="4.5">4.5</option>
                        <option value="4.3">4.3</option>
                        <option value="4.0">4.0</option>
                        <option value="100">100</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

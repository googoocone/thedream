import SchoolSearch from '@/components/ui/SchoolSearch'
import MajorSearch from '@/components/ui/MajorSearch'

interface StepProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onChange: (field: string, value: any) => void;
}

export default function StepUniversity({ data, onChange }: StepProps) {
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
                    <SchoolSearch
                        value={data.school_name}
                        onChange={(value: string) => onChange('school_name', value)}
                    />
                </div>

                {/* Major */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-900">학과/전공 <span className="text-red-500">*</span></label>
                    <MajorSearch
                        value={data.major}
                        onChange={(value: string, large?: string, middle?: string) => {
                            onChange('major', value)
                            if (large !== undefined) onChange('major_large_category', large)
                            if (middle !== undefined) onChange('major_middle_category', middle)
                        }}
                    />
                </div>
                {/* Sub Major */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-900">부전공/복수전공 <span className="text-gray-400 font-normal">(선택)</span></label>
                    <input
                        type="text"
                        value={data.sub_major || ''}
                        onChange={(e) => onChange('sub_major', e.target.value)}
                        placeholder="입력해주세요"
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
                {/* School Type */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-900">학교 구분 <span className="text-red-500">*</span></label>
                    <select
                        value={data.school_type || ''}
                        onChange={(e) => onChange('school_type', e.target.value)}
                        className="w-full h-[52px] px-4 rounded-xl border border-gray-200 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] outline-none transition-all bg-white"
                    >
                        <option value="">선택해주세요</option>
                        <option value="university">4년제 대학교</option>
                        <option value="college">2/3년제 전문대학</option>
                        <option value="grad_school">대학원</option>
                        <option value="cyber">사이버대학교</option>
                        <option value="open">방송통신대학교</option>
                    </select>
                </div>

                {/* University GPA */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-900">대학 학점 (GPA 4.5 만점 기준) <span className="text-gray-400 font-normal">(선택)</span></label>
                    <input
                        type="number"
                        step="0.01"
                        value={data.gpa || ''}
                        onChange={(e) => onChange('gpa', parseFloat(e.target.value))}
                        placeholder="3.8"
                        className="w-full h-[52px] px-4 rounded-xl border border-gray-200 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] outline-none transition-all"
                    />
                </div>

                {/* Graduation Year */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-900">졸업(예정)년도 <span className="text-gray-400 font-normal">(선택)</span></label>
                    <input
                        type="number"
                        value={data.graduation_year || ''}
                        onChange={(e) => onChange('graduation_year', parseInt(e.target.value))}
                        placeholder="2026"
                        className="w-full h-[52px] px-4 rounded-xl border border-gray-200 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] outline-none transition-all"
                    />
                </div>
            </div>
        </div>
    );
}

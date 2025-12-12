import SchoolSearch from '@/components/ui/SchoolSearch'
import MajorSearch from '@/components/ui/MajorSearch'

interface StepProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onChange: (field: string, value: any) => void;
}

export default function StepUniversity({ data, onChange }: StepProps) {
    // Helper to handle degree change for graduates
    const handleDegreeChange = (degree: string) => {
        onChange('degree_level', degree);

        // Auto-set school type based on degree for graduates
        if (degree === 'bachelor') onChange('school_type', 'university');
        if (degree === 'associate') onChange('school_type', 'college');
        if (degree === 'master' || degree === 'doctor') onChange('school_type', 'grad_school');
    };

    const isGraduated = data.enrollment_status === 'graduated';
    const isGradSchool_Enrolled = data.school_type === 'grad_school' && !isGraduated;

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* School Location */}
                <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-bold text-gray-900">학교 소재지 <span className="text-red-500">*</span></label>
                    <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="school_location"
                                value="domestic"
                                checked={data.school_location !== 'overseas'} // Default to domestic
                                onChange={() => onChange('school_location', 'domestic')}
                                className="w-5 h-5 text-[var(--primary)] focus:ring-[var(--primary)]"
                            />
                            <span>국내 대학(원)</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="school_location"
                                value="overseas"
                                checked={data.school_location === 'overseas'}
                                onChange={() => onChange('school_location', 'overseas')}
                                className="w-5 h-5 text-[var(--primary)] focus:ring-[var(--primary)]"
                            />
                            <span>해외 대학(원)</span>
                        </label>
                    </div>
                </div>

                {/* Enrollment Status */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-900">재학 상태 <span className="text-red-500">*</span></label>
                    <select
                        value={data.enrollment_status || ''}
                        onChange={(e) => {
                            onChange('enrollment_status', e.target.value);
                            // Reset related fields if needed when switching status
                            if (e.target.value !== 'graduated') {
                                onChange('degree_level', ''); // Reset degree if moving away from graduated (unless grad school)
                            }
                        }}
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
                        onSelect={(school) => {
                            onChange('school_address', school.address)
                        }}
                    />
                    {data.school_address && (
                        <p className="text-xs text-gray-500 mt-1">
                            📍 {data.school_address}
                        </p>
                    )}
                </div>

                {/* Conditional: Final Degree (For Graduates) OR School Type (For Enrolled) */}
                {isGraduated ? (
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-900">최종 학위 <span className="text-red-500">*</span></label>
                        <select
                            value={data.degree_level || ''}
                            onChange={(e) => handleDegreeChange(e.target.value)}
                            className="w-full h-[52px] px-4 rounded-xl border border-gray-200 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] outline-none transition-all bg-white"
                        >
                            <option value="">선택해주세요</option>
                            <option value="bachelor">학사 (4년제)</option>
                            <option value="associate">전문학사 (2/3년제)</option>
                            <option value="master">석사</option>
                            <option value="doctor">박사</option>
                        </select>
                    </div>
                ) : (
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
                )}

                {/* Grad School Degree Level (For Enrolled Grad Students) */}
                {isGradSchool_Enrolled && (
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-900">학위 과정 <span className="text-red-500">*</span></label>
                        <select
                            value={data.degree_level || ''}
                            onChange={(e) => onChange('degree_level', e.target.value)}
                            className="w-full h-[52px] px-4 rounded-xl border border-gray-200 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] outline-none transition-all bg-white"
                        >
                            <option value="">선택해주세요</option>
                            <option value="master">석사 과정</option>
                            <option value="doctor">박사 과정</option>
                            <option value="integrated">석박사 통합 과정</option>
                        </select>
                    </div>
                )}

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

                {/* Grade/Semester - Hidden if graduated */}
                {!isGraduated && (
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
                            {/* Grad School might need more specific semester options in future, but 3/4th semester fits here too */}
                        </select>
                    </div>
                )}

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

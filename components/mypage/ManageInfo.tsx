import Link from 'next/link';

interface ManageInfoProps {
    userData?: any;
}

export default function ManageInfo({ userData }: ManageInfoProps) {
    // Helper to check if a value exists
    const has = (value: any) => value !== null && value !== undefined && value !== '';

    // Determine status for each section
    const getStatus = (fields: string[]) => {
        const allFilled = fields.every(field => has(userData?.[field]));
        const someFilled = fields.some(field => has(userData?.[field]));

        if (allFilled) return 'completed';
        if (someFilled) return 'incomplete_yellow';
        return 'incomplete_red';
    };

    interface Section {
        title: string;
        icon: string;
        status: string;
        items?: { label: string; value: any }[];
        description?: string;
        stepId: number;
    }

    const sections: Section[] = [
        {
            title: "기본 정보",
            icon: "📝",
            status: getStatus(['nickname', 'birth_date', 'gender', 'phone_number']),
            stepId: 1,
            items: [
                { label: "이름", value: userData?.nickname || "미입력" },
                { label: "생년월일", value: userData?.birth_date || "미입력" },
                { label: "성별", value: userData?.gender === 'male' ? '남성' : (userData?.gender === 'female' ? '여성' : "미입력") },
                { label: "연락처", value: userData?.phone_number || "미입력" },
            ]
        },
        {
            title: "고등학교",
            icon: "🏫",
            status: getStatus(['high_school_name']),
            stepId: 2,
            items: [
                { label: "학교", value: userData?.high_school_name || "미입력" },
                { label: "유형", value: userData?.high_school_type || "미입력" },
                { label: "지역", value: userData?.high_school_address ? userData.high_school_address.split(' ')[0] : "미입력" },
                { label: "내신", value: userData?.high_school_gpa ? `${userData.high_school_gpa}등급` : "미입력" },
            ]
        },
        {
            title: "대학교",
            icon: "🎓",
            status: getStatus(['school_name', 'major', 'current_grade']),
            stepId: 3, // University step
            items: [
                { label: "학교", value: userData?.school_name || "미입력" },
                { label: "학과", value: userData?.major || "미입력" },
                { label: "계열", value: [userData?.major_large_category, userData?.major_middle_category].filter(Boolean).join(' > ') || "미입력" },
                { label: "학년", value: userData?.current_grade ? `${userData.current_grade}학년` : "미입력" },
                { label: "학점", value: userData?.gpa ? `${userData.gpa} / 4.5` : "미입력" },
            ]
        },
        {
            title: "재정/가계",
            icon: "💰",
            status: getStatus(['income_bracket', 'family_size']),
            stepId: 4,
            items: [
                { label: "소득분위", value: userData?.income_bracket ? `${userData.income_bracket}분위` : "미입력" },
                { label: "가구원수", value: userData?.family_size ? `${userData.family_size}인` : "미입력" },
            ]
        },
        {
            title: "기타",
            icon: "🎸",
            status: userData?.special_criteria ? 'completed' : 'incomplete_yellow',
            stepId: 5,
            items: [
                {
                    label: "특이사항",
                    value: userData?.special_criteria?.map((c: string) => {
                        const map: { [key: string]: string } = {
                            multicultural: '다문화', single_parent: '한부모', grandparent_raised: '조손',
                            north_korean: '북한이탈', foster_care: '자립준비', disabled_family: '장애인가정',
                            farmer: '농업인', fisher: '어업인', livestock: '축산인',
                            construction: '건설근로자', small_business: '소상공인', police_fire: '경찰/소방',
                            disabled: '장애인', veteran: '보훈대상', arts_sports: '예체능', entrepreneur: '창업',
                            basic_livelihood: '기초생활수급자', second_lowest: '차상위계층'
                        };
                        return map[c] || c;
                    }).join(', ') || "없음"
                }
            ]
        }
    ];

    return (
        <div className="space-y-4">
            {sections.map((section, index) => (
                <div key={index} className="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-2">
                            <span className="text-xl">{section.icon}</span>
                            <h3 className="text-lg font-bold text-gray-900">{section.title}</h3>
                        </div>
                        {section.status === 'completed' && (
                            <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-bold">✔ 완료</span>
                        )}
                        {section.status === 'incomplete_yellow' && (
                            <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-xs font-bold">⚠️ 미완성</span>
                        )}
                        {section.status === 'incomplete_red' && (
                            <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-bold">✗ 미입력</span>
                        )}
                    </div>

                    {section.items ? (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            {section.items.map((item, i) => (
                                <div key={i}>
                                    <div className="text-xs text-gray-400 mb-1">{item.label}</div>
                                    <div className="text-sm font-medium text-gray-900">{item.value}</div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-gray-400 mb-4">{section.description}</p>
                    )}

                    <div className="flex justify-start">
                        <Link href={`/profile/edit?step=${section.stepId}`} className={`px-4 py-2 rounded-full text-sm font-bold transition-colors inline-block ${section.status === 'completed'
                            ? 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                            : 'bg-[#FF9F43] text-white hover:opacity-90'
                            }`}>
                            {section.status === 'completed' ? '수정하기' : '입력하기'}
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
}

import Link from 'next/link';

export default function ManageInfo() {
    const sections = [
        {
            title: "기본 정보",
            icon: "📝",
            status: "completed",
            items: [
                { label: "이름", value: "홍길동" },
                { label: "생년월일", value: "2003.05.15" },
                { label: "성별", value: "남성" },
                { label: "연락처", value: "010-1234-5678" },
            ]
        },
        {
            title: "교육 수준",
            icon: "🎓",
            status: "completed",
            items: [
                { label: "학교", value: "한국대학교" },
                { label: "학과", value: "컴퓨터공학과" },
                { label: "학년", value: "3학년 1학기" },
                { label: "학점", value: "3.8 / 4.5" },
            ]
        },
        {
            title: "재정/가계",
            icon: "💰",
            status: "incomplete_yellow", // 미완성 (노란색)
            items: [
                { label: "소득분위", value: "미입력" },
                { label: "가구원수", value: "미입력" },
            ]
        },
        {
            title: "활동/성향/관심",
            icon: "⭐",
            status: "incomplete_red", // 미입력 (빨간색)
            description: "수상경력, 봉사활동, 자격증 등을 입력하면 더 많은 장학금 추천을 받을 수 있어요!"
        },
        {
            title: "병역",
            icon: "🎖️",
            status: "incomplete_red",
            description: "병역 관련 장학금 추천을 위해 입력해주세요."
        },
        {
            title: "국제/체류",
            icon: "🌏",
            status: "incomplete_red",
            description: "재외국민, 외국인 전형 장학금을 찾고 계신가요?"
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
                        <Link href={`/profile/edit?step=${index + 1}`} className={`px-4 py-2 rounded-full text-sm font-bold transition-colors inline-block ${section.status === 'completed'
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

export default function BenefitBanner({ step }: { step: number }) {
    const content = [
        {
            title: "이 정보를 입력하면...",
            benefits: [
                { icon: "🎁", title: "+38개", desc: "기본 장학금 매칭" },
                { icon: "⏱️", title: "약 2분", desc: "소요 시간" },
            ]
        },
        {
            title: "이 정보를 입력하면...",
            benefits: [
                { icon: "🎁", title: "+15개", desc: "대학별 장학금 추가" },
                { icon: "🎯", title: "전공 맞춤", desc: "전공별 특화 장학금" },
                { icon: "⏱️", title: "약 3분", desc: "소요 시간" },
            ]
        },
        {
            title: "이 정보를 입력하면...",
            benefits: [
                { icon: "💰", title: "+20개", desc: "소득기반 장학금" },
                { icon: "🎓", title: "등록금 전액", desc: "지원 가능" },
                { icon: "⏱️", title: "약 3분", desc: "소요 시간" },
            ]
        }, {
            title: "이 정보를 입력하면...",
            benefits: [
                { icon: "💰", title: "+20개", desc: "소득기반 장학금" },
                { icon: "🎓", title: "등록금 전액", desc: "지원 가능" },
                { icon: "⏱️", title: "약 3분", desc: "소요 시간" },
            ]
        }
    ];

    const currentContent = content[step - 1] || content[0];

    return (
        <div className="bg-gradient-to-r from-[#6C5CE7] to-[#8E78FF] rounded-2xl p-6 text-white mb-8 shadow-lg">
            <div className="flex items-center gap-2 mb-6">
                <span className="text-xl">🎁</span>
                <h2 className="text-lg font-bold">{currentContent.title}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {currentContent.benefits.map((benefit, index) => (
                    <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex flex-col justify-center min-h-[100px]">
                        <div className="text-2xl mb-2">{benefit.icon}</div>
                        <div className="text-xl font-bold mb-1">{benefit.title}</div>
                        <div className="text-xs opacity-80">{benefit.desc}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

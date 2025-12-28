interface StepProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onChange: (field: string, value: any) => void;
}

export default function StepAdditional({ data, onChange }: StepProps) {
    const selectedCriteria = data.special_criteria || [];

    const toggleCriterion = (value: string) => {
        if (selectedCriteria.includes(value)) {
            onChange('special_criteria', selectedCriteria.filter((item: string) => item !== value));
        } else {
            onChange('special_criteria', [...selectedCriteria, value]);
        }
    };

    const categories = [
        {
            title: "👨‍👩‍👧‍👦 가정 환경 (Family Background)",
            items: [
                { id: 'multicultural', label: '다문화 가정' },
                { id: 'single_parent', label: '한부모 가정' },
                { id: 'grandparent_raised', label: '조손 가정' },
                { id: 'north_korean', label: '북한이탈주민' },
                { id: 'disabled_family', label: '장애인 가정' },
                { id: 'basic_livelihood', label: '기초생활수급자' },
                { id: 'second_lowest', label: '차상위계층' },
                { id: 'national_merit_family', label: '국가유공자 가정' },
                { id: 'injured_soldier_family', label: '공상/순직 군인 가정' },
                { id: 'injured_official_family', label: '공상/순직 경찰/소방/공무원 가정' },
                { id: 'multi_child', label: '다자녀 가정' },
                { id: 'veteran', label: '국가유공자 (보훈대상)' },
                { id: 'descendant_patriot', label: '독립유공자 후손' },
                { id: 'lh_housing', label: 'LH 임대주택 거주' },
            ]
        },
        {
            title: "🚜 부모님 직업 (Parents' Job)",
            items: [
                { id: 'soldier_family', label: '직업군인 가정' },
                { id: 'civilian_military_employee_family', label: '군무원 가정' },
                { id: 'farmer_fisherman_family', label: '농축어업인 가정' },
                { id: 'construction', label: '건설근로자 자녀' },
                { id: 'small_business', label: '소상공인 자녀' },
                { id: 'police_fire', label: '경찰/소방관 자녀' },
                { id: 'delivery_driver', label: '택배기사 (CJ/롯데/한진)' },
                { id: 'sanitation_worker', label: '환경미화원' },
            ]
        },
        {
            title: "👤 본인 해당 (Personal Status)",
            items: [
                { id: 'foster_care', label: '자립준비청년 (보호종료아동)' },
                { id: 'disabled', label: '장애인' },
                { id: 'arts_sports', label: '예체능 특기자' },
                { id: 'entrepreneur', label: '창업 준비생' },
                { id: 'sme_employee', label: '중소기업 재직자' },
                { id: 'seoul_learn_mentor', label: '서울런 멘토 경험 (8개월 이상)' },
                { id: 'public_benefit', label: '사회공익활동 경험' },
            ]
        },
        {
            title: "🪖 병역 사항 (Military Service)",
            items: [
                { id: 'military_completed', label: '군필' },
                { id: 'military_exempt', label: '면제' },
            ]
        }
    ];

    return (
        <div className="space-y-8">
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                <h3 className="font-bold text-blue-900 mb-2">💡 숨겨진 장학금을 찾아보세요!</h3>
                <p className="text-sm text-blue-700 leading-relaxed">
                    해당하는 항목을 모두 선택해주세요. 선택한 항목에 맞는 맞춤 장학금을 찾아드립니다.<br />
                    (해당 사항이 없으면 선택하지 않으셔도 됩니다.)
                </p>
            </div>

            <div className="space-y-6">
                {categories.map((category) => (
                    <div key={category.title} className="space-y-3">
                        <h4 className="font-bold text-gray-900 text-lg">{category.title}</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {category.items.map((item) => {
                                const isSelected = selectedCriteria.includes(item.id);
                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => toggleCriterion(item.id)}
                                        className={`p-3 rounded-xl border text-sm font-medium transition-all text-left flex items-center justify-between ${isSelected
                                            ? 'border-[#0984E3] bg-[#0984E3]/5 text-[#0984E3] ring-1 ring-[#0984E3]'
                                            : 'border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300'
                                            }`}
                                    >
                                        {item.label}
                                        {isSelected && <span>✔</span>}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            <div className="space-y-2 pt-4 border-t border-gray-100">
                <label className="text-sm font-bold text-gray-900">기타 참고사항 <span className="text-gray-400 font-normal">(선택)</span></label>
                <textarea
                    value={data.additional_info || ''}
                    onChange={(e) => onChange('additional_info', e.target.value)}
                    placeholder="위 항목에 없는 특이사항이 있다면 자유롭게 적어주세요."
                    className="w-full h-[100px] p-4 rounded-xl border border-gray-200 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] outline-none transition-all resize-none"
                />
            </div>
        </div>
    );
}

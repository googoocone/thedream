import ScholarshipCard from "./ScholarshipCard";

const DUMMY_SCHOLARSHIPS = [
    {
        id: 1,
        dDay: "D-1",
        title: "용인시 학자금대출 이자지원",
        location: "경상북도",
        tags: ["고등학생", "대학생", "대학원생"],
        amount: "300만원",
    },
    {
        id: 2,
        dDay: "D-5",
        title: "희망 사다리 장학금 1유형",
        location: "전국",
        tags: ["대학생", "취업연계"],
        amount: "등록금 전액",
    },
    {
        id: 3,
        dDay: "D-12",
        title: "미래 인재 육성 장학금",
        location: "서울시",
        tags: ["대학생", "이공계"],
        amount: "500만원",
    },
    {
        id: 4,
        dDay: "D-20",
        title: "드림 장학재단 생활비 지원",
        location: "경기도",
        tags: ["저소득층", "대학생"],
        amount: "200만원",
    },
    {
        id: 5,
        dDay: "D-2",
        title: "청년 도약 장학금",
        location: "부산광역시",
        tags: ["청년", "창업"],
        amount: "1000만원",
    },
    {
        id: 6,
        dDay: "D-7",
        title: "글로벌 리더 장학금",
        location: "전국",
        tags: ["유학생", "대학원생"],
        amount: "학비 지원",
    },
];

export default function ScholarshipList() {
    return (
        <section className="w-full max-w-7xl mx-auto px-6 py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">장학금</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {DUMMY_SCHOLARSHIPS.map((scholarship) => (
                    <ScholarshipCard
                        key={scholarship.id}
                        dDay={scholarship.dDay}
                        title={scholarship.title}
                        location={scholarship.location}
                        tags={scholarship.tags}
                        amount={scholarship.amount}
                    />
                ))}
            </div>
        </section>
    );
}

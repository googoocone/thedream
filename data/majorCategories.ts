export interface MajorCategory {
    name: string;
    subcategories: string[];
}

export const majorCategories: MajorCategory[] = [
    {
        name: "인문계열",
        subcategories: [
            "언어/문학",
            "인문과학",
            "기독교신학",
            "불교/철학",
            "역사/고고학",
            "문화/민속/미술사"
        ]
    },
    {
        name: "사회계열",
        subcategories: [
            "경영/경제",
            "법률",
            "사회과학",
            "언론/방송/매체",
            "관광/호텔",
            "국제/지역",
            "복지/상담"
        ]
    },
    {
        name: "교육계열",
        subcategories: [
            "유아교육",
            "초등교육",
            "중등교육",
            "특수교육",
            "교육일반"
        ]
    },
    {
        name: "공학계열",
        subcategories: [
            "건축/설비",
            "토목/도시",
            "교통/운송",
            "기계/금속/자동차",
            "전기/전자/제어",
            "정밀/에너지",
            "소재/재료",
            "컴퓨터/통신/SW",
            "화공/고분자/섬유",
            "산업/안전",
            "환경/소방/방재"
        ]
    },
    {
        name: "자연계열",
        subcategories: [
            "수학/물리/천문",
            "화학/생명과학",
            "지구/대기/해양",
            "농림/수산",
            "식품/영양",
            "생활과학/의류"
        ]
    },
    {
        name: "의약계열",
        subcategories: [
            "의료/의학",
            "간호",
            "약학",
            "한의학",
            "치료/보건",
            "재활"
        ]
    },
    {
        name: "예체능계열",
        subcategories: [
            "디자인",
            "응용예술",
            "무용/체육",
            "미술/조형",
            "연극/영화/방송",
            "음악/국악"
        ]
    }
];

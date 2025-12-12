"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const EDUCATION_LEVELS = [
    "고등학교 1학년",
    "고등학교 2학년",
    "고등학교 3학년",
    "대학교 1학년",
    "대학교 2학년",
    "대학교 3학년",
    "대학교 4학년",
    "대학교 졸업",
    "대학원 석사",
    "대학원 박사",
];

const MAJORS = [
    { group: "인문계열", options: ["언어·문학", "인문과학"] },
    { group: "사회계열", options: ["경영·경제", "법률", "사회과학"] },
    { group: "교육계열", options: ["교육일반", "유아교육", "특수교육", "초등교육", "중등교육"] },
    { group: "공학계열", options: ["건축", "토목·도시", "교통·운송", "기계·금속", "전기·전자", "정밀·에너지", "소재·재료", "컴퓨터·통신", "산업", "화공", "기타"] },
    { group: "자연계열", options: ["농림·수산", "생물·화학·환경", "생활과학", "수학·물리·천문·지리"] },
    { group: "의약계열", options: ["의료", "간호", "약학", "치료·보건"] },
    { group: "예체능계열", options: ["디자인", "응용예술", "무용·체육", "미술·조형", "연극·영화", "음악"] },
];

export default function HeroSection() {
    const [typedText1, setTypedText1] = useState("");
    const [typedText2, setTypedText2] = useState("");
    const [typedText3, setTypedText3] = useState("");

    const text1 = "복잡한 검색은 그만,";
    const text2 = "한 번의 입력으로";
    const text3 = "AI가 당신에게 맞는 장학금을 추천합니다.";

    useEffect(() => {
        const typeText = (text: string, setter: (s: string) => void, delay: number) => {
            let i = 0;
            return setTimeout(() => {
                const interval = setInterval(() => {
                    setter(text.substring(0, i + 1));
                    i++;
                    if (i === text.length) clearInterval(interval);
                }, 50);
            }, delay);
        };

        const timeout1 = typeText(text1, setTypedText1, 0);
        const timeout2 = typeText(text2, setTypedText2, 1500);
        const timeout3 = typeText(text3, setTypedText3, 3000);

        return () => {
            clearTimeout(timeout1);
            clearTimeout(timeout2);
            clearTimeout(timeout3);
        };
    }, []);

    const [birthYear, setBirthYear] = useState("");
    const [birthMonth, setBirthMonth] = useState("");
    const [birthDay, setBirthDay] = useState("");
    const [education, setEducation] = useState("");
    const [major, setMajor] = useState("");
    const router = useRouter();

    const handleSearch = () => {
        const birth = `${birthYear}-${birthMonth.padStart(2, '0')}-${birthDay.padStart(2, '0')}`;
        const params = new URLSearchParams();
        if (birthYear && birthMonth && birthDay) params.append('birth', birth);
        if (education) params.append('edu', education);
        if (major) params.append('major', major);

        router.push(`/scholarships?${params.toString()}`);
    };

    return (
        <section className="w-full max-w-7xl mx-auto px-6 py-12 md:py-20 flex flex-col md:flex-row items-center justify-between gap-12">
            {/* Left Section: Inputs */}
            <div className="w-full md:w-1/2 space-y-8">
                <div className="space-y-2">
                    <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
                        AI가 찾아주는<br />
                        나도 몰랐던 나의 장학금
                    </h1>
                    <div className="h-24 pt-4 space-y-1 text-gray-600 text-lg">
                        <p className="min-h-[1.75rem]">{typedText1}</p>
                        <p className="min-h-[1.75rem]">{typedText2} {typedText3}</p>

                    </div>
                </div>

                <div className="space-y-6 bg-white p-1 rounded-xl">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">생년월일을 입력해주세요</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Year"
                                value={birthYear}
                                onChange={(e) => setBirthYear(e.target.value)}
                                className="w-full p-3 bg-gray-50 rounded-lg border-none focus:ring-2 focus:ring-[var(--primary)] outline-none"
                            />
                            <input
                                type="text"
                                placeholder="Month"
                                value={birthMonth}
                                onChange={(e) => setBirthMonth(e.target.value)}
                                className="w-full p-3 bg-gray-50 rounded-lg border-none focus:ring-2 focus:ring-[var(--primary)] outline-none"
                            />
                            <input
                                type="text"
                                placeholder="Day"
                                value={birthDay}
                                onChange={(e) => setBirthDay(e.target.value)}
                                className="w-full p-3 bg-gray-50 rounded-lg border-none focus:ring-2 focus:ring-[var(--primary)] outline-none"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">현재 학력</label>
                        <select
                            value={education}
                            onChange={(e) => setEducation(e.target.value)}
                            className="w-full p-3 bg-gray-50 rounded-lg border-none focus:ring-2 focus:ring-[var(--primary)] outline-none appearance-none text-gray-600"
                        >
                            <option value="">Select your school level</option>
                            {EDUCATION_LEVELS.map((level) => (
                                <option key={level} value={level}>{level}</option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">학교 전공</label>
                        <select
                            value={major}
                            onChange={(e) => setMajor(e.target.value)}
                            className="w-full p-3 bg-gray-50 rounded-lg border-none focus:ring-2 focus:ring-[var(--primary)] outline-none appearance-none text-gray-600"
                        >
                            <option value="">Select your field of study</option>
                            {MAJORS.map((group) => (
                                <optgroup key={group.group} label={group.group}>
                                    {group.options.map((option) => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </optgroup>
                            ))}
                        </select>
                    </div>

                    <button
                        onClick={handleSearch}
                        className="w-full py-4 bg-[var(--primary)] text-white font-bold rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-orange-200"
                    >
                        장학금 확인하기
                    </button>
                </div>
            </div>

            {/* Right Section: Abstract Shapes */}
            <div className="hidden sm:block w-full md:w-1/2 relative h-[400px] md:h-[500px] flex items-center justify-center">
                {/* Yellow Circle */}
                <div className="absolute top-0 right-10 w-64 h-64 bg-[#FCD34D] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                {/* Orange Circle */}
                <div className="absolute bottom-0 right-20 w-64 h-64 bg-[#F87B4A] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                {/* White Cards (Abstract) */}
                <div className="absolute top-20 right-40 w-[250px] h-[75px] bg-white rounded-lg shadow-xl transform -rotate-6 animate-float text-sm p-2 flex items-center text-left">000님이 받을 수 있는 장학금 신청기간이 열렸어요!</div>
                <div className="absolute top-40 right-10 w-[250px] h-[75px] bg-white rounded-lg shadow-xl transform rotate-3 animate-float text-sm animation-delay-1000 p-2 flex items-center text-left">정보를 자세하게 적을수록 받을 수 있는 장학금의 갯수가 많아져요!</div>
                <div className="absolute bottom-20 right-32 w-[250px] h-[75px] bg-white rounded-lg shadow-xl transform -rotate-3 animate-float text-sm animation-delay-2000 p-2 flex items-center text-left">AI가 받을 수 있는 장학금을 놓치지 않고 찾아드려요</div>
            </div>
        </section>
    );
}

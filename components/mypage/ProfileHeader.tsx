import Image from "next/image";
import Link from "next/link";
import { calculateCompletion } from "@/utils/profileCalculator";

export default function ProfileHeader({ user }: { user: any }) {
    const name = user?.nickname || user?.email?.split("@")[0] || "홍길동";
    const university = user?.school_name || "학교 미입력";
    const majorName = user?.major || "전공 미입력";
    const majorCategories = [user?.major_large_category, user?.major_middle_category].filter(Boolean).join('/');
    const major = majorCategories ? `${majorName} (${majorCategories})` : majorName;
    const isGraduated = user?.enrollment_status === 'graduated';
    const grade = isGraduated ? "졸업" : (user?.current_grade ? `${user.current_grade}학년` : "");
    const semester = isGraduated ? "" : (user?.current_semester ? `${user.current_semester}학기` : "");
    const birthDate = user?.birth_date || "생년월일 미입력";

    const completion = calculateCompletion(user);

    return (
        <div className="bg-white rounded-[24px] p-8 shadow-sm border border-gray-100 flex flex-col lg:flex-row justify-between items-center gap-10 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50 pointer-events-none"></div>

            {/* Left: User Info */}
            <div className="flex flex-col md:flex-row items-center gap-8 w-full lg:w-auto relative z-10">
                {/* Avatar */}
                <div className="relative group">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#FF9F43] to-[#FF6B6B] p-1 shadow-lg">
                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden relative">
                            {user?.profile_image ? (
                                <Image src={user.profile_image} alt="Profile" fill className="object-cover" />
                            ) : (
                                <span className="text-5xl">👤</span>
                            )}
                        </div>
                    </div>
                    <button className="absolute bottom-1 right-1 bg-white p-2 rounded-full shadow-md border border-gray-100 hover:bg-gray-50 transition-colors">
                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </button>
                </div>

                {/* Text Info */}
                <div className="text-center md:text-left space-y-4">
                    <div>
                        <div className="flex items-center justify-center md:justify-start gap-3 mb-1">
                            <h2 className="text-3xl font-bold text-gray-900">{name}님</h2>
                            <span className="text-3xl animate-wave">👋</span>
                        </div>
                        <p className="text-gray-500 font-medium">오늘도 꿈을 향해 달려가볼까요?</p>
                    </div>

                    <div className="flex flex-wrap justify-center md:justify-start gap-3 text-sm text-gray-600">
                        <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                            <svg className="w-4 h-4 text-[#FF9F43]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            <span className="font-medium">{university} {major}</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                            <svg className="w-4 h-4 text-[#FF9F43]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                            <span className="font-medium">{grade} {semester}</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                            <svg className="w-4 h-4 text-[#FF9F43]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="font-medium">{birthDate}</span>
                        </div>
                    </div>

                    <div className="flex gap-3 justify-center md:justify-start pt-2">
                        <Link href="/profile/edit" className="bg-gray-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-800 transition-all shadow-sm flex items-center gap-2">
                            <span>✏️</span> 내 정보 수정
                        </Link>
                        <button className="bg-white text-gray-600 border border-gray-200 px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-50 transition-all flex items-center gap-2">
                            <span>🔔</span> 알림 설정
                        </button>
                    </div>
                </div>
            </div>

            {/* Right: Profile Completion */}
            <div className="w-full lg:w-[360px] bg-gradient-to-br from-[#6C5CE7] to-[#a29bfe] rounded-[24px] p-8 text-white relative overflow-hidden shrink-0 shadow-lg group">
                {/* Decorative Circles */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform duration-700"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full blur-xl -translate-x-1/2 translate-y-1/2 group-hover:scale-110 transition-transform duration-700"></div>

                <div className="relative z-10">
                    <div className="flex justify-between items-end mb-2">
                        <h3 className="text-base font-semibold opacity-90">프로필 완성도</h3>
                        <span className="text-4xl font-bold tracking-tight">{completion}%</span>
                    </div>

                    <div className="w-full bg-black/20 rounded-full h-3 mb-6 backdrop-blur-sm overflow-hidden">
                        <div
                            className="bg-white h-full rounded-full transition-all duration-1000 ease-out relative"
                            style={{ width: `${completion}%` }}
                        >
                            <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                        </div>
                    </div>

                    <div className="bg-white/10 rounded-xl p-4 mb-6 backdrop-blur-md border border-white/10">
                        <p className="text-sm font-medium leading-relaxed flex gap-3 items-start">
                            <span className="text-xl mt-0.5">💡</span>
                            <span className="opacity-95">
                                재정 정보를 입력하면<br />
                                <span className="text-[#FFD700] font-bold">6개의 장학금</span>이 더 보여요!
                            </span>
                        </p>
                    </div>

                    <Link href="/profile/edit" className="block w-full text-center bg-white text-[#6C5CE7] py-3.5 rounded-xl text-sm font-bold hover:bg-gray-50 transition-colors shadow-md">
                        지금 완성하고 혜택받기
                    </Link>
                </div>
            </div>
        </div>
    );
}

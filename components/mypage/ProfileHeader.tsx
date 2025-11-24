import Image from "next/image";
import Link from "next/link";
import { calculateCompletion } from "@/utils/profileCalculator";

export default function ProfileHeader({ user }: { user: any }) {
    // Placeholder data if user fields are missing (simulating the design)
    const name = user?.nickname || user?.email?.split("@")[0] || "홍길동";
    const university = user?.school_name || "학교 미입력";
    const major = user?.major || "전공 미입력";
    const grade = user?.current_grade ? `${user.current_grade}학년` : "";
    const semester = user?.current_semester ? `${user.current_semester}학기` : "";
    // For demo purposes, hardcoding a birthdate format or using data
    const birthDate = user?.birth_date || "생년월일 미입력";

    const completion = calculateCompletion(user);

    return (
        <div className="bg-white rounded-[20px] p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8">
            {/* Left: User Info */}
            <div className="flex items-center gap-6 w-full md:w-auto">
                <div className="w-24 h-24 rounded-full bg-[#FF9F43] flex items-center justify-center overflow-hidden relative shrink-0">
                    {/* Avatar Placeholder or Image */}
                    {user?.profile_image ? (
                        <Image src={user.profile_image} alt="Profile" fill className="object-cover" />
                    ) : (
                        <svg className="w-12 h-12 text-white opacity-80" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                    )}
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <h2 className="text-2xl font-bold text-gray-900">{name}님</h2>
                        <span className="text-2xl">👋</span>
                    </div>

                    <div className="space-y-1 text-gray-600 text-sm">
                        <div className="flex items-center gap-2">
                            <span>🏫</span>
                            <span>{university} {major}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span>📚</span>
                            <span>{grade} {semester}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span>🗓️</span>
                            <span>{birthDate}</span>
                        </div>
                    </div>

                    <div className="flex gap-2 mt-2">
                        <Link href="/profile/edit" className="bg-[#FF9F43] text-white px-4 py-1.5 rounded-full text-sm font-medium hover:opacity-90 transition-opacity">
                            내 정보 수정
                        </Link>
                        <button className="bg-gray-100 text-gray-600 px-4 py-1.5 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
                            알림 설정
                        </button>
                    </div>
                </div>
            </div>

            {/* Right: Profile Completion */}
            <div className="w-full md:w-[320px] bg-[#6C5CE7] rounded-2xl p-6 text-white relative overflow-hidden shrink-0">
                <div className="relative z-10">
                    <h3 className="text-sm font-medium opacity-90 mb-1">프로필 완성도</h3>
                    <div className="text-3xl font-bold mb-4">{completion}%</div>

                    <div className="w-full bg-white/20 rounded-full h-2 mb-4">
                        <div className="bg-white h-2 rounded-full" style={{ width: `${completion}%` }}></div>
                    </div>

                    <p className="text-xs opacity-90 mb-4 leading-relaxed">
                        💡 재정 정보를 입력하면<br />
                        6개의 장학금이 더 보여요!
                    </p>

                    <Link href="/profile/edit" className="block w-full text-center bg-[#FF9F43] text-white py-2.5 rounded-xl text-sm font-bold hover:bg-[#FF9F43]/90 transition-colors shadow-sm">
                        지금 완성하기
                    </Link>
                </div>
            </div>
        </div>
    );
}

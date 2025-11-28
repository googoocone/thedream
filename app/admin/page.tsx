import { createClient } from "@/utils/supabase/server";

export default async function AdminDashboard() {
    const supabase = await createClient();

    // Fetch stats
    const { count: userCount } = await supabase.from('users').select('*', { count: 'exact', head: true });
    const { count: scholarshipCount } = await supabase.from('scholarships').select('*', { count: 'exact', head: true });

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">대시보드</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* User Stats */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-gray-500 font-medium mb-2">총 유저 수</h3>
                    <p className="text-4xl font-bold text-[#0984E3]">{userCount || 0}</p>
                </div>

                {/* Scholarship Stats */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-gray-500 font-medium mb-2">등록된 장학금</h3>
                    <p className="text-4xl font-bold text-[#00CEC9]">{scholarshipCount || 0}</p>
                </div>

                {/* Other Stats (Placeholder) */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-gray-500 font-medium mb-2">오늘 방문자</h3>
                    <p className="text-4xl font-bold text-[#FF7675]">-</p>
                </div>
            </div>
        </div>
    );
}

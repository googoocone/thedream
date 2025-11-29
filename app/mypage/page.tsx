import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import ProfileHeader from "@/components/mypage/ProfileHeader";
import DashboardStats from "@/components/mypage/DashboardStats";
import MyPageTabs from "@/components/mypage/MyPageTabs";

export default async function MyPage() {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    // Fetch extended user profile
    const { data: userData } = await supabase
        .from('users')
        .select('*, is_subscribed')
        .eq('id', user.id)
        .single();

    // Combine auth user and profile data
    const combinedUser = { ...user, ...userData };

    return (
        <main className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-6 space-y-8">
                <ProfileHeader user={combinedUser} />
                {/* <DashboardStats /> */}
                <MyPageTabs userData={combinedUser} />
            </div>
        </main>
    );
}

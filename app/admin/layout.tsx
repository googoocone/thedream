import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    const { data: userData } = await supabase
        .from('users')
        .select('is_admin')
        .eq('id', user.id)
        .single();

    if (!userData?.is_admin) {
        redirect("/");
    }

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Admin Sidebar */}
            <aside className="w-64 bg-[#2D3436] text-white flex flex-col fixed h-full z-50">
                <div className="p-6 border-b border-gray-700">
                    <h1 className="text-2xl font-bold">Admin</h1>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <Link href="/admin" className="block px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">
                        📊 대시보드
                    </Link>
                    <Link href="/admin/users" className="block px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">
                        👥 유저 관리
                    </Link>
                    <Link href="/admin/scholarships" className="block px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">
                        🎓 장학금 관리
                    </Link>
                </nav>
                <div className="p-4 border-t border-gray-700">
                    <Link href="/" className="block px-4 py-3 rounded-lg hover:bg-white/10 transition-colors text-gray-400">
                        ← 메인으로
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8">
                {children}
            </main>
        </div>
    );
}

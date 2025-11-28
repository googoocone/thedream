import { createClient } from "@/utils/supabase/server";

export default async function AdminUsersPage() {
    const supabase = await createClient();
    const { data: users } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">유저 관리</h1>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 font-medium text-gray-500">이름/닉네임</th>
                            <th className="px-6 py-4 font-medium text-gray-500">이메일</th>
                            <th className="px-6 py-4 font-medium text-gray-500">학교</th>
                            <th className="px-6 py-4 font-medium text-gray-500">가입일</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {users?.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4">
                                    <div className="font-medium text-gray-900">{user.nickname || '-'}</div>
                                </td>
                                <td className="px-6 py-4 text-gray-600">{user.email}</td>
                                <td className="px-6 py-4 text-gray-600">
                                    {user.school_name || user.high_school_name || '-'}
                                </td>
                                <td className="px-6 py-4 text-gray-400 text-sm">
                                    {new Date(user.created_at).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                        {users?.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-6 py-10 text-center text-gray-500">
                                    가입된 유저가 없습니다.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

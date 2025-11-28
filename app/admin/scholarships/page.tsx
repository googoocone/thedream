import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function AdminScholarshipList() {
    const supabase = await createClient();
    const { data: scholarships } = await supabase
        .from('scholarships')
        .select('*')
        .order('created_at', { ascending: false });

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">장학금 관리</h1>
                <Link href="/admin/scholarships/new" className="bg-[#0984E3] text-white px-4 py-2 rounded-lg hover:bg-[#0984E3]/90 transition-colors">
                    + 새 장학금 등록
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 font-medium text-gray-500">장학금명</th>
                            <th className="px-6 py-4 font-medium text-gray-500">재단명</th>
                            <th className="px-6 py-4 font-medium text-gray-500">마감일</th>
                            <th className="px-6 py-4 font-medium text-gray-500">관리</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {scholarships?.map((scholarship) => (
                            <tr key={scholarship.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium text-gray-900">{scholarship.name}</td>
                                <td className="px-6 py-4 text-gray-500">{scholarship.foundation}</td>
                                <td className="px-6 py-4 text-gray-500">{scholarship.application_end || '상시'}</td>
                                <td className="px-6 py-4">
                                    <Link
                                        href={`/admin/scholarships/${scholarship.id}/edit`}
                                        className="text-[#0984E3] hover:underline font-medium"
                                    >
                                        수정
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

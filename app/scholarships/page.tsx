import ScholarshipList from "@/components/scholarship/ScholarshipList";
import Link from "next/link";

export default function ScholarshipsPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    return (
        <main className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-6 space-y-8">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">장학금 찾기 🔍</h1>
                        <p className="text-gray-500 mt-2">
                            나에게 딱 맞는 장학금을 찾아보세요.
                        </p>
                    </div>
                </div>

                <ScholarshipList
                    initialFilters={{
                        birth: searchParams.birth as string,
                        edu: searchParams.edu as string,
                        major: searchParams.major as string,
                    }}
                    isGuestSearch={true}
                />
            </div>
        </main>
    );
}

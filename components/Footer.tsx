import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-gray-50 border-t border-gray-100 mt-auto py-12">
            <div className="max-w-[1200px] mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                    <div className="space-y-4 text-sm text-gray-600">
                        <h3 className="font-bold text-lg text-gray-900 mb-2">루미나</h3>
                        <div className="flex flex-col gap-1.5">
                            <p>
                                <span className="font-medium mr-2">대표자</span>
                                <span>노남주</span>
                            </p>
                            <p>
                                <span className="font-medium mr-2">사업자등록번호</span>
                                <span>752-47-01430</span>
                            </p>
                            <p>
                                <span className="font-medium mr-2">주소</span>
                                <span>경기도 화성시 동탄감배산로 143, 202동 19층 1901-35호</span>
                            </p>
                            <p>
                                <span className="font-medium mr-2">이메일</span>
                                <a href="mailto:thedreamkorea.official@gmail.com" className="hover:text-gray-900 transition-colors">
                                    thedreamkorea.official@gmail.com
                                </a>
                            </p>
                        </div>
                    </div>

                    <div className="text-sm text-gray-500">
                        <p>&copy; {new Date().getFullYear()} Lumina. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

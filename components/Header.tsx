import Image from "next/image";
import Link from "next/link";

export default function Header() {
    return (
        <header className="w-full h-[80px] flex justify-between items-center px-6 max-w-7xl mx-auto">
            <Link href="/" className="flex items-center">
                <Image
                    src="/logo.png"
                    alt="The Dream Logo"
                    width={36}
                    height={37}
                    className="object-contain"
                />
            </Link>
            <div className="flex gap-3">
                <button className="text-sm font-medium text-gray-600 hover:text-gray-900 px-3 py-2">
                    로그인
                </button>
                <button className="text-sm font-medium text-white bg-[var(--primary)] hover:opacity-90 px-4 py-2 rounded-md transition-opacity">
                    회원가입
                </button>
            </div>
        </header>
    );
}

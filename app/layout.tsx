import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "The Dream - 장학금 매칭 플랫폼",
    template: "%s | The Dream",
  },
  description: "나에게 딱 맞는 장학금을 찾아보고 신청하세요. 대학생, 청년, 고등학생을 위한 맞춤형 장학금 정보 제공.",
  openGraph: {
    title: "The Dream - 장학금 매칭 플랫폼",
    description: "나에게 딱 맞는 장학금을 찾아보고 신청하세요.",
    url: "/",
    siteName: "The Dream",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "The Dream Logo",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "The Dream - 장학금 매칭 플랫폼",
    description: "나에게 딱 맞는 장학금을 찾아보고 신청하세요.",
    images: ["/logo.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
  verification: {
    google: "GgHSeCALveRBbtE-GLFQDhdwiMoYatqE69Rv9FbD8fI",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Dream - 장학금 매칭 플랫폼",
  description: "나에게 딱 맞는 장학금을 찾아보세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}

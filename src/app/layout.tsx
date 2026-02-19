import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "이코노인사이트 대시보드",
  description: "경제 뉴스 요약 및 주식 인사이트 정적 대시보드",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}

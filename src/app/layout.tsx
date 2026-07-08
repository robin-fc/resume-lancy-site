import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI 简历助手 - Lancy Resume",
  description: "基于 Magic Resume 思路打造的 AI 简历优化、JD 匹配、ATS 检查与模板预览工具。",
  keywords: ["AI 简历助手", "简历优化", "ATS", "Magic Resume", "resume.lancy.site"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}

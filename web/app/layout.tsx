import Header from "@/components/Header";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import { GoogleAnalytics } from '@next/third-parties/google'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "セキガエマシン - 結果の保存&復元可能。全自動席替えアプリ",
  description: "席替えを全自動で行うアプリ。条件を入力し、ボタンをクリックするだけで、確実で早い席替えが可能。結果を保存し、次回以降の席替えがより簡単に行えます。教師の負担を1/100にします。",
  keywords: "席替え, 教育, 自動化, 教師, アプリ, 効率化, 働き方改革, 保存, 復元, 履歴, １クリック, 全自動, 自動"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link rel="icon" href="/icon_ver2.png" />
        <meta name="description" content="席替えを全自動で行うアプリ。条件を入力し、ボタンをクリックするだけで、確実で早い席替えが可能。結果を保存し、次回以降の席替えがより簡単に行えます。教師の負担を1/100にします。" />
        <meta name="keywords" content="席替え, 教育, 自動化, 教師, アプリ, 効率化, 働き方改革, 保存, 復元, 履歴, １クリック, 全自動, 自動" />
        <meta name="author" content="SaltyEightLab" />
      </head>
      <body className={inter.className}>
        <Header/>
        <div className="flex min-h-screen border border-solid border-gray-200">
          <main className="flex-1 bg-white text-gray-800">{children}</main>
        </div>
        <Footer /> 
      </body>
      <GoogleAnalytics gaId="G-0J30810ZWJ" />
    </html>
  );
}
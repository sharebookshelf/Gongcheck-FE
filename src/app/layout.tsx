import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import ReactQueryProviders from "@/utils/ReactQueryProvider";
import { Toaster } from "@/components/ui/toaster";
import KakaoScript from "./(mvp)/mvp/result/components/KakaoScript";

export const metadata: Metadata = {
  title: "공유책장",
  description: "당신의 책장을 분석해드립니다.",
};
declare global {
  interface Window {
    Kakao: any;
  }
}

const notoSansKr = Noto_Sans_KR({
  weight: ["500"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={notoSansKr.className}>
        <ReactQueryProviders>
          {children}
          <Toaster />
        </ReactQueryProviders>
      </body>
      <KakaoScript />
    </html>
  );
}

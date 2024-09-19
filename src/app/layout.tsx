import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import Header from "@/app/components/Header";
import Image from "next/image";
import backgroundImg from "../../public/images/bg_image.png";
import ReactQueryProviders from "@/utils/ReactQueryProvider";
import { Toaster } from "@/components/ui/toaster";
import KakaoScript from "./result/components/KakaoScript";
import { ThemeProvider } from "@/config/material-tailwind-theme-provider";

export const metadata: Metadata = {
  title: "모두의 책장",
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
        <ThemeProvider>
          <ReactQueryProviders>
            <div className="relative items-center justify-center min-h-screen">
              <Image
                src={backgroundImg}
                alt="Background"
                fill
                quality={100}
                priority
                style={{
                  zIndex: -1,
                  objectFit: "cover",
                }}
              />
              <div className="flex items-center justify-center w-full h-full bg-black bg-opacity-60">
                <main className="relative flex flex-col h-screen w-full max-w-[450px] overflow-hidden">
                  <Header />
                  <div className="flex flex-col items-center justify-center h-full p-2 py-4 overflow-y-auto bg-white">
                    {children}
                  </div>
                  <div className="border"></div>
                </main>
              </div>
              <Toaster />
            </div>
          </ReactQueryProviders>
        </ThemeProvider>
      </body>
      <KakaoScript />
    </html>
  );
}

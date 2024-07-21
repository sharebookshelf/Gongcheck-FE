import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import Header from "@/app/components/Header";
import Image from "next/image";
import backgroundImg from "../../public/images/bg_image.png";
import FooterNav from "@/app/components/FooterNav";
import ReactQueryProviders from "@/utils/ReactQueryProvider";
import { Toaster } from "@/components/ui/toaster";
import KakaoScript from "./result/components/KakaoScript";
import Head from "next/head";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
      </body>
      <KakaoScript />
    </html>
  );
}

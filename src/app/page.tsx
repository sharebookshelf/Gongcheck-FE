"use client";

import Image from "next/image";
import logo from "../../public/images/logo.png";
import { useRouter } from "next/navigation";
import Head from "next/head";
import { Button } from "@material-tailwind/react";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const navigateToUpload = async () => {
    setLoading(true);

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve("데이터 준비 완료");
      }, 3 * 1000);
    });

    router.push("/upload");
  };

  return (
    <main className="flex flex-col justify-between w-4/5 h-full p-4">
      <Head>
        <meta name="color-scheme" content="light" />
      </Head>
      <div className="flex flex-col items-center justify-center p-4 text-center">
        <Image
          // src="https://www.nl.go.kr/seoji/fu/ecip/dbfiles/CIP_FILES_TBL/2022/01/06/9791191714050.jpg"
          src={logo}
          alt="Background"
          // width={100}
          // height={100}
          quality={100}
          style={{
            width: "150px",
            height: "auto",
          }}
          priority
        />
        <h1 className="mb-10 text-lg text-orange-500">공유책장</h1>
        <div className="items-center justify-center h-32 font-bold">
          <p className="mb-5 text-2xl">
            내{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-red-500 to-orange-500">
              책장 사진
            </span>
            을 등록하고
          </p>
          <p className="mb-5 text-2xl">인식된 책을 바탕으로</p>
          <p className="text-2xl">
            내{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-red-500 to-orange-500">
              책장
            </span>
            을 분석해드립니다.
          </p>
        </div>
      </div>
      <Button
        placeholder="등록하기"
        onClick={navigateToUpload}
        className="mt-10 bg-[#F59E0B] hover:bg-[#b98f47] text-white w-full rounded-full flex justify-center"
      >
        시작하기
      </Button>
    </main>
  );
}

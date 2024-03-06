"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import logo from "../../public/images/logo.png";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const navigateToUpload = () => {
    router.push("/upload");
  };

  return (
    <main className="relative flex flex-col w-4/5 mt-10">
      <div className="flex flex-col items-center justify-center text-center">
        <Image
          src={logo}
          alt="Background"
          width={150}
          height={150}
          quality={100}
          priority
        />
        <h1 className="mb-10 text-lg text-orange-500">공유책장</h1>
        <div className="items-center justify-center h-32">
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
              독서 성향
            </span>
            을 분석해드립니다.
          </p>
        </div>
      </div>
      <Button
        onClick={navigateToUpload}
        className="mt-10 bg-[#F59E0B] text-white w-full"
      >
        시작하기
      </Button>
    </main>
  );
}

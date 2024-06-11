"use client";

import { getResultByUserId, useResult } from "@/hooks/useResult";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { readingTypeInfo } from "./resultData";
import Image from "next/image";
import AgreeButton from "./components/AgreeButton";
import { Button } from "@/components/ui/button";
import { Cookies } from "react-cookie";
import Loading from "../components/loading";

export default function Page() {
  const { status, data, error, isFetching } = useResult();

  const [typeInfo, setTypeInfo] = useState<{
    type: string;
    image: string;
    analysis: string;
    feature: string;
    readingMethod: string;
  } | null>(null);

  const cookies = new Cookies();
  const readingType = cookies.get("readingType"); // 'id' 쿠키 읽기

  const onClick = () => {
    const { Kakao, location } = window;
    Kakao.Link.sendScrap({
      requestUrl: location.href,
    });
  };

  useEffect(() => {
    if (readingType) {
      console.log(readingType);
      setTypeInfo(readingTypeInfo[readingType as keyof typeof readingTypeInfo]);
    }
  }, [readingType]);

  if (!data) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col items-center w-full h-full p-4 space-y-4 overflow-y-auto">
      <h1 className="w-full text-3xl font-light text-center">
        당신의 독서 유형은...
      </h1>
      {data && (
        <div className="flex flex-col items-center w-full h-full p-4 space-y-10 border overflow-y-auto">
          <h2 className="text-2xl">{typeInfo?.type}</h2>
          <Image
            className="rounded-md"
            width={330}
            height={330}
            src={typeInfo?.image as string}
            alt={typeInfo?.type as string}
          />
          <div>{typeInfo?.analysis}</div>
          <div>{typeInfo?.feature}</div>
          <div>{typeInfo?.readingMethod}</div>
        </div>
      )}
      <AgreeButton />
      <div className="mb-4 text-center text-lg font-medium text-[#333333]">
        결과가 마음에 드시나요? 인상 깊다면?
      </div>
      <Button
        onClick={onClick}
        className="w-full h-auto bg-[#F2994A] py-2 rounded-full font-bold text-white"
      >
        공유하기
      </Button>
    </div>
  );
}

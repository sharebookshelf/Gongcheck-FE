"use client";
import { getResultByUserId, useResult } from "@/hooks/useResult";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { readingTypeInfo } from "./resultData";
import Image from "next/image";
import AgreeButton from "./components/AgreeButton";
import { Button } from "@/components/ui/button";
import { Cookies } from "react-cookie";

export default function Page() {
  const { status, data, error, isFetching } = useResult();

  const [typeInfo, setTypeInfo] = useState<{
    type: string;
    image: string;
    analysis: string;
  } | null>(null);

  // useEffect(() => {
  //   console.log(typeInfo);
  //   setTypeInfo(readingTypeInfo[data as keyof typeof readingTypeInfo]);
  // }, [typeInfo, data]);

  const cookies = new Cookies();
  const readingType = cookies.get("readingType"); // 'id' 쿠키 읽기

  useEffect(() => {
    if (readingType) {
      console.log(readingType);
      setTypeInfo(readingTypeInfo[readingType as keyof typeof readingTypeInfo]);
    }
  }, []);
  // useEffect(() => {
  //   if (data) {
  //     console.log(data.data.readingType);
  //     setTypeInfo(
  //       readingTypeInfo[data.data.readingType as keyof typeof readingTypeInfo]
  //     );
  //   }
  // }, [data]);

  if (!data) {
    <div>loading</div>;
  }

  return (
    <div className="w-3/4 flex flex-col items-center mb-10">
      <h1 className="text-3xl font-light w-full text-center mb-10">
        당신의 독서 유형은...
      </h1>
      {data && (
        <div className="w-full space-y-10 flex flex-col items-center">
          <h2 className="text-2xl">{typeInfo?.type}</h2>
          <Image
            className="rounded-md"
            width={330}
            height={330}
            src={typeInfo?.image as string}
            alt={typeInfo?.type as string}
          />
          <p>{typeInfo?.analysis}</p>
        </div>
      )}
      <AgreeButton />
      <div className="text-center mb-4">
        <span className="text-lg font-medium text-[#333333]">
          결과가 마음에 드시나요? 인상 깊다면?
        </span>
      </div>
      <Button className="w-full h-auto bg-[#F2994A] py-4 rounded-full font-bold text-white">
        공유하기
      </Button>
    </div>
  );
}

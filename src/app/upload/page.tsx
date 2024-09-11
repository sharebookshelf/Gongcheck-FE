"use client";

import UploadImage from "./components/UploadImage";
import InfoInput from "./components/InfoInput";
import { useCallback, useState } from "react";
import { NaverBook } from "@/store/naverBookStore";

export default function Upload() {
  return (
    <main className="flex flex-col justify-start w-full h-full p-2 space-y-2 overflow-y-auto">
      <div className="flex flex-col w-full">
        <div className="text-2xl text-center font-extrabold">책 등록</div>
        <div className="text-center text-sm text-gray-600">
          내가 읽었던 책들을 모두 등록해주세요!
        </div>
        <UploadImage />
      </div>
      <div className="w-full border"></div>
      <div className="flex flex-col items-center h-full space-y-4">
        <div className="text-2xl text-center font-extrabold">정보 입력</div>
        <div className="text-center text-sm text-gray-600">
          추가 정보 입력을 통해 더 정확한 분석을 도와드립니다!
        </div>
        <div className="flex flex-col justify-start w-full h-full p-2">
          <InfoInput />
        </div>
      </div>
    </main>
  );
}

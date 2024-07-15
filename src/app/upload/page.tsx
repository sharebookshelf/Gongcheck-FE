"use client";

import UploadImage from "./components/UploadImage";
import InfoInput from "./components/InfoInput";
import { useCallback, useState } from "react";

export default function Upload() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const onImageUploadComplete = useCallback((files: File[]) => {
    setUploadedFiles(files);
  }, []);

  return (
    <main className="flex flex-col justify-start w-full h-full p-2 space-y-2 overflow-y-auto">
      <div className="flex flex-col w-full">
        <div className="text-2xl text-center font-extrabold">내 책장 등록</div>
        <div className="text-center text-sm text-gray-600">
          책장 분석을 통한 내 독서 성향 분석하기
        </div>
        <UploadImage onImageUploadComplete={onImageUploadComplete} />
      </div>
      <div className="w-full border"></div>
      <div className="flex flex-col items-center h-full space-y-4">
        <div className="text-2xl text-center font-extrabold">정보 입력</div>
        <div className="text-center text-sm text-gray-600">
          추가 정보 입력을 통해 더 정확한 분석을 도와드립니다!
        </div>
        <div className="flex flex-col justify-start w-full h-full p-2">
          <InfoInput uploadedFiles={uploadedFiles} />
        </div>
      </div>
    </main>
  );
}

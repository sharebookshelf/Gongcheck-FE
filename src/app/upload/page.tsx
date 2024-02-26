"use client";

import UploadImage from "./components/UploadImage";
import InfoInput from "./components/InfoInput";
import { useCallback, useState } from "react";

interface UserInfo {
  nickname: string;
  birth: string;
  gender: string;
}
interface Data {
  nickname: string;
  birth: string;
  gender: string;
}
export default function Upload() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const onImageUploadComplete = useCallback((files: File[]) => {
    setUploadedFiles(files);
  }, []);

  return (
    <main className="flex flex-col items-center w-full h-screen">
      <div className="mt-10 text-3xl text-center">내 책장 등록</div>
      <div className="mt-2 text-center text-gray-600">
        책장 분석을 통한 내 독서 성향 분석하기
      </div>
      <UploadImage onImageUploadComplete={onImageUploadComplete} />
      <div className="w-full mt-10 border"></div>
      <div className="mt-10 text-3xl text-center">정보 입력</div>
      <div className="mt-10 text-center text-gray-600">
        추가 정보 입력을 통해 더 정확한 분석을 도와드립니다!
      </div>
      <InfoInput uploadedFiles={uploadedFiles} />
      <div className="mt-10"></div>
    </main>
  );
}

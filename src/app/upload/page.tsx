"use client";

import UploadImage from "./components/UploadImage";
import InfoInput from "./components/InfoInput";
import { FormEventHandler, useState } from "react";
import { Button } from "@/components/Button";

interface UserInfo {
  nickname: string;
  birth: string;
  gender: string;
}

export default function Upload() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    nickname: "",
    birth: "",
    gender: "",
  });

  const onImageUploadComplete = (files: File[]) => {
    setUploadedFiles(files);
  };

  const onInputChange = (name: string, value: string) => {
    if (name) {
      // name이 있는 경우에만 상태 업데이트
      setUserInfo((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(uploadedFiles);
    console.log(userInfo);

    const formData = new FormData();
    uploadedFiles.forEach((file) => {
      formData.append("files", file);
    });
    Object.keys(userInfo).forEach((key) => {
      formData.append(key, userInfo[key as keyof UserInfo]);
    });

    try {
      const response = await fetch("http://localhost:3001/upload", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Network response was not ok.");
      const data = await response.json();
      console.log(data); // 처리 결과 로그 출력
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
    }
  };

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
      <InfoInput onInfoChange={onInputChange} />
      <form className="w-full flex justify-center" onSubmit={handleSubmit}>
        <Button
          type="submit"
          className="mb-10 w-4/5 bg-[#F59E0B] text-white py-3 rounded-lg font-medium"
        >
          책장 분석하기 가기
        </Button>
      </form>

      <div className="mt-10"></div>
    </main>
  );
}

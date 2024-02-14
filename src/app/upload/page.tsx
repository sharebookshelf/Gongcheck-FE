"use client";

import UploadImage from "./components/UploadImage";
import InfoInput from "./components/InfoInput";
import { FormEventHandler, useState } from "react";
import { Button } from "@/components/Button";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

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
  const [userInfo, setUserInfo] = useState<UserInfo>({
    nickname: "",
    birth: "",
    gender: "",
  });

  const router = useRouter();
  const { toast } = useToast();

  const onImageUploadComplete = (files: File[]) => {
    setUploadedFiles(files);
    // console.log("변경!!" + uploadedFiles.length);
  };

  const onInfoChange = (data: Data) => {
    setUserInfo({
      ...data,
    });
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
      const response = await fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        toast({
          variant: "destructive",
          title: "요청에 실패하였습니다.",
          description: "입력하신 정보를 확인 후 다시 한 번 시도해주세요.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      } else {
        const data = await response.json();
        console.log(data); // 처리 결과 로그 출력
        router.push("/question");
      }
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
      toast({
        variant: "destructive",
        title: "요청에 실패하였습니다.",
        description: "입력하신 정보를 확인 후 다시 한 번 시도해주세요.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
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
      <InfoInput onInfoChange={onInfoChange} uploadedFiles={uploadedFiles} />
      <div className="mt-10"></div>
    </main>
  );
}

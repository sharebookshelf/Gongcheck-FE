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
import ShareModal from "./components/SharedModal";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";

export default function Page() {
  const { status, data, error, isFetching } = useResult();
  const [link, setLink] = useState("https://yourwebsite.com");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const router = useRouter();

  const [typeInfo, setTypeInfo] = useState<{
    type: string;
    image: string;
    analysis: string;
    feature: string;
    readingMethod: string;
  } | null>(null);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(link).then(
      () => {
        alert("링크가 복사되었습니다!");
      },
      (err) => {
        console.error("링크 복사 실패:", err);
      }
    );
  };

  const shareKakao = () => {
    if (window.Kakao) {
      window.Kakao.Link.sendDefault({
        objectType: "feed",
        content: {
          title: "공유할 제목",
          description: "공유할 설명",
          imageUrl: "https://yourimageurl.com/image.png",
          link: {
            mobileWebUrl: link,
            webUrl: link,
          },
        },
        buttons: [
          {
            title: "웹으로 보기",
            link: {
              mobileWebUrl: link,
              webUrl: link,
            },
          },
        ],
      });
    } else {
      alert("카카오톡 공유하기를 사용할 수 없습니다.");
    }
  };

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
      setTypeInfo(readingTypeInfo[readingType as keyof typeof readingTypeInfo]);
    }
  }, [readingType]);

  if (!data || !typeInfo) {
    return <Loading />;
  }
  console.log(isChecked);

  return (
    <AlertDialog>
      <div className="flex flex-col items-center w-full h-full p-4 space-y-4 overflow-y-auto">
        <div className="flex flex-col space-y-4">
          <h1 className="w-full text-3xl font-light text-center">
            당신의 독서 유형은...
          </h1>
          {data && (
            <div className="flex flex-col items-center w-full h-full p-4 space-y-10 border">
              <h2 className="text-2xl">{typeInfo.type}</h2>
              <Image
                className="rounded-md"
                width={330}
                height={330}
                priority
                src={typeInfo.image as string}
                alt={typeInfo.type as string}
              />
              <div>{typeInfo.analysis}</div>
              <div>{typeInfo.feature}</div>
              <div>{typeInfo.readingMethod}</div>
            </div>
          )}
          <AgreeButton />
          <div className="w-full flex flex-row justify-center items-center space-x-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-orange-400 text-white rounded hover:bg-orange-500"
            >
              공유하기
            </button>
          </div>
          <div className="mb-4 text-center text-lg font-medium text-[#333333]">
            나와 비슷한 성향의 사람들은 어떤 책을 갖고 있을까요?
          </div>
          <AlertDialogTrigger asChild>
            <Button
              // onClick={onClick}
              className="w-full h-auto bg-[#F2994A] py-2 rounded-full font-bold text-white"
            >
              다른 사람 책장 구경하기
            </Button>
          </AlertDialogTrigger>
        </div>
        <ShareModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          link={link}
          copyToClipboard={copyToClipboard}
          shareKakao={shareKakao}
        />
      </div>
      <AlertDialogContent className="flex flex-col justify-center">
        <AlertDialogHeader className="flex flex-col justify-center items-center">
          <AlertDialogTitle className="text-2xl">
            다른 사람의 책장을 탐험하세요!
          </AlertDialogTitle>
          <AlertDialogDescription className="w-3/4">
            당신의 책장을 공유하고, 다른 독서가들의 멋진 책장을 발견할 수 있는
            기회를 놓치지 마세요!
          </AlertDialogDescription>
          <AlertDialogTitle className="">책장을 공유하면?</AlertDialogTitle>
          <AlertDialogDescription>
            1. 다른 사람들이 올린 책장을 둘러볼 수 있어요!
            <br />
            2. 나와 독서 성향이 비슷한 사람들은 어떤 책을 읽는지 파악할 수
            있어요!
          </AlertDialogDescription>
          <AlertDialogTitle>안심하세요!</AlertDialogTitle>
          <AlertDialogDescription>
            공개된 책장 사진은 오직 책 정보만을 공유하며, 개인 정보는 철저히
            보호됩니다.
          </AlertDialogDescription>
          <div className="flex space-x-2 items-center">
            <Checkbox
              id="terms"
              // checked={isChecked}
              onCheckedChange={() => setIsChecked(!isChecked)}
            />
            <label htmlFor="terms" className="text-sm font-light leading-none">
              나의 책장 사진을 공유하는 것에 동의합니다.
            </label>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setIsChecked(false)}>
            취소
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => router.push("/confirm")}
            disabled={!isChecked}
          >
            계속
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

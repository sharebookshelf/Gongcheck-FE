"use client";

import {
  getResultByUserId,
  useResultQuery,
} from "@/app/result/hooks/useResult";
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
import RadarChart from "./components/RadarChart";
import { toast } from "@/components/ui/use-toast";
import { RefreshButton } from "./components/RefreshButton";

export default function Page() {
  const router = useRouter();

  const { status, data: result, error, isError, isFetching } = useResultQuery();
  const [link, setLink] = useState("https://yourwebsite.com");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
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

  if (isError) {
    if (error.message === "401") {
      toast({
        variant: "destructive",
        title: "세션이 존재하지 않거나 만료되었습니다.",
        description: "홈화면으로 돌아갑니다.",
      });
      router.push("/");
    } else {
      toast({
        variant: "destructive",
        title: "오류가 발생했습니다.",
        description: "잠시후 다시 시도해주세요.",
      });
    }
  }

  if (!result || !typeInfo) {
    return <Loading />;
  }

  return (
    <AlertDialog>
      <div className="flex flex-col items-center w-full h-full p-4 space-y-4 overflow-y-auto">
        <div className="flex flex-col space-y-4">
          <h1 className="w-full text-2xl font-extrabold text-center">
            당신의 독서 유형은...
          </h1>
          <div className="flex flex-col items-center text-gray-700 w-full h-full p-4 space-y-10 border">
            <h2 className="text-xl">{typeInfo.type}</h2>
            <Image
              className="rounded-md"
              width={330}
              height={330}
              priority
              src={typeInfo.image}
              alt={typeInfo.type}
            />
            <RadarChart />
            <div>{typeInfo.analysis}</div>
            <div>{typeInfo.feature}</div>
            <div>{typeInfo.readingMethod}</div>
          </div>
          {/* <Radar options={chartOptions} data={chartData} /> */}
          <AgreeButton />
          <div className="flex flex-row items-center justify-center w-full space-x-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 text-white bg-orange-400 rounded hover:bg-orange-500"
            >
              공유하기
            </button>
          </div>
          <div className="mb-4 text-center text-base font-medium text-[#333333]">
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
      <AlertDialogContent className="flex flex-col justify-center p-4">
        <AlertDialogHeader className="flex flex-colw-full items-center justify-center">
          <AlertDialogTitle className="text-2xl">
            다른 사람의 책장을 탐험하세요!
          </AlertDialogTitle>
          <AlertDialogDescription className="w-3/4">
            당신의 책장을 공유하고, 다른 독서가들의 멋진 책장을 발견할 수 있는
            기회를 놓치지 마세요!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex flex-col h-full p-6 space-y-10">
          <div className="space-y-2">
            <div className="text-xl">책장을 공유하면?</div>
            <div className="text-gray-600">
              1. 다른 사람들이 올린 책장을 둘러볼 수 있어요!
              <br />
              2. 나와 독서 성향이 비슷한 사람들은 어떤 책을 읽는지 파악할 수
              있어요!
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-xl">안심하세요!</div>
            <div className="text-gray-600">
              공개된 책장 사진은 오직 책 정보만을 공유하며, 개인 정보는 철저히
              보호됩니다.
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              // checked={isChecked}
              onCheckedChange={() => setIsChecked(!isChecked)}
            />
            <label htmlFor="terms" className="text-sm font-light leading-none">
              나의 책장 사진을 공유하는 것에 동의합니다.
            </label>
          </div>
        </div>
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

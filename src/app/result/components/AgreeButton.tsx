import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { FrownIcon, SmileIcon, ThumbsDownIcon, ThumbsUpIcon } from "./Icon";

export default function AgreeButton() {
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const sendFeedback = async (isAgree: string) => {
    // 여기서 isAgree는 boolean 값이며, true면 공감, false면 비공감입니다.
    const userConfirmed = window.confirm(
      isAgree
        ? "분석 결과에 공감하시나요? (다시 선택 불가)"
        : "분석 결과에 공감하지 않으시나요? (다시 선택 불가)"
    );

    if (userConfirmed) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users?isAgree=${isAgree}`,
          {
            credentials: "include",
            method: "PATCH",
          }
        );

        if (!response.ok) throw new Error("Network response was not ok");

        // 요청 성공 처리
        alert("피드백이 성공적으로 전송되었습니다.");
        setIsFetching(true);
      } catch (error) {
        // 에러 처리
        console.error("피드백 전송 실패:", error);
        alert("피드백 전송에 실패했습니다.");
      }
    }
  };

  return (
    <div className="flex flex-row items-center justify-between w-full gap-4 mb-4">
      <Button
        onClick={() => sendFeedback("y")}
        className="flex items-center space-x-2 bg-[#FFE8AC] px-4 py-2 rounded-full"
        disabled={isFetching}
      >
        <ThumbsUpIcon className="text-[#FFCC4D]" />
        <span className="font-medium text-[#333333]">공감해요!</span>
        <SmileIcon className="text-[#FFCC4D]" />
      </Button>
      <Button
        onClick={() => sendFeedback("n")}
        className="flex items-center space-x-2 bg-[#C4C4C4] px-4 py-2 rounded-full"
        disabled={isFetching}
      >
        <ThumbsDownIcon className="text-[#FFFFFF]" />
        <span className="font-medium text-[#333333]">아니에요</span>
        <FrownIcon className="text-[#FFFFFF]" />
      </Button>
    </div>
  );
}

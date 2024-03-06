import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";

type Props = React.SVGProps<SVGSVGElement>;

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
          `http://localhost:3000/users?isAgree=${isAgree}`,
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
    <div className="max-w-md mx-auto my-8">
      <div className="flex items-center justify-between mb-4 gap-4">
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
    </div>
  );
}

function FrownIcon(props: Props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
      <line x1="9" x2="9.01" y1="9" y2="9" />
      <line x1="15" x2="15.01" y1="9" y2="9" />
    </svg>
  );
}

function SmileIcon(props: Props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" x2="9.01" y1="9" y2="9" />
      <line x1="15" x2="15.01" y1="9" y2="9" />
    </svg>
  );
}

function ThumbsDownIcon(props: Props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 14V2" />
      <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z" />
    </svg>
  );
}

function ThumbsUpIcon(props: Props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 10v12" />
      <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
    </svg>
  );
}

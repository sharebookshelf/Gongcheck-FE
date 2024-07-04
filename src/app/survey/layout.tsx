"use client";

import useSuccessStore from "@/store/successStore";
import useSurveyStore from "@/store/surveyStore";
import { SyncLoader } from "react-spinners";
import { useSurveyMutation } from "./hooks/useSurveyMutation";

export default function Template({ children }: { children: React.ReactNode }) {
  const isSuccess = useSuccessStore((state) => state.isSuccess);
  const question = useSurveyStore((state) => state.question);

  const { mutate } = useSurveyMutation();

  const handleSubmit = () => {
    mutate(question);
  };

  return (
    <div className="flex flex-col w-full h-full space-y-2 bg-red-50 p-2">
      {children}
      <button
        onClick={handleSubmit}
        className={`relative flex flex-row items-center w-full h-1/2 text-black rounded-lg shadow ${
          isSuccess && question.question3 ? "bg-[#FFA500]" : "bg-gray-400"
        }`}
        disabled={!isSuccess || !question.question3}
      >
        <div className="mx-auto">
          {isSuccess ? "분석 결과 확인" : "책장 분석 중 ..."}
        </div>
        <div className="absolute right-6">
          {isSuccess ? null : <SyncLoader color="#6E6E6E" />}
        </div>
      </button>
    </div>
  );
}

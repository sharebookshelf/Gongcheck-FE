"use client";

import { useMutation } from "@tanstack/react-query";
import useSuccessStore from "@/store/successStore";
import useSurveyStore, { Question } from "@/store/surveyStore";
import { useRouter } from "next/navigation";
import { SyncLoader } from "react-spinners";

export default function Template({ children }: { children: React.ReactNode }) {
  const isSuccess = useSuccessStore((state) => state.isSuccess);
  const question = useSurveyStore((state) => state.question);

  const router = useRouter();

  const sendSurveyData = useMutation({
    mutationFn: async (surveyData: Question) => {
      console.log(JSON.stringify(surveyData));
      return fetch(`${process.env.NEXT_PUBLIC_API_URL}/survey`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        credentials: "include",
        body: JSON.stringify(surveyData),
      });
    },
    onSuccess: () => {
      router.push("/categorize");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleSubmit = () => {
    sendSurveyData.mutate(question);
  };

  return (
    <div className="w-full">
      {children}
      <button
        onClick={handleSubmit}
        className={`relative flex flex-row justify-start items-center w-full py-4 text-black my-4 rounded-lg shadow ${
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

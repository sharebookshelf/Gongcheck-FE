"use client";

import { useMutation } from "@tanstack/react-query";
import useSuccessStore from "@/store/successStore";
import useSurveyStore, { Question } from "@/store/surveyStore";
import { useRouter } from "next/navigation";
import { CloudCog } from "lucide-react";

export default function Template({ children }: { children: React.ReactNode }) {
  const isSuccess = useSuccessStore((state) => state.isSuccess);
  const question = useSurveyStore((state) => state.question);

  const router = useRouter();

  const sendSurveyData = useMutation({
    mutationFn: async (surveyData: Question) => {
      console.log(JSON.stringify(surveyData));
      return fetch("http://localhost:3000/survey", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        credentials: "include",
        body: JSON.stringify(surveyData),
        // body: "sdf",
      });
    },
    onSuccess: () => {
      router.push("/dummyResult");
    },
    onError: (error) => {
      console.log("sdf");
      console.log(error);
    },
  });

  // const sendSurveyData = () => {
  //   router.push("/dummyResult");
  //   console.log(question);
  // };

  const handleSubmit = () => {
    sendSurveyData.mutate(question);
  };

  return (
    <div>
      {children}
      <button
        // onClick={() => {
        //   sendSurveyData.mutate(question);
        // }}
        onClick={handleSubmit}
        className={`w-full py-4 text-black my-4 rounded-lg shadow ${
          isSuccess ? "bg-[#FFA500]" : "bg-gray-400"
        }`}
        // "w-full py-4 text-black my-4 rounded-lg shadow {{ isSuccess ? 'bg-[#FFA500]' : 'bg-gray-400' }}"
        disabled={!isSuccess}
      >
        {isSuccess ? "분석 결과 확인" : "책장 분석 중 ..."}
      </button>
    </div>
  );
}

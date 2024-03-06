"use client";
import Image from "next/image";
import image from "../../../public/images/surveyImage1.png";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import useSurveyStore from "@/store/surveyStore";
import { SurveyPageProps } from "../../../types/type";

export default function SurveyPage({ setQuestionPageNumber }: SurveyPageProps) {
  // 선택된 문항의 상태를 관리합니다. 초기값은 null입니다.
  const [selectedQuestion, setSelectedQuestion] = useState<number>(0);
  // localstorage 에 질문 내용과 답 저장
  const updateQuestion = useSurveyStore((state) => state.updateQuestion);
  const question = useSurveyStore((state) => state.question);

  // 문항을 클릭했을 때 호출되는 함수입니다.
  const handleQuestionClick = (questionId: number) => {
    setSelectedQuestion(questionId); // 선택된 문항의 상태를 업데이트합니다.
    console.log(questionId);

    // setQuestion({
    //   ...question,
    //   question1: questionId,
    // });

    updateQuestion("question1", questionId);

    setQuestionPageNumber(2);
  };

  return (
    <motion.div>
      <div className="relative flex flex-col h-full text-white bg-[url('/images/surveyImage1.png')] bg-center">
        <div className="absolute w-full h-full bg-black bg-opacity-50"></div>
        <div
          className="flex flex-col items-center justify-center flex-1 p-4"
          style={{ zIndex: 2 }}
        >
          <h2 className="mb-8 text-2xl font-bold">1/3 Step</h2>
          <p className="mb-8 text-lg text-center">
            책과 관련하여 어떤 고민을 갖고 계신가요?
          </p>
          <div className="w-full max-w-md mb-8 space-y-4">
            <motion.button
              onClick={() => handleQuestionClick(1)}
              className="w-full py-4 text-black bg-white rounded-lg shadow"
              initial={{ opacity: 0.6 }}
              // whileHover={{ scale: 1.05 }}
              animate={{
                backgroundColor: selectedQuestion === 1 ? "#ffa500" : "#fff",
              }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              whileTap={{ scale: 0.9 }}
              whileInView={{ opacity: 1 }}
            >
              어떤 책을 읽어야할 지 모르겠어요.
            </motion.button>
            {/* <button className="w-full py-4 text-black bg-white rounded-lg shadow">
            어떤 책을 읽어야할 지 모르겠어요.
          </button> */}

            <motion.button
              onClick={() => handleQuestionClick(2)}
              className="w-full py-4 text-black bg-white rounded-lg shadow"
              initial={{ opacity: 0.6 }}
              // whileHover={{ scale: 1.05 }}
              animate={{
                backgroundColor: selectedQuestion === 2 ? "#ffa500" : "#fff",
              }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              whileTap={{ scale: 0.9 }}
              whileInView={{ opacity: 1 }}
              // animate={{
              //   backgroundColor: ["hsl(0, 100, 50)", "hsl(-120, 100, 50)"],
              // }}
            >
              책에 손이 잘 안 가요.
            </motion.button>
            {/* <button className="w-full py-4 text-black bg-white rounded-lg shadow">
            책에 손이 잘 안 가요.
          </button> */}

            <motion.button
              onClick={() => handleQuestionClick(3)}
              className="w-full py-4 text-black bg-white rounded-lg shadow"
              initial={{ opacity: 0.6 }}
              // whileHover={{ scale: 1.05 }}
              animate={{
                backgroundColor: selectedQuestion === 3 ? "#ffa500" : "#fff",
              }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              whileTap={{ scale: 0.9 }}
              whileInView={{ opacity: 1 }}
            >
              다른 사람들과 책 정보를 공유하고 싶어요.
            </motion.button>

            {/* <button className="w-full py-4 text-black bg-white rounded-lg shadow">
            다른 사람들과 책 정보를 공유하고 싶어요.
          </button> */}

            <motion.button
              onClick={() => handleQuestionClick(4)}
              className="w-full py-4 text-black bg-white rounded-lg shadow"
              initial={{ opacity: 0.6 }}
              // whileHover={{ scale: 1.05 }}
              animate={{
                backgroundColor: selectedQuestion === 4 ? "#ffa500" : "#fff",
              }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              whileTap={{ scale: 0.9 }}
              whileInView={{ opacity: 1 }}
            >
              책은 많은데 읽을 책이 없어요.
            </motion.button>
            {/* <button className="w-full py-4 text-black bg-white rounded-lg shadow">
            책은 많은데 읽을 책이 없어요.
          </button> */}
          </div>
          <div className="relative mb-8">
            <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-2">
              <span className="block w-3 h-3 bg-[#ffa500] rounded-full" />
              <span className="block w-3 h-3 bg-white rounded-full" />
              <span className="block w-3 h-3 bg-white rounded-full" />
            </div>
          </div>
          <div className="flex items-center justify-center mb-4 space-x-2">
            <span className="block w-3 h-3 bg-[#FFA500] rounded-full" />
            <span className="block w-3 h-3 bg-white rounded-full" />
            <span className="block w-3 h-3 bg-white rounded-full" />
          </div>
          {/* <button className="w-full py-4 text-black bg-white rounded-lg shadow">
            책장 분석 중 ...
          </button> */}
        </div>
      </div>
    </motion.div>
  );
}

function ChevronLeftIcon(props: any) {
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
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

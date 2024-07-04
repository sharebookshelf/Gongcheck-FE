"use client";
import Image from "next/image";
import image from "../../../public/images/surveyImage1.png";
import { motion } from "framer-motion";
import { useState } from "react";
import useSurveyStore from "@/store/surveyStore";
import { SurveyPageProps } from "../../../types/type";

export default function SecondSurvey({
  setQuestionPageNumber,
}: SurveyPageProps) {
  const [selectedQuestion, setSelectedQuestion] = useState<number>(0);

  const updateQuestion = useSurveyStore((state) => state.updateQuestion);

  const handleQuestionClick = (questionId: number) => {
    setSelectedQuestion(questionId); // 선택된 문항의 상태를 업데이트합니다.

    console.log(questionId);
    updateQuestion("question2", questionId);
    setQuestionPageNumber(3);
  };

  return (
    <motion.div>
      <div className="relative flex flex-col h-full text-white bg-[url('/images/surveyImage2.png')] bg-center">
        <div className="absolute w-full h-full bg-black bg-opacity-50"></div>
        <div
          className="flex flex-col items-center justify-center flex-1 p-4"
          style={{ zIndex: 2 }}
        >
          <h2 className="mb-8 text-2xl font-bold">2/3 Step</h2>
          <p className="mb-8 text-lg text-center">
            읽을 책을 보통 어디서 찾으시나요?
          </p>
          <div className="w-full space-y-4">
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
              집
            </motion.button>

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
              도서관
            </motion.button>

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
              온라인 도서 판매처
            </motion.button>

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
              오프라인 서점
            </motion.button>
          </div>
          <div className="relative mb-8">
            <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-2">
              <span className="block w-3 h-3 bg-[#ffa500] rounded-full" />
              <span className="block w-3 h-3 bg-white rounded-full" />
              <span className="block w-3 h-3 bg-white rounded-full" />
            </div>
          </div>
          <div className="flex items-center justify-center mb-4 space-x-2">
            <span className="block w-3 h-3 bg-white rounded-full" />
            <span className="block w-3 h-3 bg-[#FFA500] rounded-full" />
            <span className="block w-3 h-3 bg-white rounded-full" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import useSurveyStore from "@/store/surveyStore";
import { SurveyPageProps } from "../../../types/type";
import Image from "next/image";
import bg_image from "../../../../public/images/surveyImage2.png";

export default function SecondSurvey({
  setQuestionPageNumber,
  paginate,
}: SurveyPageProps) {
  const [selectedQuestion, setSelectedQuestion] = useState<number>(0);

  const updateQuestion = useSurveyStore((state) => state.updateQuestion);

  const handleQuestionClick = (questionId: number) => {
    setSelectedQuestion(questionId); // 선택된 문항의 상태를 업데이트합니다.
    updateQuestion("question2", questionId);
    paginate(1);
  };

  return (
    <motion.div className="relative flex-grow w-full h-full">
      <Image
        src={bg_image}
        className="object-cover w-full h-full"
        fill
        sizes="(max-width: 768px) 100vw, 
        (max-width: 1200px) 50vw, 
        33vw"
        alt="survey1"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>
      <div className="absolute flex flex-col items-center justify-center w-full h-full p-4 text-white">
        {/* <h2 className="mb-8 text-2xl font-bold">2/3 Step</h2> */}
        <p className="mb-8 text-lg text-center">
          독서 후 읽은 내용과 관련되어 연관 활동을 이어가시나요?
        </p>
        <div className="w-full space-y-4">
          <motion.button
            onClick={() => handleQuestionClick(1)}
            className="w-full py-4 text-black bg-white rounded-lg shadow"
            initial={{ opacity: 0.6 }}
            whileHover={{ scale: 1.05 }}
            animate={{
              backgroundColor: selectedQuestion === 1 ? "#ffa500" : "#fff",
            }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            whileTap={{ scale: 0.9 }}
            whileInView={{ opacity: 1 }}
          >
            관련 서적이나 강의를 주로 찾아봄
          </motion.button>

          <motion.button
            onClick={() => handleQuestionClick(2)}
            className="w-full py-4 text-black bg-white rounded-lg shadow"
            initial={{ opacity: 0.6 }}
            whileHover={{ scale: 1.05 }}
            animate={{
              backgroundColor: selectedQuestion === 2 ? "#ffa500" : "#fff",
            }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            whileTap={{ scale: 0.9 }}
            whileInView={{ opacity: 1 }}
          >
            저자의 주요 다른 활동을 찾아보거나 참여함(북 토크 등)
          </motion.button>

          <motion.button
            onClick={() => handleQuestionClick(3)}
            className="w-full py-4 text-black bg-white rounded-lg shadow"
            initial={{ opacity: 0.6 }}
            whileHover={{ scale: 1.05 }}
            animate={{
              backgroundColor: selectedQuestion === 3 ? "#ffa500" : "#fff",
            }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            whileTap={{ scale: 0.9 }}
            whileInView={{ opacity: 1 }}
          >
            관련 책을 읽은 다른 사람드로가 감상평을 나눔
          </motion.button>

          <motion.button
            onClick={() => handleQuestionClick(4)}
            className="w-full py-4 text-black bg-white rounded-lg shadow"
            initial={{ opacity: 0.6 }}
            whileHover={{ scale: 1.05 }}
            animate={{
              backgroundColor: selectedQuestion === 4 ? "#ffa500" : "#fff",
            }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            whileTap={{ scale: 0.9 }}
            whileInView={{ opacity: 1 }}
          >
            활동 없음
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
    </motion.div>
  );
}

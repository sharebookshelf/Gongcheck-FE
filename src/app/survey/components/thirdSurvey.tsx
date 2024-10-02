"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import useSurveyStore from "@/store/surveyStore";
import { SurveyPageProps } from "../../../types/type";
import Image from "next/image";
import bg_image from "../../../../public/images/surveyImage3.png";

export default function ThirdSurvey({
  setQuestionPageNumber,
}: SurveyPageProps) {
  const [selectedQuestion, setSelectedQuestion] = useState<number>(0);

  const updateQuestion = useSurveyStore((state) => state.updateQuestion);

  const handleQuestionClick = (questionId: number) => {
    setSelectedQuestion(questionId); // 선택된 문항의 상태를 업데이트합니다.
    updateQuestion("question3", questionId);
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
        <h2 className="mb-8 text-2xl font-bold">3/3 Step</h2>
        <p className="mb-8 text-lg text-center">
          다음 저희 서비스 중에서 가장 끌리는 것은 무엇인가요?
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
            내 책장에 읽은 책과 안 읽은 책을 손쉽게 관리
          </motion.button>

          <motion.button
            onClick={() => handleQuestionClick(2)}
            className="w-full p-4 text-black bg-white rounded-lg shadow"
            initial={{ opacity: 0.6 }}
            whileHover={{ scale: 1.05 }}
            animate={{
              backgroundColor: selectedQuestion === 2 ? "#ffa500" : "#fff",
            }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            whileTap={{ scale: 0.9 }}
            whileInView={{ opacity: 1 }}
          >
            내 독서 성향 혹은 교육 성향에 따라 관련 컨텐츠(강의 등)을 추천/연계
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
            다른 사람의 책장과 인플루언서의 책장을 컨텐츠로 제공
          </motion.button>

          <motion.button
            onClick={() => handleQuestionClick(4)}
            className="w-full p-4 text-black bg-white rounded-lg shadow"
            initial={{ opacity: 0.6 }}
            whileHover={{ scale: 1.05 }}
            animate={{
              backgroundColor: selectedQuestion === 4 ? "#ffa500" : "#fff",
            }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            whileTap={{ scale: 0.9 }}
            whileInView={{ opacity: 1 }}
          >
            내 책장을 캐릭터로 예쁘게 꾸미고, 다른 사람들과 상호작용하는 공간
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
          <span className="block w-3 h-3 bg-white rounded-full" />
          <span className="block w-3 h-3 bg-[#FFA500] rounded-full" />
        </div>
      </div>
    </motion.div>
  );
}

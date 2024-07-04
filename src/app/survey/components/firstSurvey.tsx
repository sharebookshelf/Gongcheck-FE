"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import useSurveyStore from "@/store/surveyStore";
import { SurveyPageProps } from "../../../types/type";
import Image from "next/image";
import bg_image from "../../../../public/images/surveyImage1.png";

export default function FirstSurvey({
  setQuestionPageNumber,
}: SurveyPageProps) {
  const [selectedQuestion, setSelectedQuestion] = useState<number>(0);

  const updateQuestion = useSurveyStore((state) => state.updateQuestion);

  const handleQuestionClick = (questionId: number) => {
    setSelectedQuestion(questionId); // 선택된 문항의 상태를 업데이트합니다.
    updateQuestion("question1", questionId);
    setQuestionPageNumber(2);
  };

  return (
    <motion.div className="relative flex h-full w-full">
      {/* <Image
        src={bg_image}
        alt="survey1"
        fill
        className="z-0"
        objectFit="cover"
      /> */}
      <div className="relative flex flex-col h-full text-white bg-[url('/images/surveyImage1.png')] bg-center">
        <div className="absolute w-full h-full bg-black bg-opacity-50"></div>
        <div
          className="flex flex-col h-full items-center justify-center p-4 text-white"
          style={{ zIndex: 2 }}
        >
          <h2 className="mb-8 text-2xl font-bold">1/3 Step</h2>
          <p className="mb-8 text-lg text-center">
            책과 관련하여 어떤 고민을 갖고 계신가요?
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
              어떤 책을 읽어야할 지 모르겠어요.
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
            >
              책에 손이 잘 안 가요.
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
              다른 사람들과 책 정보를 공유하고 싶어요.
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
              책은 많은데 읽을 책이 없어요.
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
            <span className="block w-3 h-3 bg-[#FFA500] rounded-full" />
            <span className="block w-3 h-3 bg-white rounded-full" />
            <span className="block w-3 h-3 bg-white rounded-full" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

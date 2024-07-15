"use client";

import { AnimatePresence, motion } from "framer-motion";

import { useState } from "react";
import FirstSurvey from "./components/FirstSurvey";
import useSurveyStore from "@/store/surveyStore";
import { useSurveyMutation } from "./hooks/useSurveyMutation";
import { SyncLoader } from "react-spinners";
import useSuccessStore from "@/store/successStore";
import SecondSurvey from "./components/SecondSurvey";
import ThirdSurvey from "./components/ThirdSurvey";

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

export default function SurveyMainPage() {
  const [questionPageNumber, setQustionPageNumber] = useState(1);
  const [direction, setDirection] = useState(0);

  const question = useSurveyStore((state) => state.question);
  const isSuccess = useSuccessStore((state) => state.isSuccess);

  const { mutate } = useSurveyMutation();

  const handleSubmit = () => {
    mutate(question);
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setQustionPageNumber((prev) => prev + newDirection);
  };

  return (
    <div className="relative flex flex-col w-full h-full space-y-2 overflow-hidden">
      <div className="relative flex-grow">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={questionPageNumber}
            className="absolute w-full h-full"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 400, damping: 100 }}
          >
            {questionPageNumber === 1 && (
              <FirstSurvey
                paginate={paginate}
                setQuestionPageNumber={setQustionPageNumber}
              />
            )}
            {questionPageNumber === 2 && (
              <SecondSurvey
                paginate={paginate}
                setQuestionPageNumber={setQustionPageNumber}
              />
            )}
            {questionPageNumber === 3 && (
              <ThirdSurvey
                paginate={paginate}
                setQuestionPageNumber={setQustionPageNumber}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      <button
        onClick={handleSubmit}
        className={`relative flex flex-row p-4 items-center w-full text-black rounded-lg shadow ${
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

"use client";

import { AnimatePresence, motion } from "framer-motion";

import { useEffect, useRef, useState } from "react";
import useSurveyStore from "@/store/surveyStore";
import { useSurveyMutation } from "./hooks/useSurveyMutation";
import { SyncLoader } from "react-spinners";
import useSuccessStore from "@/store/successStore";
import ThirdSurvey from "./components/thirdSurvey";
import SecondSurvey from "./components/secondSurvey";
import FirstSurvey from "./components/firstSurvey";
import { ProgressWithValue } from "@/components/ui/progress-with-value";

const PERCENTAGE = [0, 10, 15, 30, 45, 50, 65, 80, 90, 100];

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
  const [value, setValue] = useState(0);

  const indexRef = useRef(0);

  const question = useSurveyStore((state) => state.question);
  const isSuccess = useSuccessStore((state) => state.isSuccess);

  const { mutate } = useSurveyMutation();

  useEffect(() => {
    const interval = setInterval(() => {
      if (indexRef.current >= PERCENTAGE.length) {
        clearInterval(interval);
        return; // 마지막 값에 도달하면 interval을 정리하고 종료
      }

      setValue(PERCENTAGE[indexRef.current]);
      indexRef.current++;
    }, 2000);

    return () => clearInterval(interval);
  }, []);

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
        <ProgressWithValue
          className="absolute top-5 z-50"
          value={value}
          position={"start"}
        />
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
          {/* {isSuccess ? null : <BookLoader />} */}
        </div>
      </button>
    </div>
  );
}

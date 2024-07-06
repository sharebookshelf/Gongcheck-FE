"use client";

import { AnimatePresence, motion } from "framer-motion";

import { useState } from "react";
import SecondSurvey from "./components/SecondSurvey";
import FirstSurvey from "./components/FirstSurvey";
import ThirdSurvey from "./components/ThirdSurvey";

const variants = {
  enter: (direction: number) => {
    return {
      x: 200,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      x: 1000,
      opacity: 0,
    };
  },
};

export default function SurveyMainPage() {
  const [questionPageNumber, setQustionPageNumber] = useState(1);

  return (
    <div className="flex flex-col w-full h-full">
      <AnimatePresence>
        <motion.div
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: "spring" }}
        >
          {questionPageNumber === 1 && (
            <FirstSurvey setQuestionPageNumber={setQustionPageNumber} />
          )}
          {questionPageNumber === 2 && (
            <SecondSurvey setQuestionPageNumber={setQustionPageNumber} />
          )}
          {questionPageNumber === 3 && (
            <ThirdSurvey setQuestionPageNumber={setQustionPageNumber} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

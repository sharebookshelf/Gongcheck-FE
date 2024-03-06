"use client";

import { AnimatePresence, motion } from "framer-motion";
import FirstSurveyPage from "./components/firstSurvey";
import SecondSurveyPage from "./components/secondSurvey";
import ThirdSurveyPage from "./components/thirdSurvey";

import { useEffect, useState } from "react";
import useSurveyStore from "@/store/surveyStore";

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
  // console.log(questionPageNumber);
  const question = useSurveyStore((state) => state.question);

  // useEffect(() => {
  //   console.log(question);
  // }, [question]);

  return (
    <div>
      <AnimatePresence>
        <motion.div
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: "spring" }}
        >
          {questionPageNumber === 1 && (
            <FirstSurveyPage setQuestionPageNumber={setQustionPageNumber} />
          )}
          {questionPageNumber === 2 && (
            <SecondSurveyPage setQuestionPageNumber={setQustionPageNumber} />
          )}
          {questionPageNumber === 3 && (
            <ThirdSurveyPage setQuestionPageNumber={setQustionPageNumber} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
  // ;
}

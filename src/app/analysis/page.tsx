"use client";

import Upload from "../upload/page";
import Categorize from "../categorize/components/Categorize";
import useStepStore from "@/store/useStepStore";

export default function Page() {
  // const [step, setStep] = useState('upload');
  const { step } = useStepStore((state) => state);

  return (
    <>
      {step === "upload" ? (
        <Upload />
      ) : step === "survey" ? (
        <Survey />
      ) : step === "categorize" ? (
        <Categorize />
      ) : step === "rank" ? (
        <Rank />
      ) : step === "result" ? (
        <Result />
      ) : null}
    </>
  );
}

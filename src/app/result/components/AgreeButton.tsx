import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { FrownIcon, SmileIcon, ThumbsDownIcon, ThumbsUpIcon } from "./Icon";
import { useFeedbackMutation } from "../hooks/useFeedbackMutation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function AgreeButton() {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>("");
  const [isFeedbackOpen, setIsFeedbackOpen] = useState<boolean>(false);
  const [currentFeedbackType, setCurrentFeedbackType] = useState<string>("");

  const { mutate } = useFeedbackMutation();

  const handleFeedbackSubmit = async () => {
    mutate({ isAgree: currentFeedbackType, feedback });
    setIsFetching(true);
    setIsFeedbackOpen(false);
  };

  const openFeedbackDialog = (isAgree: string) => {
    setCurrentFeedbackType(isAgree);
    setIsFeedbackOpen(true);
  };

  return (
    <>
      <div className="flex flex-row items-center justify-between w-full gap-4 mb-4">
        <Button
          onClick={() => openFeedbackDialog("y")}
          className="flex items-center space-x-2 bg-[#FFE8AC] px-4 py-2 rounded-full hover:bg-orange-400"
          disabled={isFetching}
        >
          <ThumbsUpIcon className="text-[#FFCC4D]" />
          <span className="font-medium text-[#333333]">공감해요!</span>
          <SmileIcon className="text-[#FFCC4D]" />
        </Button>
        <Button
          onClick={() => openFeedbackDialog("n")}
          className="flex items-center space-x-2 bg-[#C4C4C4] px-4 py-2 rounded-full hover:text-white"
          disabled={isFetching}
        >
          <ThumbsDownIcon className="text-[#FFFFFF]" />
          <span className="font-medium text-[#333333]">아니에요</span>
          <FrownIcon className="text-[#FFFFFF]" />
        </Button>
      </div>

      <AlertDialog open={isFeedbackOpen} onOpenChange={setIsFeedbackOpen}>
        <AlertDialogContent className="flex flex-col justify-center">
          <AlertDialogHeader className="flex flex-col justify-center items-center">
            <AlertDialogTitle className="text-2xl">
              피드백을 남겨주세요
            </AlertDialogTitle>
            <AlertDialogDescription>
              왜 그렇게 생각하셨는지 피드백을 작성해 주세요.
            </AlertDialogDescription>
            <textarea
              placeholder="피드백을 입력해주세요."
              className="w-full mt-4 p-2 border rounded"
              rows={4}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsFeedbackOpen(false)}>
              취소
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleFeedbackSubmit}>
              확인
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

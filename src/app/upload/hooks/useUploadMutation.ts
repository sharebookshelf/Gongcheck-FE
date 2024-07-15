import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import useSuccessStore from "@/store/successStore";

type FeedbackPostRequest = {
  feedbackComment: string;
  corrected: boolean;
  quizId: number;
};

export function useUploadMutation() {
  const router = useRouter(); // router 사용 설정
  const setIsSuccess = useSuccessStore((state) => state.setIsSuccess);

  return useMutation({
    mutationFn: async (formData: FormData) => {
      router.push("/survey");
      await new Promise((resolve) => {
        // 10초 후에 resolve 함수를 호출하여 Promise가 완료되었음을 알림
        setTimeout(() => {
          // console.log("데이터 처리 완료");
          resolve("데이터 준비 완료");
        }, 3000); // 3초 대기
      });
      return fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookshelves`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });
    },
    onSuccess(response, variable) {
      setIsSuccess(true);
    },
    onError() {
      toast({
        variant: "destructive",
        title: "요청에 실패하였습니다.",
        description: "입력하신 정보를 확인 후 다시 한 번 시도해주세요.",
        // action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      router.replace("/");
    },
  });
}

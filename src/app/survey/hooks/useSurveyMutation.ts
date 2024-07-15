import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { Question } from "@/store/surveyStore";
import { useRouter } from "next/navigation";
import useSuccessStore from "@/store/successStore";

export function useSurveyMutation() {
  const router = useRouter();
  const setIsSuccess = useSuccessStore((state) => state.setIsSuccess);

  return useMutation({
    mutationKey: ["fetchSurvey"],
    mutationFn: async (surveyData: Question) => {
      return fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me/surveys`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        credentials: "include",
        body: JSON.stringify(surveyData),
      });
    },
    onSuccess: () => {
      router.push("/categorize");
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: error.message,
        description: "잠시 후 다시 시도해주세요.",
      });
      console.error(
        "There was a problem with your fetch operation:",
        error.message
      );
    },
    onSettled(data, error, variables, context) {
      setIsSuccess(false);
    },
  });
}

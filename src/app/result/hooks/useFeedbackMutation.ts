import { useMutation } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

type Props = {
  isAgree: string;
  feedback: string;
};

export function useFeedbackMutation() {
  return useMutation({
    mutationKey: ["feedback"],
    mutationFn: async ({ isAgree, feedback }: Props) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users?isAgree=${isAgree}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "PATCH",
          credentials: "include",
          body: JSON.stringify({ feedback }),
        }
      );
      if (!response.ok) {
        const errorData = await response.json(); // 에러 메시지를 포함할 수 있는 응답의 본문
        throw {
          status: response.status,
          message: errorData.message ?? "에러가 발생했습니다.",
        }; // 에러 객체를 throw
      }
      return response.json(); // 성공 응답 데이터 반환
    },
    onSuccess: (data) => {
      toast({
        title: "피드백 전송에 성공하였습니다.",
      });
    },
    onError: (error: any) => {
      // console.log(error);
      if (error.status === 409) {
        toast({
          variant: "destructive",
          title: "이미 피드백을 전송하셨습니다.",
          // description: "잠시 후 다시 시도해주세요.",
        });
      } else {
        toast({
          variant: "destructive",
          title: error.message,
          description: "잠시 후 다시 시도해주세요.",
        });
      }
      console.error(
        "There was a problem with your fetch operation:",
        error.message
      );
    },
  });
}

import { useMutation } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { Question } from "@/store/surveyStore";
import { useRouter } from "next/navigation";

interface Request {
  bookId: number;
  // status: string | null | undefined;
  rank: number;
}

export function useUpdateRankMutation() {
  const router = useRouter();
  return useMutation({
    mutationKey: ["fetchSurvey"],
    mutationFn: async (data: Request[]) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/book`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json(); // 에러 메시지를 포함할 수 있는 응답의 본문
        throw {
          status: response.status,
          message: errorData.message ?? "에러가 발생했습니다.",
        }; // 에러 객체를 throw
      }
    },
    onSuccess: (data) => {
      router.push("/result");
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: error.message,
        // description: "잠시 후 다시 시도해주세요.",
      });
      console.error(
        "There was a problem with your fetch operation:",
        error.message
      );
    },
  });
}

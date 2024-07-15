import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

type Props = {
  postId: number;
  password: string;
};

export function usePostDeleteMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deleteBookshelf"],
    mutationFn: async ({ postId, password }: Props) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/bookshelves`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "DELETE",
          credentials: "include",
          body: JSON.stringify({ postId, password }),
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
      queryClient.invalidateQueries();
      toast({
        title: "책장 삭제에 성공하였습니다.",
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: error.message,
        description: "다시 시도해주세요.",
      });

      console.error(
        "There was a problem with your fetch operation:",
        error.message
      );
    },
  });
}

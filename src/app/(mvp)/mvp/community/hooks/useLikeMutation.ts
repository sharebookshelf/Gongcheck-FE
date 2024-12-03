import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";

type Props = {
  likeStatus: boolean;
  postId: number;
};

export function useLikeMutation() {
  return useMutation({
    mutationKey: ["updateLikeStatus"],
    mutationFn: async ({ likeStatus, postId }: Props) => {
      // console.log(likedStatus, postId);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/me/bookshelves/like`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          credentials: "include",
          body: JSON.stringify({ likeStatus, postId }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        // const errorData = await response.json(); // 에러 메시지를 포함할 수 있는 응답의 본문
        throw {
          status: response.status,
          message: data.message ?? "에러가 발생했습니다.",
        }; // 에러 객체를 throw
      }
      return data; // 성공 응답 데이터 반환
    },
    onSuccess: (data) => {},
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

import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import useSuccessStore from "@/store/successStore";
import useNaverBookStore, { NaverBook } from "@/store/naverBookStore";

type UploadInfo = {
  nickname: string;
  gender: string;
  birth: string;
  books: NaverBook[];
};

export function useUploadBookMutations() {
  const router = useRouter(); // router 사용 설정
  const setIsSuccess = useSuccessStore((state) => state.setIsSuccess);
  const { resetBooks } = useNaverBookStore((state) => state);

  return useMutation({
    mutationFn: async (uploadInfo: UploadInfo) => {
      return fetch(`${process.env.NEXT_PUBLIC_API_URL}/flea/upload`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(uploadInfo),
      });
    },
    onSuccess(response, variable) {
      toast({
        title: "등록에 성공하였습니다.",
      });
      router.push("/survey");

      resetBooks();
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

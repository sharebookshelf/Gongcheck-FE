import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { z } from "zod";
import { useRouter } from "next/navigation";

const PasswordFormSchema = z.object({
  password: z
    .string()
    .min(1, { message: "비밀번호는 1자리 이상 입력해주세요." }),
});

type PasswordUpdateRequest = {
  password: string;
  // bookshelfId: number;
};

export function usePasswordUpdateMutation() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationKey: ["updatePassword"],
    mutationFn: async ({ password }: PasswordUpdateRequest) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/me/bookshelves/password`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw {
          status: response.status,
          message: errorData.message ?? "에러가 발생했습니다.",
        };
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookshelves"] });
      toast({
        title: "비밀번호 설정 성공",
        description: "비밀번호가 성공적으로 설정되었습니다.",
      });
      router.push("/community");
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "오류가 발생했습니다.",
        description: error.message ?? "잠시 후 다시 시도해주세요.",
      });
      console.error(
        "There was a problem with your fetch operation:",
        error.message
      );
    },
  });
}

export { PasswordFormSchema };

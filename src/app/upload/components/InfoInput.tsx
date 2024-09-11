"use client";
import { Input } from "@/components/ui/Input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useUploadMutation } from "../hooks/useUploadMutation";
import { transformDate } from "@/lib/utils";
import Loading from "@/app/components/loading";
import { useUploadBookMutations } from "../hooks/useUploadBookMutation";
import useNaverBookStore from "@/store/naverBookStore";

// Zod 스키마 정의
const userInfoSchema = z.object({
  nickname: z.string().min(2, "닉네임은 2글자 이상이어야 합니다."),
  birth: z.string().min(8, "생년월일 8자리를 입력해주세요."),
  gender: z.enum(["m", "w"]),
});

export default function InfoInput() {
  const { naverBooks } = useNaverBookStore((state) => state);
  const { mutate } = useUploadBookMutations();

  const form = useForm<z.infer<typeof userInfoSchema>>({
    resolver: zodResolver(userInfoSchema),
    mode: "onChange",
    defaultValues: {
      nickname: "",
      birth: "",
      gender: "m",
    },
  });

  const onSubmit = async (data: z.infer<typeof userInfoSchema>) => {
    const uploadInfo = {
      ...data,
      books: naverBooks,
    };
    console.log(uploadInfo);
    mutate(uploadInfo);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="nickname"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-bold">
                닉네임 <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="이름을 입력해주세요." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="birth"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-bold">
                생년월일 <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="date"
                  placeholder="ex) 19901216"
                  {...field}
                  value={field.value}
                  onChange={(e) => {
                    const cleanInput = e.target.value.replace(/\D/g, ""); // 숫자가 아닌 문자 제거
                    const formattedInput = transformDate(cleanInput);
                    field.onChange(formattedInput); // 업데이트된 값을 form 필드에 설정
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-base font-bold">성별</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue="m"
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="m" />
                    </FormControl>
                    <FormLabel className="text-base">남자</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="w" />
                    </FormControl>
                    <FormLabel className="text-base">여자</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full flex justify-center">
          <Button
            className="w-full bg-[#F59E0B] text-white py-3 rounded-lg font-medium"
            type="submit"
            disabled={!naverBooks || naverBooks.length === 0}
          >
            등록하기
          </Button>
        </div>
      </form>
    </Form>
  );
}

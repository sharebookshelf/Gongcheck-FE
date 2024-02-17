import { Button } from "@/components/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "../../../components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import { useState } from "react";
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
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useRouter } from "next/navigation";

// Zod 스키마 정의
const userInfoSchema = z.object({
  nickname: z.string().min(2, "닉네임은 2글자 이상이어야 합니다."),
  birth: z.string().length(8, "생년월일 8자리를 입력해주세요."),
  // .regex(
  //   /^\d{4}\/\d{2}\/\d{2}$/,
  //   "생년월일 형식이 올바르지 않습니다. YYYYMMDD 형식으로 입력해주세요."
  // ),
  gender: z.enum(["m", "w"]),
});

interface Props {
  onInfoChange: (data: {
    nickname: string;
    birth: string;
    gender: string;
  }) => void;
  uploadedFiles: File[];
}
interface Data {
  nickname: string;
  birth: string;
  gender: string;
}

export default function InfoInput({ onInfoChange, uploadedFiles }: Props) {
  const router = useRouter();
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
    const formData = new FormData();
    uploadedFiles.forEach((file) => {
      formData.append("files", file);
    });
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key as keyof Data]);
    });
    console.log(uploadedFiles.length);

    try {
      const response = await fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        toast({
          variant: "destructive",
          title: "요청에 실패하였습니다.",
          description: "입력하신 정보를 확인 후 다시 한 번 시도해주세요.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      } else {
        const data = await response.json();
        console.log(data);
        router.push("/question");
      }
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
      toast({
        variant: "destructive",
        title: "요청에 실패하였습니다.",
        description: "입력하신 정보를 확인 후 다시 한 번 시도해주세요.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };

  return (
    <div className="flex flex-col w-4/5 mt-10 mb-10">
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
                  <Input placeholder="ex) 20001216" {...field} />
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
              className="w-full mb-10 bg-[#F59E0B] text-white py-3 rounded-lg font-medium"
              type="submit"
              disabled={!uploadedFiles || uploadedFiles.length === 0}
            >
              등록하기
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

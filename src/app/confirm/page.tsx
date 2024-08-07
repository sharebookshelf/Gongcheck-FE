"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { UserIcon } from "lucide-react";
import Image from "next/image";
import bookshelfImage from "../../../public/images/bookshelf1.jpg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { usePasswordUpdateMutation } from "./hooks/usePasswordMutation";
import Loading from "../components/loading";
import { useUserBookshelfQuery } from "./hooks/useBookshelfQuery";
import { readingTypeInfo } from "../result/resultData";

const FormSchema = z.object({
  password: z
    .string()
    .min(1, { message: "비밀번호는 1자리 이상 입력해주세요." }),
});

export default function Page() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",
    },
  });

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const { data } = useUserBookshelfQuery();
  const { mutate } = usePasswordUpdateMutation();

  if (!data) {
    return <Loading />;
  }

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    // console.log(data);
    mutate({ password: data.password });
  };

  return (
    <div className="flex flex-col items-center p-4 h-full space-y-6 overflow-y-auto">
      <div className="text-center">
        <h1 className="text-3xl font-bold">나의 책장 공유하기</h1>
        <p className="mt-2 text-base">
          당신의 책장을 공유해주세요! 다른 사람들은 어떤 책을 읽을지
          탐험해보세요!
        </p>
      </div>
      <div className="w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">미리보기</h2>
        <div className="bg-white space-y-2 rounded-lg shadow-xl p-4 border">
          <div className="flex items-center mb-4">
            <UserIcon className="h-6 w-6 mr-2" />
            <span className="text-lg font-bold">{data.nickname}</span>
          </div>
          <p className="text-base mb-4">
            {
              readingTypeInfo[data.readingType as keyof typeof readingTypeInfo]
                .type
            }
          </p>
          <div className=" flex w-full">
            <Carousel
              setApi={setApi}
              opts={{
                align: "start",
                // dragFree: true,
                skipSnaps: true,
                // inViewThreshold: 1,
              }}
            >
              <CarouselContent>
                {data.bookshelves.map((bookshelf) => (
                  <CarouselItem key={bookshelf.id}>
                    <div className="relative flex items-center justify-center w-full h-full">
                      <Image
                        className="object-contain w-full pointer-events-none"
                        priority
                        width={300}
                        height={300}
                        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${bookshelf.bookShelfImage}`}
                        alt={`Bookshelf`}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {/* <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10" />
              <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10" /> */}
            </Carousel>
          </div>
          <div className="flex justify-center space-x-2">
            {Array.from({ length: count }).map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  current === index + 1 ? "bg-orange-500" : "bg-gray-300"
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">비밀번호 설정</h2>
        <h2 className="text-xs mb-4">
          비밀번호를 설정하여 책장을 삭제할 수 있습니다.
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      // type="password"
                      placeholder="비밀번호를 입력해주세요."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="bg-[#f39c12] text-white w-full max-w-md py-3 mt-6"
            >
              업로드하고 다른 책장 구경가기
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

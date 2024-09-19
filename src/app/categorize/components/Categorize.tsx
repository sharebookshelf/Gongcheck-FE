"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import useBookStore from "@/store/bookStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FormSchema } from "../lib/FormSchema";
import { z } from "zod";
import Image from "next/image";
import { useBookQuery } from "../hooks/useBookQuery";
import Loading from "@/app/components/loading";
import { toast } from "@/components/ui/use-toast";

export default function Categorize() {
  const router = useRouter();
  const { setCompletedBookIds } = useBookStore((state) => state);
  const { data: books, isError, error } = useBookQuery();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: [],
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setCompletedBookIds(data.items);
    router.push("/rank");
  }

  if (
    isError &&
    error.message === "세션이 없거나 만료되었습니다. 책장을 다시 등록해주세요"
  ) {
    toast({
      variant: "destructive",
      title: error.message,
      description: "홈화면으로 돌아갑니다.",
    });
    router.push("/");
  }

  if (!books) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex flex-col w-full h-full p-4 overflow-y-auto border rounded-lg shadow-2xl border-slate-300 ">
        <Form {...form}>
          <form
            id="category"
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-2"
          >
            <FormField
              control={form.control}
              name="items"
              render={({ field }) => (
                <>
                  {/* 모두 선택 버튼 추가 */}
                  <FormItem className="cursor-pointer hover:bg-orange-50">
                    <div className="flex flex-row items-center w-full space-x-3">
                      <FormControl>
                        <Checkbox
                          checked={field.value.length === books.length}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange(books.map((item) => item.bookId))
                              : field.onChange([]);
                          }}
                        />
                      </FormControl>
                      <FormLabel className="flex w-full h-full p-2 space-x-3 text-sm font-normal">
                        모두 선택
                      </FormLabel>
                    </div>
                  </FormItem>
                  {/* 개별 책 항목 */}
                  {books.map((item) => (
                    <FormItem
                      key={item.bookId}
                      className="cursor-pointer hover:bg-orange-50"
                    >
                      <div className="flex flex-row items-center w-full space-x-3">
                        <FormControl>
                          <Checkbox
                            checked={field.value.includes(item.bookId)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.bookId])
                                : field.onChange(
                                    field.value.filter(
                                      (value) => value !== item.bookId
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="flex w-full h-full p-2 space-x-3 text-sm font-normal">
                          <Image
                            alt="Book cover"
                            className="object-cover w-10 h-15 aspect-[40/60]"
                            height="60"
                            src={item.titleUrl || "/images/logo.png"}
                            width="40"
                            style={{ width: "auto", height: "100%" }}
                          />
                          <div className="flex flex-col justify-center space-y-1">
                            <div className="text-sm font-light">
                              {item.title}
                            </div>
                            <div className="text-xs text-gray-500">
                              {item.publisher}
                            </div>
                            <div className="text-xs text-gray-500">
                              {item.author}
                            </div>
                          </div>
                        </FormLabel>
                      </div>
                    </FormItem>
                  ))}
                </>
              )}
            />
            <FormMessage />
          </form>
        </Form>
      </div>
      <Button
        form="category"
        type="submit"
        className="bg-[#F59E0B] text-white w-full mt-10"
      >
        다음
      </Button>
    </>
  );
}

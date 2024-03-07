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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import { useEffect } from "react";
import { fetchBook } from "@/utils/fetchBook";
import useBookStore from "../../store/bookStore";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  items: z.array(z.number()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});

export default function Categorize() {
  useEffect(() => {
    fetchBook();
  }, []);

  const router = useRouter();

  const books = useBookStore((set) => set.books);
  const filteredBooks = books.filter((book) => book.status === "y");

  const updateStatusForItems = useBookStore(
    (state) => state.updateStatusForItems
  );

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: [],
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // 선택된 items에 대해 status 업데이트
    updateStatusForItems(data.items);
    router.push("/rank");
  }

  return (
    <main className="flex flex-col items-center w-4/5 h-auto pb-10 my-5 overflow-hidden">
      <h1 className="text-3xl">책장 분석이 완료되었습니다!</h1>
      <div className="my-10 text-2xl font-light">
        읽은 책에 표시를 해주세요!
      </div>
      <div className="w-full p-4 overflow-y-auto border rounded-lg shadow-2xl h-4/5 mb-30 border-slate-300 ">
        <Form {...form}>
          <form
            id="category"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="items"
              render={() => (
                <FormItem>
                  {books &&
                    books.map((item) => (
                      <FormField
                        key={item.bookId}
                        control={form.control}
                        name="items"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.bookId}
                              className="flex flex-row items-center space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.bookId)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          item.bookId,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item.bookId
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">
                                <div className="flex flex-row items-center justify-center space-y-2 space-x-2">
                                  <Image
                                    alt="Book cover"
                                    className="object-cover w-10 h-15 flex-shrink-0 aspect-[40/60]"
                                    height="60"
                                    src={item.titleUrl || "/images/logo.png"}
                                    width="40"
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
                                </div>
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  <FormMessage />
                </FormItem>
              )}
            />
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
    </main>
  );
}

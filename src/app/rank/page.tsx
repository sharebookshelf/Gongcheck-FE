"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import useBookStore from "../../store/bookStore";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getBackgroundColor } from "./lib/getBackgroundColor";
import { useUpdateRankMutation } from "./hooks/useUpdateRankMutation";
import { useBookQuery } from "../categorize/hooks/useBookQuery";
import Loading from "../components/loading";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Rank() {
  const { data: books } = useBookQuery();
  const { completedBookIds } = useBookStore((state) => state);

  const [selectedBookIds, setSelectedBookIds] = useState<Array<number>>([]);
  const { mutate, isPending } = useUpdateRankMutation();

  if (!books) {
    return <Loading />;
  }

  const filteredBooks = books.filter((book) =>
    completedBookIds.includes(book.bookId)
  );

  // 책을 클릭했을 때 호출될 함수
  const toggleBookSelection = (bookId: number) => {
    setSelectedBookIds((prevSelectedBookIds) => {
      const index = prevSelectedBookIds.indexOf(bookId);
      if (index > -1) {
        // 이미 선택된 경우, 선택 해제
        return prevSelectedBookIds.filter((id) => id !== bookId);
      } else {
        // 3개 이상 선택하지 못하도록 제한
        if (prevSelectedBookIds.length >= 5) {
          return prevSelectedBookIds;
        }
        // 새로운 선택 추가
        return [...prevSelectedBookIds, bookId];
      }
    });
  };

  const handleSubmitButton = async () => {
    const body = filteredBooks.map((book) => {
      return {
        bookId: book.bookId,
        // status: book.status,
        rank: selectedBookIds.indexOf(book.bookId) + 1,
      };
    });
    mutate(body);
  };

  return (
    <main className="flex flex-col items-center justify-between w-full h-full p-2 space-y-2">
      <h1 className="text-3xl">책장 분석이 완료되었습니다!</h1>
      <div className="font-light text-gray-500 text-l">
        좋아하는 순서로 순위를 매겨주세요!(최대 5권)
      </div>
      <div className="w-full p-4 space-y-4 overflow-y-auto border rounded-lg shadow-2xl h-3/4 border-slate-300">
        {filteredBooks &&
          filteredBooks.map((item) => (
            <div
              key={item.bookId}
              className={`flex flex-row hover:bg-gray-200 justify-between items-center rounded-lg p-2 cursor-pointer ${getBackgroundColor(
                selectedBookIds.indexOf(item.bookId)
              )}`}
              onClick={() => toggleBookSelection(item.bookId)}
            >
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Image
                    alt="Book cover"
                    className="object-cover w-10 h-15"
                    height="60"
                    src={item.titleUrl || "/images/logo.png"}
                    style={{
                      aspectRatio: "40/60",
                      objectFit: "cover",
                    }}
                    width="40"
                  />
                </div>
                <div className="flex flex-col justify-center ml-3">
                  <div className="text-sm font-light">{item.title}</div>
                  <div className="text-xs text-gray-500">{item.publisher}</div>
                  <div className="text-xs text-gray-500">{item.author}</div>
                </div>
              </div>
              <div className="w-1/5">
                {selectedBookIds.includes(item.bookId) && (
                  <div className="text-xl font-bold text-end">
                    {selectedBookIds.indexOf(item.bookId) + 1}
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
      {/* <LoadingButton
        onClick={handleSubmitButton}
        className="bg-[#F59E0B] text-white w-full"
        loading={isPending}
      >
        분석하기
      </LoadingButton> */}
      <Button
        onClick={handleSubmitButton}
        className="bg-[#F59E0B] text-white w-full"
        disabled={isPending}
      >
        분석하기
        {isPending && (
          <Loader2
            className={cn("h-4 w-4 animate-spin", isPending && "mr-2")}
          />
        )}
      </Button>
    </main>
  );
}

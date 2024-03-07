"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import useBookStore from "../../store/bookStore";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Cookies } from "react-cookie";

export default function Rank() {
  const router = useRouter();

  const books = useBookStore((set) => set.books);
  const updateBookRanks = useBookStore((set) => set.updateBookRanks);

  const filteredBooks = books.filter((book) => book.status === "y");

  const [selectedBookIds, setSelectedBookIds] = useState<Array<number>>([]);
  // const [selectedBooks, setSelectedBooks] = useState<Book[]>([]);

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

  // 선택된 bookId에 따라 배경 색상 결정
  const getBackgroundColor = (bookId: number) => {
    const index = selectedBookIds.indexOf(bookId);
    switch (index) {
      case 0:
        return "bg-green-200"; // 첫 번째 선택
      case 1:
        return "bg-blue-200"; // 두 번째 선택
      case 2:
        return "bg-red-200"; // 세 번째 선택
      case 3:
        return "bg-orange-200"; // 세 번째 선택
      case 4:
        return "bg-gray-200"; // 세 번째 선택
      default:
        return "bg-transparent"; // 선택되지 않음
    }
  };

  useEffect(() => {
    console.log(filteredBooks);
  }, [filteredBooks]);

  async function handleSubmitButton() {
    // updateBookRanks(Array.from(selectedBookIds));

    try {
      const body = filteredBooks.map((book) => {
        return {
          bookId: book.bookId,
          status: book.status,
          rank: selectedBookIds.indexOf(book.bookId) + 1,
        };
      });

      const response = await fetch("http://localhost:3000/book", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("서버에서 요청을 처리할 수 없습니다.");
      }

      // 요청 성공 시, 결과 페이지로 라우팅
      router.push("/result");
    } catch (error) {
      console.error("요청 실패:", error);
      alert("순위 업데이트에 실패했습니다. 다시 시도해주세요.");
    }
  }

  return (
    <main className="flex flex-col items-center w-full h-full pb-10">
      <h1 className="text-3xl">책장 분석이 완료되었습니다!</h1>
      <div className="mt-2 mb-2 font-light text-gray-500 text-l">
        좋아하는 순서로 순위를 매겨주세요!(최대 5권)
      </div>
      {/* <div>
        <span className="text-green-600">1순위: 초록</span>

        <span className="text-blue-600">2순위: 파랑</span>

        <span className="text-red-600">3순위: 빨강</span>
      </div> */}

      <div className="w-4/5 p-4 space-y-4 overflow-y-auto border rounded-lg shadow-2xl h-3/4 mb-30 border-slate-300">
        {filteredBooks &&
          filteredBooks.map((item) => (
            <div
              key={item.bookId}
              className={`flex flex-row justify-between items-center rounded-lg p-2 ${getBackgroundColor(
                item.bookId
              )}`}
              onClick={() => toggleBookSelection(item.bookId)}
              style={{ cursor: "pointer" }}
            >
              <div className="flex items-center mb-2">
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
      <Button
        onClick={handleSubmitButton}
        className="bg-[#F59E0B] text-white w-4/5 mt-10"
      >
        분석하기
      </Button>
    </main>
  );
}

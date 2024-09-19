"use client";
import useNaverBookStore, { NaverBook } from "@/store/naverBookStore";
import { BookCheck, Minus, Plus, Search } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import debounce from "lodash/debounce";

export default function UploadImage() {
  const { naverBooks, addBook, removeBook } = useNaverBookStore(
    (state) => state
  );
  const [inputs, setInputs] = useState<string[]>([""]);
  const [searchResults, setSearchResults] = useState<NaverBook[][]>([]);

  const debouncedSearch = useMemo(
    () =>
      debounce(async (query: string, index: number) => {
        if (query.trim() === "") return; // Prevent searching for empty input

        const response = await fetch(`/api/searchBooks?query=${query}`);
        const data = await response.json();

        const books = data.items.map((item: any) => ({
          title: item.title,
          author: item.author,
          isbn: item.isbn,
          image: item.image,
          publisher: item.publisher,
        }));

        const newSearchResults = [...searchResults];
        newSearchResults[index] = books;
        setSearchResults(newSearchResults);
      }, 300),
    [searchResults]
  );

  const handleInputChange = (value: string, index: number) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
    debouncedSearch(value, index);
  };

  const handleSelectBook = (book: NaverBook, index: number) => {
    addBook(book);
  };

  const handleRemoveBook = (index: number) => {
    removeBook(index);
  };

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <div className="flex flex-col items-center w-full p-2 mt-10 border-2 border-gray-400 border-dotted rounded-xl">
      <div className="text-xs text-left mb-2">
        {naverBooks.length}권 등록 완료
      </div>
      {naverBooks.map((book: NaverBook, index: number) => (
        <div key={index} className="flex items-center mb-2 w-full text-sm">
          <span>
            {book.title} - {book.author}
          </span>
          <button
            className="ml-auto w-8 h-8 flex items-center justify-center bg-white text-red-500 border border-red-500 rounded-md hover:bg-red-500 hover:text-white transition-colors"
            onClick={() => handleRemoveBook(index)}
          >
            <Minus />
          </button>
        </div>
      ))}
      {inputs.map((input, index) => (
        <div key={index} className="flex items-center mb-2 w-full">
          <input
            type="text"
            value={input}
            onChange={(e) => handleInputChange(e.target.value, index)}
            className="border-2 border-gray-300 rounded-md p-2 w-full h-8 text-sm"
          />
          {/* <button
            onClick={() => handleSearch(input, index)}
            className="ml-2 w-8 h-8 flex items-center justify-center bg-white text-blue-500 border border-blue-500 rounded-md hover:bg-blue-500 hover:text-white transition-colors"
          >
            <Search size={16} /> 
          </button> */}
        </div>
      ))}
      {searchResults.map((results, index) => (
        <div
          key={index}
          className="flex flex-col w-full text-sm h-52 overflow-y-auto"
        >
          {results.map((book, bookIndex) => (
            <div
              key={bookIndex}
              className="flex items-center w-full p-2 border-b"
            >
              {/* 커버 이미지 추가 - 비율 유지, 블러 처리 */}
              <div className="mr-4">
                <Image
                  style={{ height: "auto", width: "auto" }}
                  src={book.image} // 커버 이미지 URL
                  alt={`${book.title} cover`}
                  width={30} // 너비 설정
                  height={40} // 3:4 비율에 맞춘 높이 설정
                />
              </div>
              <div className="flex flex-col w-full gap-2 text-gray-600 text-xs">
                <div>제목: {book.title}</div>
                <div>저자: {book.author}</div>
              </div>
              <button
                className="ml-auto p-1 h-8 bg-white text-green-500 border border-green-500 hover:bg-green-500 hover:text-white transition-colors rounded-md"
                onClick={() => handleSelectBook(book, index)}
              >
                <BookCheck size={16} />
              </button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

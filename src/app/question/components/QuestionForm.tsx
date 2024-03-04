"use client";

import Book from "@/components/Book";
import { Book as IBook } from "@/types/type";
import { useQuery } from "@tanstack/react-query";
import { getBooks } from "../lib/getBooks";

export default function QuestionForm() {
  const { data, isPending } = useQuery<IBook[]>({
    queryKey: ["books"],
    queryFn: getBooks,
  });

  if (isPending) {
    return <p>Loading...</p>;
  }

  return data?.map((book) => <Book key={book.bookId} item={book} />);
}

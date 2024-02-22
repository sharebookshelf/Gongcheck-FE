"use client";

import useBookStore from "@/store/bookStore";

export default function Question() {
  const books = useBookStore((set) => set.books);
  return <div>야호</div>;
}

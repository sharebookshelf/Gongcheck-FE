import { useQuery } from "@tanstack/react-query";
import { getBooks } from "../lib/getBooks";

export interface Book {
  bookId: number;
  title: string;
  publisher: string;
  author: string;
  titleUrl: string;
  eaAddCode: string;
  eaIsbn: string;
  setIsbn: string;
  setAddCode: string;
  prePrice: string;
  inputDate: string;
  createdAt: string;
  updatedAt: string;
  status?: string | null;
  rank?: number;
}

export const useBookQuery = () => {
  return useQuery<Book[]>({
    queryKey: ["books"],
    queryFn: () => getBooks(),
  });
};

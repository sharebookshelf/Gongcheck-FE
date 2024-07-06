import { useQuery } from "@tanstack/react-query";
import { getUserBookshelf } from "../lib/getUserBookshelf";

export interface BookShelf {
  id: number;
  bookShelfImage: string;
  password: string | null;
  createdAt: string;
  updatedAt: string;
  status: string | null;
}

export const useUserBookshelfQuery = () => {
  return useQuery<BookShelf[]>({
    queryKey: ["bookshelves"],
    queryFn: () => getUserBookshelf(),
  });
};

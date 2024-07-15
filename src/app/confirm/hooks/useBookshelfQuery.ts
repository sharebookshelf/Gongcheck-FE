import { useQuery } from "@tanstack/react-query";
import { getUserBookshelf } from "../lib/getUserBookshelf";

export interface BookShelf {
  id: number;
  bookShelfImage: string;
  password: string | null;
  createdAt: string;
  updatedAt: string;
  status: string | null;
  userNickanme: string;
}

interface BookshelvesResponse {
  bookshelves: BookShelf[];
  nickname: string;
  readingType: string;
}

export const useUserBookshelfQuery = () => {
  return useQuery<BookshelvesResponse>({
    queryKey: ["bookshelves"],
    queryFn: () => getUserBookshelf(),
  });
};

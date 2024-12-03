import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getBookshelf } from "../lib/getBookshelf";

export interface Bookshelf {
  id: number;
  bookShelfImage: string;
  password: string | null;
  createdAt: string;
  updatedAt: string;
  status: string | null;
}

export interface User {
  userId: string;
  nickname: string;
  gender: string;
  birth: string;
  readingType: string;
  isAgree: null | string;
  feedback: null | string;
  createdAt: string;
  updatedAt: string;
  status: null | string;
  // bookshelf: Bookshelf[];
}

export interface Post {
  postId: number;
  password: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  bookshelves: Bookshelf[];
  user: User;
  // likeCount: number;
}

export const usePostsQuery = (sorting: string) => {
  return useInfiniteQuery<Post[]>({
    queryKey: ["posts", sorting],
    queryFn: ({ pageParam = 1 }) => getBookshelf(pageParam as number, sorting),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length ? allPages.length + 1 : undefined;
    },
  });
};

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
  bookshelf: Bookshelf[];
}

// export const usePostsQuery = () => {
//   return useQuery<User[]>({
//     queryKey: ["posts"],
//     queryFn: () => getBookshelf(),
//   });
// };

export const usePostsQuery = () => {
  return useInfiniteQuery<User[]>({
    queryKey: ["posts"],
    queryFn: ({ pageParam = 1 }) => getBookshelf(pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length ? allPages.length + 1 : undefined;
    },
  });
};

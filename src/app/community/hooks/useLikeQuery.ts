import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export async function getLike() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/me/bookshelves/likes`,
    {
      next: {
        tags: ["bookshelves"],
      },
      credentials: "include",
    }
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.statusCode);
  }

  return data;
}

export const useLikeQuery = () => {
  return useQuery<number[]>({
    queryKey: ["likes"],
    queryFn: () => getLike(),
  });
};

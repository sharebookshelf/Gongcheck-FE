import { toast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";

export const getResultByUserId = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/me/books/analysis`,
    {
      next: {
        tags: ["result"],
      },
      cache: "no-store",
      credentials: "include",
    }
  );

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.statusCode);
  }

  return data;
};

export function useResultQuery() {
  return useQuery({
    queryKey: ["result"],
    queryFn: () => getResultByUserId(),
  });
}

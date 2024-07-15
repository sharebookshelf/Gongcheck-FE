import { toast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";

export const getUserTypes = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/me/books/analysis/type`,
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

// interface UserTypeResponse {
//   number: []
// }

export function useUserTypes() {
  return useQuery<number[]>({
    queryKey: ["types"],
    queryFn: () => getUserTypes(),
  });
}

import { useQuery } from "@tanstack/react-query";

export const getResultByUserId = async () => {
  const res = await fetch("http://localhost:3000/analysis", {
    next: {
      tags: ["result"],
    },
    cache: "no-store",
    credentials: "include",
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

export function useResult() {
  return useQuery({
    queryKey: ["result"],
    queryFn: () => getResultByUserId(),
  });
}

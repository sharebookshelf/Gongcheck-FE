"use client";
import { toast } from "@/components/ui/use-toast";
import {
  QueryClientProvider,
  QueryClient,
  QueryCache,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ReactQueryProviders({
  children,
}: React.PropsWithChildren) {
  const router = useRouter();
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false, // 윈도우가 다시 포커스되었을때 데이터를 refetch
          refetchOnMount: true, // 데이터가 stale 상태이면 컴포넌트가 마운트될 때 refetch
          retryOnMount: false,
          refetchOnReconnect: true,
          retry: 3, //// API 요청 실패시 재시도 하는 옵션 (설정값 만큼 재시도)
          retryDelay: 1000,
          staleTime: 1000 * 60 * 10, // 10분 동안 데이터가 stale 상태이면 refetch
          gcTime: 1000 * 60 * 60,
        },
      },
      // queryCache: new QueryCache({
      //   onError: (error, query) => {
      //     console.log(error, query);
      //     if (
      //       error.message ===
      //       "세션이 없거나 만료되었습니다. 책장을 다시 등록해주세요"
      //     ) {
      //       toast({
      //         variant: "destructive",
      //         title: error.message,
      //         description: "3초뒤 홈화면으로 돌아갑니다.",
      //       });
      //       setTimeout(() => {
      //         router.push("/");
      //       }, 3000);
      //     } else {
      //       toast({
      //         variant: "destructive",
      //         title: error.message,
      //         // description: "3초뒤 홈화면으로 돌아갑니다.",
      //       });
      //     }
      //   },
      // }),
    })
  );

  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

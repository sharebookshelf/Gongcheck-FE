"use client";
import { QueryClient } from "@tanstack/react-query";
import QuestionForm from "./components/QuestionForm";
import { getBooks } from "./lib/getBooks";
import useSuccessStore from "@/store/successStore";
import { Divide } from "lucide-react";

export default function Question() {
  // const queryClient = new QueryClient();
  // await queryClient.prefetchQuery({ queryKey: ["books"], queryFn: getBooks });
  const isSuccess = useSuccessStore((state) => state.isSuccess);

  return (
    <div className="flex flex-col w-4/5 mt-10 mb-10">
      {isSuccess ? <div>성공</div> : <div>실패</div>}
      {/* <QuestionForm /> */}
    </div>
  );
}

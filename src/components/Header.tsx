"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const navigateBack = () => {
    router.back();
  };

  return (
    <header className="bg-[#ffffff] flex items-center justify-between p-5">
      {pathname !== "/" && (
        <ChevronLeft
          size={28}
          className="cursor-pointer rounded-full hover:bg-gray-200"
          onClick={navigateBack}
        />
      )}
      <h1 className="mx-auto text-xl leading-6 text-orange-400">공유책장</h1>
      <div className="opacity-0">
        <ChevronLeft />
      </div>{" "}
    </header>
  );
}

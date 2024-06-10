"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const navigateBack = () => {
    router.back();
  };

  return (
    <header className="bg-[#ffffff] flex items-center justify-start p-5 relative">
      {pathname !== "/" && (
        <ChevronLeft
          size={28}
          className="absolute rounded-full cursor-pointer left-4 hover:bg-gray-200"
          onClick={navigateBack}
        />
      )}
      <Link href="/" className="mx-auto text-xl leading-6 text-orange-400">
        공유책장
      </Link>
    </header>
  );
}

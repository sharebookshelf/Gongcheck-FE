"use client";

import {
  HomeIcon,
  LibraryBig, // assuming BooksIcon for bookshelf, replace it with the correct icon if different
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function FooterNav() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <footer className="w-full p-5 bg-white shadow-md">
      <nav className="flex justify-around">
        <div
          className={`flex flex-col items-center ${
            pathname === "/" ? "text-blue-600" : "text-gray-600"
          } hover:text-blue-400`}
          onClick={() => router.push("/")}
        >
          <HomeIcon className="w-6 h-6" />
          <span>홈</span>
        </div>
        <div
          className={`flex flex-col items-center ${
            pathname === "/bookshelf" ? "text-blue-600" : "text-gray-600"
          } hover:text-blue-400`}
          onClick={() => router.push("/bookshelf")}
        >
          <LibraryBig className="w-6 h-6" />
          <span>책장</span>
        </div>
      </nav>
    </footer>
  );
}

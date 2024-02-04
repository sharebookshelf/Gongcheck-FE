import { ChevronLeft } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-[#ffffff] flex items-center justify-between p-5">
      <ChevronLeft />
      <h1 className="mx-auto text-xl leading-6 text-orange-400">공유책장</h1>
      <div className="opacity-0">
        <ChevronLeft />
      </div>{" "}
    </header>
  );
}

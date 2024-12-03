import { Book as IBook } from "@/types/type";
import Image from "next/image";

type Props = {
  item: IBook;
};

export default function Book({ item }: Props) {
  return (
    <div className="w-2/3 p-4 space-y-4 overflow-y-auto border rounded-lg shadow-2xl h-3/4 mb-30 border-slate-300">
      <div className="flex items-center mb-2">
        <div className="flex-shrink-0">
          <Image
            alt="Book cover"
            className="object-cover w-10 h-15"
            height="60"
            src={item.titleUrl || "/images/logo.png"}
            style={{
              aspectRatio: "40/60",
              objectFit: "cover",
            }}
            width="40"
          />
        </div>
        <div className="flex flex-col justify-center ml-3">
          <div className="text-sm font-light">{item.title}</div>
          <div className="text-xs text-gray-500">{item.publisher}</div>
          <div className="text-xs text-gray-500">{item.author}</div>
        </div>
      </div>
    </div>
  );
}

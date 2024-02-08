import Header from "@/components/Header";
import { Button } from "@/components/Button";
import { Card, CardContent, CardFooter } from "@/components/Card";
import {
  HomeIcon,
  MenuIcon,
  MinusIcon,
  PlusCircleIcon,
  PlusIcon,
  UserIcon,
} from "lucide-react";
import Image from "next/image";
import UploadImage from "./components/UploadImage";

export default function Upload() {
  return (
    <main className="pt-10 h-[1000px] w-full flex flex-col items-center">
      <div className="mt-10 text-3xl text-center">내 책장 등록</div>
      <div className="mt-10 text-center text-gray-600">
        책장 분석을 통한 내 독서 성향 분석하기
      </div>
      <UploadImage />
      <div className="mt-10 border"></div>
    </main>
  );
}

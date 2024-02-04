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

export default function Upload() {
  return (
    <main className="flex flex-col overflow-y-auto *:justify-center pt-10 h-[1000px]">
      <section className="p-6 bg-white rounded-lg shadow-md">
        <div className="grid grid-cols-2 gap-2 mb-4">
          <Card className="w-full">
            <CardContent>
              <Image
                alt="Bookshelf"
                className="rounded-md"
                height="100"
                src="/images/bookshelf1.jpg"
                style={{
                  aspectRatio: "100/100",
                  objectFit: "cover",
                }}
                width="100"
              />
            </CardContent>
            <CardFooter className="flex justify-center">
              <MinusIcon className="text-red-500" />
            </CardFooter>
          </Card>
          <Card className="w-full">
            <CardContent className="flex items-center justify-center h-[100px]">
              <PlusIcon className="text-gray-500" />
            </CardContent>
          </Card>
          <Card className="w-full">
            <CardContent className="flex items-center justify-center h-[100px]">
              <PlusIcon className="text-gray-500" />
            </CardContent>
          </Card>
          <Card className="w-full">
            <CardContent className="flex items-center justify-center h-[100px]">
              <PlusIcon className="text-gray-500" />
            </CardContent>
          </Card>
        </div>
        <Button className="w-full bg-[#f2994a] text-white py-2 text-sm">
          업로드 준비
        </Button>
      </section>
      <section className="mt-6">
        <h3 className="mb-2 text-lg font-bold">정보 안내</h3>
        <p className="text-sm text-gray-600">
          작가 정보 업로드를 통해 더 정확한 책 정보를 도와드립니다!
        </p>
      </section>
    </main>
  );
}

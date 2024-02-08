import { Button } from "@/components/Button";
import { Image as ImageIcon } from "lucide-react";

export default function UploadImage() {
  return (
    <div className="flex flex-col items-center w-4/5 p-8 mt-10 border-2 border-gray-400 border-dotted rounded-xl">
      <ImageIcon
        size={28}
        className="items-center justify-center"
        color="indigo"
      />
      <div className="mt-5 text-center text-gray-500">드래그 앤 드랍</div>
      <div className="mt-5 text-center text-gray-500">혹은</div>
      <Button className="mt-5 bg-[#F59E0B] text-white w-full rounded-xl">
        사진 업로드
      </Button>
    </div>
  );
}

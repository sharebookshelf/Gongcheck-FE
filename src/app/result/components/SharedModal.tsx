import { useState } from "react";
import Image from "next/image";
import kakaoIcon from "../../../../public/images/kakaotalk_sharing_btn_small.png";
import { Copy, Link, X } from "lucide-react";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  link: string;
  copyToClipboard: () => void;
  shareKakao: () => void;
}

const ShareModal = ({
  isOpen,
  onClose,
  link,
  copyToClipboard,
  shareKakao,
}: ShareModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30">
      <div className="bg-white rounded-lg p-6 relative w-[300px] z-40">
        {/* <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 z-50"
        >
          &times;
        </button> */}
        <X
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 z-50 cursor-pointer"
        />
        <h2 className="text-xl font-bold mb-4 text-center">공유하기</h2>
        <div className="flex justify-around ">
          <button onClick={shareKakao} className="flex flex-col items-center">
            <div className="bg-yellow-400 p-3 rounded-full">
              <Image src={kakaoIcon} alt="카카오톡" width={24} height={24} />
            </div>
            <span className="mt-2 text-sm">카카오톡</span>
          </button>
          <button
            onClick={copyToClipboard}
            className="flex flex-col items-center"
          >
            <div className="bg-gray-200 p-3 rounded-full">
              <Link />
            </div>
            <span className="mt-2 text-sm">링크복사</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;

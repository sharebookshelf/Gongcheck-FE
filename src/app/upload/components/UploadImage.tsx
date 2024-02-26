"use client";
import { Button } from "@/components/Button";
import { XCircleIcon, PlusCircle } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";

interface Props {
  onImageUploadComplete: (files: File[]) => void;
}

export default function UploadImage({ onImageUploadComplete }: Props) {
  const [preview, setPreview] = useState<
    Array<{ dataUrl: string; file: File } | null>
  >([]);

  useEffect(() => {
    // preview에서 file 객체만 추출하여 새로운 files 배열을 생성
    const updatedFiles = preview
      .map((item) => item?.file)
      .filter((file): file is File => !!file);

    // 업데이트된 files 배열을 onImageUploadComplete 콜백을 통해 부모 컴포넌트에 전달
    onImageUploadComplete(updatedFiles);
  }, [preview, onImageUploadComplete]); // preview 배열이 변경될 때마다 이 로직을 실행

  const onUpload = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      const uploadedFiles: File[] = []; // 업로드된 파일을 저장할 배열

      filesArray.forEach((file, index) => {
        const reader = new FileReader();

        // dataUrl로 읽고 난 이후의 콜백함수
        reader.onloadend = () => {
          setPreview((prevPreview) => [
            ...prevPreview,
            {
              dataUrl: reader.result as string,
              file,
            },
          ]);

          // 파일 객체를 uploadedFiles 배열에 추가
          uploadedFiles.push(file);

          // 마지막 파일 처리가 끝났는지 확인
          if (uploadedFiles.length === filesArray.length) {
            // 모든 파일 처리가 완료되면, uploadedFiles 배열을 onImageUploadComplete에 전달
            onImageUploadComplete(uploadedFiles);
          }
        };

        reader.readAsDataURL(file);
      });
    }
  };

  const removeImageByIndex = (indexToRemove: number) => {
    setPreview((prevPreview) =>
      prevPreview.filter((_, index) => index !== indexToRemove)
    );
  };

  const removeAllImage = () => {
    setPreview([]);
  };

  return (
    <div className="flex flex-col items-center w-4/5 p-8 mt-10 border-2 border-gray-400 border-dotted rounded-xl">
      <Button
        onClick={removeAllImage}
        className="w-full bg-[#F59E0B] text-white py-3 rounded-lg font-medium"
      >
        업로드 초기화
      </Button>
      <div className="w-full">
        {preview.length === 0 ? (
          <div className="flex items-center justify-center w-full mt-4">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">클릭하여 업로드하거나</span>{" "}
                  드래그 앤 드롭
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  PNG or JPG (MAX. 800x400px)
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={onUpload}
                multiple
              />
            </label>
          </div>
        ) : (
          <div className="grid w-full grid-cols-3 gap-2 mt-4">
            {preview.map(
              (v, index) =>
                v && (
                  <div
                    key={index}
                    className="relative w-full overflow-hidden rounded-lg shadow-lg aspect-square"
                  >
                    <Image
                      fill
                      src={v.dataUrl}
                      alt="미리보기"
                      className="object-cover object-center"
                    />
                    <button
                      onClick={() => removeImageByIndex(index)}
                      className="absolute p-1 text-white bg-gray-500 rounded-full top-1 right-1 hover:bg-red-500"
                    >
                      <XCircleIcon size={20} color="white" />
                    </button>
                  </div>
                )
            )}
            <label
              htmlFor="dropzone-file-additional"
              className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer aspect-square bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:border-gray-500"
            >
              <PlusCircle
                size={28}
                className="text-gray-500 dark:text-gray-400"
              />
              <input
                id="dropzone-file-additional"
                type="file"
                className="hidden"
                onChange={onUpload}
                multiple
              />
            </label>
          </div>
        )}
      </div>
    </div>
  );
}

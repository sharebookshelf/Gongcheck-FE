import { Button } from "@/components/Button";
import { Input } from "@/app/upload/components/Input";
import { Label } from "./Label";
import { RadioGroup, RadioGroupItem } from "@/app/upload/components/RadioGroup";
import { useState } from "react";

import { z } from "zod";

// Zod 스키마 정의
const userInfoSchema = z.object({
  nickname: z.string().min(1, "닉네임을 입력해주세요."),
  birth: z
    .string()
    .regex(
      /^\d{4}\/\d{2}\/\d{2}$/,
      "생년월일 형식이 올바르지 않습니다. YYYYMMDD 형식으로 입력해주세요."
    ),
});

interface Props {
  onInfoChange: (name: string, value: string) => void;
}

export default function InfoInput({ onInfoChange }: Props) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onInfoChange(name, value); // 부모 컴포넌트의 상태 업데이트 함수를 호출
  };

  function handleRadioChange(value: string) {
    onInfoChange("gender", value);
  }

  return (
    <div className="flex flex-col w-4/5 mt-10">
      <form>
        <div className="mb-4">
          <label
            className="block mb-1 text-sm font-medium text-gray-700"
            htmlFor="nickname"
          >
            닉네임
            <span className="text-red-500">*</span>
          </label>
          <Input
            id="nickname"
            name="nickname"
            placeholder="닉네임을 입력해주세요"
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block mb-1 text-sm font-medium text-gray-700"
            htmlFor="birth"
          >
            생년월일
            <span className="text-red-500">*</span>
          </label>
          <Input
            id="birth"
            name="birth"
            placeholder="YYYY/MM/DD"
            onChange={handleInputChange}
          />
        </div>
        <fieldset className="mb-6">
          <legend className="block mb-1 text-sm font-medium text-gray-700">
            성별
            <span className="text-red-500">*</span>
          </legend>
          <RadioGroup
            defaultValue="male"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleRadioChange(e.target.value)
            }
          >
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem id="man" value="m" />
                <Label htmlFor="man">남자</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem id="woman" value="w" />
                <Label htmlFor="woman">여자</Label>
              </div>
            </div>
          </RadioGroup>
        </fieldset>
        {/* <Button
          type="submit"
          className="mb-10 w-full bg-[#F59E0B] text-white py-3 rounded-lg font-medium"
        >
          책장 분석하기 가기
        </Button> */}
      </form>
    </div>
  );
}

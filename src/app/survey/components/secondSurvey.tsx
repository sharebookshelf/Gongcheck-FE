import Image from "next/image";
import image from "../../../public/images/surveyImage1.png";

const questionPageNumber: number = 2;

export default function SurveyPage() {
  return (
    <div className="relative flex flex-col h-full text-white bg-[url('/images/surveyImage1.png')] bg-center">
      <div className="absolute w-full h-full bg-black bg-opacity-50"></div>
      <div
        className="flex flex-col items-center justify-center flex-1 p-4"
        style={{ zIndex: 2 }}
      >
        <h2 className="mb-8 text-2xl font-bold">{questionPageNumber}/3 Step</h2>
        <p className="mb-8 text-lg text-center">
          읽을 책을 보통 어디서 찾으시나요?
        </p>
        <div className="w-full max-w-md mb-8 space-y-4">
          <button className="w-full py-4 text-black bg-white rounded-lg shadow">
            집
          </button>
          <button className="w-full py-4 text-black bg-white rounded-lg shadow">
            도서관
          </button>
          <button className="w-full py-4 text-black bg-white rounded-lg shadow">
            온라인 도서 판매처
          </button>
          <button className="w-full py-4 text-black bg-white rounded-lg shadow">
            오프라인 서점
          </button>
        </div>
        <div className="relative mb-8">
          <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-2">
            <span className="block w-3 h-3 bg-[#FFA500] rounded-full" />
            <span className="block w-3 h-3 bg-white rounded-full" />
            <span className="block w-3 h-3 bg-white rounded-full" />
          </div>
        </div>
        <div className="flex items-center justify-center mb-4 space-x-2">
          <span className="block w-3 h-3 bg-[#FFA500] rounded-full" />
          <span className="block w-3 h-3 bg-white rounded-full" />
          <span className="block w-3 h-3 bg-white rounded-full" />
        </div>
        <button className="w-full py-4 text-black bg-white rounded-lg shadow">
          책장 분석 중 ...
        </button>
      </div>
    </div>
  );
}

function ChevronLeftIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

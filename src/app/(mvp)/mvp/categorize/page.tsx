import Categorize from "./components/Categorize";

export default function Page() {
  return (
    <main className="flex flex-col items-center h-full space-y-4">
      <h1 className="text-3xl">책장 분석이 완료되었습니다!</h1>
      <div className="text-2xl font-light">읽은 책에 표시를 해주세요!</div>
      <Categorize />
    </main>
  );
}

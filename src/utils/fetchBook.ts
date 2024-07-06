import useBookStore from "@/store/bookStore";

// 책 리스트를 가져와 Zustand 스토어에 저장하는 함수
export async function fetchBook() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/book`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const books = await response.json();
    useBookStore.getState().setBooks(books); // Zustand 스토어에 책 리스트 저장
  } catch (error) {
    console.error("Failed to fetch books:", error);
  }
}

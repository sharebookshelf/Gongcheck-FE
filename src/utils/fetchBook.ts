import useBookStore from "@/store/bookStore";
import { Cookies } from "react-cookie";

// 책 리스트를 가져와 Zustand 스토어에 저장하는 함수
export async function fetchBook() {
  // const cookies = new Cookies();

  // const id = cookies.get("userId"); // 'id' 쿠키 읽기
  // // const id = 1;

  // if (!id) {
  //   console.error("No ID found in cookies");
  //   return;
  // }

  try {
    const response = await fetch(`http://localhost:3000/book`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const books = await response.json();
    useBookStore.getState().setBooks(books); // Zustand 스토어에 책 리스트 저장
  } catch (error) {
    console.error("Failed to fetch books:", error);
  }
}

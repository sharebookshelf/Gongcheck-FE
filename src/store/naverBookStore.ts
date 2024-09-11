import { create } from "zustand";

// Book interface 정의 (기본적인 책 정보 구조)
export interface NaverBook {
  title: string;
  author: string;
  publisher: string;
  image: string;
  isbn: string;
  description?: string;
}

// 상태 관리 인터페이스
interface BookStoreState {
  naverBooks: NaverBook[];
  addBook: (book: NaverBook) => void;
  removeBook: (index: number) => void;
  resetBooks: () => void;
  updateBookRanks?: (bookIds: string[]) => void;
  updateStatusForItems?: (items: number[]) => void;
}

// zustand 스토어 정의
const useNaverBookStore = create<BookStoreState>((set) => ({
  naverBooks: [],

  // 책 추가 함수
  addBook: (book: NaverBook) =>
    set((state) => ({
      naverBooks: [...state.naverBooks, book],
    })),

  // 책 제거 함수
  removeBook: (index: number) =>
    set((state) => ({
      naverBooks: state.naverBooks.filter((_, i) => i !== index),
    })),

  // 모든 책 초기화 함수
  resetBooks: () =>
    set(() => ({
      naverBooks: [],
    })),
}));

export default useNaverBookStore;

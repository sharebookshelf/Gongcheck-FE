import { create } from "zustand";

interface Book {
  bookId: number;
  title: string;
  publisher: string;
  author: string;
  titleUrl: string;
  eaAddCode: string;
  eaIsbn: string;
  setIsbn: string;
  setAddCode: string;
  prePrice: string;
  inputDate: string;
  createdAt: string;
  updatedAt: string;
  status?: string | null;
  rank?: number;
}

interface BookStoreState {
  books: Book[];
  setBooks: (books: Book[]) => void;
  // updateStatus: (bookId: number, status: string) => void;
  // updateRank: (bookId: number, rank: number) => void;
  updateBookRanks: (bookIds: number[]) => void;
  updateStatusForItems: (items: number[]) => void;
}

const useBookStore = create<BookStoreState>((set) => ({
  books: [],

  // 책 목록을 설정하는 액션
  setBooks: (books) => set({ books }),

  // 특정 책의 status를 업데이트하는 액션
  // updateStatus: (bookId, status) =>
  //   set((state) => ({
  //     books: state.books.map((book) =>
  //       book.bookId === bookId ? { ...book, status } : book
  //     ),
  //   })),

  // // 특정 책의 rank를 업데이트하는 액션
  // updateRank: (bookId, rank) =>
  //   set((state) => ({
  //     books: state.books.map((book) =>
  //       book.bookId === bookId ? { ...book, rank } : book
  //     ),
  //   })),

  // 책의 순위를 업데이트하는 함수
  updateBookRanks: (bookIds) =>
    set((state) => ({
      books: state.books.map((book) => {
        // bookId 배열에 해당하는 책의 인덱스를 찾아서 1을 더해 rank로 설정
        const rank = bookIds.indexOf(book.bookId) + 1;
        // 배열에 없는 경우, rank를 0으로 설정
        return { ...book, rank: rank > 0 ? rank : 0 };
      }),
    })),

  updateStatusForItems: (items) =>
    set((state) => ({
      books: state.books.map((book) => ({
        ...book,
        status: items.includes(book.bookId) ? "y" : "n",
      })),
    })),
}));

export default useBookStore;

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
  completedBookIds: number[];
  setCompletedBookIds: (bookIds: number[]) => void;
  updateBookRanks: (bookIds: number[]) => void;
  updateStatusForItems: (items: number[]) => void;
}

const useBookStore = create<BookStoreState>((set) => ({
  books: [],
  setBooks: (books) => set({ books }),

  completedBookIds: [],
  setCompletedBookIds: (bookIds) => set({ completedBookIds: bookIds }),

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

  updateStatusForItems: async (items) =>
    set((state) => ({
      books: state.books.map((book) => ({
        ...book,
        status: items.includes(book.bookId) ? "y" : "n",
      })),
    })),
}));

export default useBookStore;

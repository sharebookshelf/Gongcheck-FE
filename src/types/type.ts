export interface Book {
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

export interface SurveyPageProps {
  setQuestionPageNumber: (pageNumber: number) => void;
  paginate: (newDirection: number) => void;
}

import { create } from "zustand";

export interface Question {
  question1: number;
  question2: number;
  question3: number;
}

interface SurveyStoreState {
  question: Question;
  updateQuestion: (questionKey: keyof Question, value: number) => void;
  // setQuestion: (question: Question) => void;
}

const useSurveyStore = create<SurveyStoreState>((set) => ({
  question: {
    question1: 0,
    question2: 0,
    question3: 0,
  },
  // setQuestion: (question) => set(() => ({ question })),
  updateQuestion: (questionKey, value) =>
    set((state) => ({
      question: {
        ...state.question,
        [questionKey]: value,
      },
    })),
}));

export default useSurveyStore;

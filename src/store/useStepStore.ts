import { create } from "zustand";

interface StepStoreInterface {
  step: string;
  setStep: (step: string) => void;
}
// Zustand 스토어 생성
const useStepStore = create<StepStoreInterface>((set) => ({
  step: "upload",
  setStep: (step) => set(() => ({ step })),
}));

export default useStepStore;

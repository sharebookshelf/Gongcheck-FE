import { create } from "zustand";

interface SuccessStoreState {
  isSuccess: boolean;
  setIsSuccess: (isSuccess: boolean) => void;
}
// Zustand 스토어 생성
const useSuccessStore = create<SuccessStoreState>((set) => ({
  isSuccess: false,
  setIsSuccess: (isSuccess) => set(() => ({ isSuccess })),
}));

export default useSuccessStore;

import { create } from "zustand";

type ModalStore = {
  taskModalType: string | null;
  openModal: (taskType: string) => void;
  closeModal: () => void;
};

export const useModalStore = create<ModalStore>((set) => ({
  taskModalType: null,
  openModal: (taskType: string) => {
    console.log(taskType);
    set(() => ({ taskModalType: taskType }));
  },
  closeModal: () => set(() => ({ taskModalType: null })),
}));

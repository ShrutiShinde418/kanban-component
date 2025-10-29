import { create } from "zustand";
import type { KanbanTask } from "../components/KanbanBoard/KanbanBoard";

type ModalStore = {
  taskInfo: string | null | KanbanTask;
  taskItem: KanbanTask | undefined;
  openModal: (taskType: string) => void;
  openTaskDetailModal: (task: KanbanTask) => void;
  closeModal: () => void;
};

export const useModalStore = create<ModalStore>((set) => ({
  taskInfo: null,
  taskItem: null,
  openModal: (taskType: string) => {
    set(() => ({ taskInfo: taskType }));
  },
  openTaskDetailModal: (task: KanbanTask) => {
    set(() => ({ taskItem: task }));
  },
  closeModal: () => set(() => ({ taskInfo: null, taskItem: undefined })),
}));

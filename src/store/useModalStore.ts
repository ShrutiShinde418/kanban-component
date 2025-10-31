import { create } from "zustand";
import type { KanbanTask, KanbanColumnProps } from "../components/KanbanBoard/KanbanBoardTypes";

type ModalStore = {
  taskInfo: string | null | KanbanTask;
  taskItem: KanbanTask | undefined;
  kanbanColumnInfo: null | { option: string, column: Pick<KanbanColumnProps, "id" | "title" | "color" | "maxTasks"> }
  openModalForColumnUpdate: (details: { option: string, column: Pick<KanbanColumnProps, "id" | "title" | "color" | "maxTasks"> }) => void;
  openModal: (taskType: string) => void;
  openTaskDetailModal: (task: KanbanTask) => void;
  closeModal: () => void;
};

export const useModalStore = create<ModalStore>((set) => ({
  taskInfo: null,
  taskItem: undefined,
  openModal: (taskType: string) => {
    set(() => ({ taskInfo: taskType }));
  },
  kanbanColumnInfo: null,
  openTaskDetailModal: (task: KanbanTask) => {
    set(() => ({ taskItem: task }));
  },
  openModalForColumnUpdate: (details) => { console.log(details); set(() => ({ kanbanColumnInfo: details })) },
  closeModal: () => set(() => ({ taskInfo: null, taskItem: undefined, kanbanColumnInfo: null })),
}));

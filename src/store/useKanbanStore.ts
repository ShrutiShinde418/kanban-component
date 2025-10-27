import { create } from "zustand";
import type { KanbanTask } from "../components/KanbanBoard/KanbanBoard.ts";

type KanbanStore = {
  columns: string[];
  tasks: {
    [key: string]: KanbanTask[];
  };
  addTaskHandler: (taskType: string, task: KanbanTask) => void;
};

const initialColumns = ["toDo", "inProgress", "done"];

export const useKanbanStore = create<KanbanStore>((set) => ({
  columns: initialColumns,
  tasks: initialColumns.reduce(
    (acc, value) => {
      acc[value] = [];
      return acc;
    },
    {} as Record<string, KanbanTask[]>,
  ),
  addTaskHandler: (taskType: string, task: KanbanTask) =>
    set((state) => ({
      tasks: {
        ...state.tasks,
        [taskType]: [...state.tasks[taskType], task],
      },
    })),
}));

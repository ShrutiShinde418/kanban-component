import { create } from "zustand";
import type { KanbanTask } from "../components/KanbanBoard/KanbanBoard.ts";

type KanbanStore = {
  columns: string[];
  tasks: {
    [key: string]: KanbanTask[];
  };
  addTaskHandler: (taskType: string, task: KanbanTask) => void;
  updateTaskStatusHandler: (
    taskId: KanbanTask["id"],
    originalTaskType: KanbanTask["status"],
    newTaskType: KanbanTask["status"]
  ) => void;
};

const initialColumns = ["toDo", "inProgress", "done"];

export const useKanbanStore = create<KanbanStore>((set, get) => ({
  columns: initialColumns,
  tasks: initialColumns.reduce((acc, value) => {
    acc[value] = [];
    return acc;
  }, {} as Record<string, KanbanTask[]>),
  addTaskHandler: (taskType: string, task: KanbanTask) =>
    set((state) => ({
      tasks: {
        ...state.tasks,
        [taskType]: [...state.tasks[taskType], task],
      },
    })),
  updateTaskStatusHandler: (
    taskId: KanbanTask["id"],
    originalTaskType: KanbanTask["status"],
    newTaskType: KanbanTask["status"]
  ) => {
    const { tasks } = get();

    const task = tasks[originalTaskType].find((t) => t.id === taskId);
    if (!task) return;

    const updatedOriginalTasks = tasks[originalTaskType].filter(
      (t) => t.id !== taskId
    );

    set((state) => ({
      tasks: {
        ...state.tasks,
        [originalTaskType]: updatedOriginalTasks,
        [newTaskType]: [
          ...state.tasks[newTaskType],
          { ...task, status: newTaskType },
        ],
      },
    }));
  },
}));

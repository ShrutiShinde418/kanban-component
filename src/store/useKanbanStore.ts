import { create } from "zustand";
import type {
  KanbanColumnProps,
  KanbanTask,
} from "../components/KanbanBoard/KanbanBoardTypes.ts";
import { kanbanBoards } from "../utils/column.utils.ts";

type KanbanStore = {
  columns: string[];
  tasks: {
    [key: string]: KanbanTask[];
  };
  addTaskHandler: (taskType: string, task: KanbanTask) => void;
  kanbanBoards: Pick<
    KanbanColumnProps,
    "id" | "title" | "color" | "maxTasks"
  >[];
  error: string;
  success: string;
  addKanbanBoard: (
    board: Pick<KanbanColumnProps, "id" | "title" | "color" | "maxTasks">,
  ) => void;
  updateTaskStatusHandler: (
    taskId: KanbanTask["id"],
    originalTaskType: KanbanTask["status"],
    newTaskType: KanbanTask["status"],
  ) => void;
  deleteSingleTaskHandler: (
    taskId: KanbanTask["id"],
    taskType: KanbanTask["status"],
  ) => void;
  updateSingleTaskHandler: (
    taskType: KanbanTask["status"],
    updatedTaskItem: Partial<KanbanTask>,
  ) => void;
  resetErrorMessage: () => void;
  resetSuccessMessage: () => void;
  updateKanbanBoard: (
    propertyToUpdate: string,
    boardId: string,
    value: string | number,
  ) => void;
};

const initialColumns = kanbanBoards.map((item) => item.id);

export const useKanbanStore = create<KanbanStore>((set, get) => ({
  columns: initialColumns,
  tasks: initialColumns.reduce(
    (acc, value) => {
      acc[value] = [];
      return acc;
    },
    {} as Record<string, KanbanTask[]>,
  ),
  kanbanBoards: kanbanBoards,
  error: "",
  success: "",
  addKanbanBoard: (board) => {
    if (get().kanbanBoards.length === 6) return;
    set((state) => ({
      columns: [...state.columns, board.id],
      tasks: {
        ...state.tasks,
        [board.id]: [],
      },
      kanbanBoards: [...state.kanbanBoards, board],
    }));
  },
  addTaskHandler: (taskType: string, task: KanbanTask) => {
    const { kanbanBoards } = get();
    const board = kanbanBoards.find((b) => b.id === taskType);

    if (!board) return;

    if (get().tasks[taskType].length >= board?.maxTasks) {
      set(() => ({ error: `WIP Limit for ${board.title} reached.` }));
    } else {
      set((state) => ({
        tasks: {
          ...state.tasks,
          [taskType]: [...state.tasks[taskType], task],
        },
        success: "Task added successfully",
      }));
    }
  },
  updateTaskStatusHandler: (
    taskId: KanbanTask["id"],
    originalTaskType: KanbanTask["status"],
    newTaskType: KanbanTask["status"],
  ) => {
    const { tasks, kanbanBoards } = get();

    const board = kanbanBoards.find((b) => b.id === newTaskType);

    if (!board) return;

    const task = tasks[originalTaskType].find((t) => t.id === taskId);
    if (!task) return;

    if (board.maxTasks <= tasks[newTaskType].length) {
      set(() => ({ error: `WIP Limit for ${board.title} reached.` }));
      return;
    }

    const updatedOriginalTasks = tasks[originalTaskType].filter(
      (t) => t.id !== taskId,
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
  deleteSingleTaskHandler: (taskId, taskType) => {
    const { tasks } = get();

    const task = tasks[taskType].find((t) => t.id === taskId);
    if (!task) return;

    const updatedTaskList = tasks[taskType].filter(
      (item) => item.id !== taskId,
    );

    set((state) => ({
      tasks: {
        ...state.tasks,
        [taskType]: updatedTaskList,
      },
    }));
  },
  updateSingleTaskHandler: (taskType, updatedTaskItem) => {
    const { tasks } = get();

    const task = tasks[taskType].find((t) => t.id === updatedTaskItem.id);
    if (!task) return;

    const updatedTasksArray = tasks[taskType].map((item) =>
      item.id === task.id ? { ...item, ...updatedTaskItem } : item,
    );

    set((state) => ({
      tasks: {
        ...state.tasks,
        [taskType]: updatedTasksArray,
      },
    }));
  },
  resetErrorMessage: () => set(() => ({ error: "" })),
  resetSuccessMessage: () => set(() => ({ success: "" })),
  updateKanbanBoard: (propertyToUpdate, boardId, value) => {
    const board = get().kanbanBoards.find((b) => b.id === boardId);

    if (!board) return;
    set((state) => ({
      kanbanBoards: state.kanbanBoards.map((b) =>
        b.id === board.id ? { ...b, [propertyToUpdate]: value } : b,
      ),
    }));
  },
}));

import type { MenuItem } from "../components/primitives/types.ts";
import type { KanbanColumnProps } from "../components/KanbanBoard/KanbanBoardTypes.ts";

export const kanbanBoards: Pick<
  KanbanColumnProps,
  "id" | "title" | "color" | "maxTasks"
>[] = [
    {
      id: "toDo",
      title: "To Do",
      color: "bg-error-500",
      maxTasks: 20,
    },
    {
      id: "inProgress",
      title: "In Progress",
      color: "bg-warning-500",
      maxTasks: 20,
    },
    {
      id: "done",
      title: "Done",
      color: "bg-success-500",
      maxTasks: 20,
    },
  ];

export const menuItems: MenuItem[] = [
  {
    id: 1,
    title: "Rename",
  },
  {
    id: 2,
    title: "Set WIP Limit",
  },
  {
    id: 3,
    title: "Delete",
  },
];

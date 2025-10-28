import type { MenuItem } from "../components/primitives/types.ts";

export const kanbanBoards = [
  {
    id: "toDo",
    title: "To Do",
    color: "bg-error-500",
  },

  {
    id: "inProgress",
    title: "In Progress",
    color: "bg-warning-500",
  },

  {
    id: "done",
    title: "Done",
    color: "bg-success-500",
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

import type { Meta, StoryObj } from "@storybook/react";
import { nanoid } from "nanoid";
import KanbanBoard from "../components/KanbanBoard/KanbanBoard.tsx";
import { useKanbanStore } from "../store/useKanbanStore.ts";
import type {
  KanbanColumnProps,
  KanbanTask,
} from "../components/KanbanBoard/KanbanBoardTypes.ts";
import { DUMMY_TASKS } from "../utils/task.utils.ts";
import { kanbanBoards } from "../utils/column.utils.ts";
import multipleTasks from "./tasks.json";

const tasks: Record<string, KanbanTask[]> = {
  ...DUMMY_TASKS,
  review: [
    {
      id: nanoid(),
      title: "Optimize Kanban board drag-and-drop feedback",
      priority: "high",
      assignee: {
        name: "Shruti",
      },
      tags: ["Frontend", "UX", "React", "Kanban"],
      dueDate: new Date("2025-10-18"),
      commentsCount: 4,
      attachmentsCount: 2,
      createdAt: new Date("2025-08-19"),
      status: "review",
      comments: [],
      description:
        "Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor.",
      links: [],
    },
    {
      id: nanoid(),
      title: "Audit and update environment variable usage across services",
      priority: "urgent",
      assignee: {
        name: "Aisha Patel",
      },
      tags: ["DevOps", "Environment", "Config", "Security"],
      dueDate: new Date("2025-10-30"),
      commentsCount: 2,
      attachmentsCount: 0,
      createdAt: new Date("2025-08-25"),
      status: "review",
      comments: [],
      description:
        "Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.",
      links: [],
    },
  ],
};

const boards: Pick<KanbanColumnProps, "id" | "title" | "color">[] = [
  ...kanbanBoards,
  { id: "review", color: "bg-violet-700", title: "Review" },
];

const meta: Meta<typeof KanbanBoard> = {
  title: "Components/KanbanBoard",
  component: KanbanBoard,
};

export const Default: StoryObj<typeof KanbanBoard> = {
  parameters: {
    layout: "fullscreen",
    chromatic: { disableSnapshot: true },
    docs: { inlineStories: true },
  },
  render: () => {
    useKanbanStore.setState({ tasks: tasks, kanbanBoards: boards });

    return <KanbanBoard />;
  },
};

export const EmptyState: StoryObj<typeof KanbanBoard> = {
  render: () => {
    useKanbanStore.setState({ tasks: {}, kanbanBoards: boards });
    return <KanbanBoard />;
  },
};

export const MultipleTasks: StoryObj<typeof KanbanBoard> = {
  render: () => {
    useKanbanStore.setState({ kanbanBoards, tasks: multipleTasks.tasks });
    return <KanbanBoard />;
  },
};

export default meta;

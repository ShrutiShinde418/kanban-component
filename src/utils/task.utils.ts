import { nanoid } from "nanoid";
import type { KanbanTask } from "../components/KanbanBoard/KanbanBoard";

export const isOverdue = (dueDate: Date): boolean => {
  return new Date() > dueDate;
};

export const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export const getPriorityColor = (priority: string): string => {
  const colors = {
    low: "bg-blue-100 text-blue-700 border-l-4 border-blue-500",
    medium: "text-yellow-700 border-l-4 border-yellow-500",
    high: "bg-orange-100 text-orange-700 border-l-4 border-orange-500",
    urgent: "bg-red-100 text-red-700 border-l-4 border-red-500",
  };
  return colors[priority as keyof typeof colors] || colors.medium;
};

/**
 * Reorders tasks after drag and drop
 */
export const reorderTasks = (
  tasks: string[],
  startIndex: number,
  endIndex: number,
): string[] => {
  const result = Array.from(tasks);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

/**
 * Moves task between columns
 */
export const moveTaskBetweenColumns = (
  sourceColumn: string[],
  destColumn: string[],
  sourceIndex: number,
  destIndex: number,
): { source: string[]; destination: string[] } => {
  const sourceClone = Array.from(sourceColumn);
  const destClone = Array.from(destColumn);
  const [removed] = sourceClone.splice(sourceIndex, 1);
  destClone.splice(destIndex, 0, removed);
  return {
    source: sourceClone,
    destination: destClone,
  };
};

export const formatDate = (date: Date) => {
  const d = new Date(date);
  const month = d.toLocaleDateString("en-US", { month: "short" });
  const day = d.getDate();
  return `${month} ${day}`;
};

export const taskTypeMapper = {
  toDo: "To Do",
  inProgress: "In Progress",
  done: "Done",
};

export const DUMMY_TASKS: {
  toDo: KanbanTask[];
  inProgress: KanbanTask[];
  done: KanbanTask[];
} = {
  toDo: [
    {
      id: nanoid(),
      title: "Implement user authentication with OAuth 2.0 and JWT tokens",
      priority: "high",
      assignee: {
        name: "Sarah Johnson",
      },
      tags: ["Backend", "Security", "API", "Authentication"],
      dueDate: new Date("2025-10-20"),
      commentsCount: 5,
      attachmentsCount: 2,
      createdAt: new Date("2025-08-20"),
      status: "toDo",
      comments: [],
      description: "",
      links: [],
    },
    {
      id: nanoid(),
      title: "Design new landing page",
      priority: "medium",
      assignee: {
        name: "Mike Chen",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
      },
      tags: ["Design", "UI/UX"],
      dueDate: new Date("2025-11-15"),
      commentsCount: 3,
      createdAt: new Date("2025-08-20"),
      status: "toDo",
      comments: [],
      description: "",
      links: [],
    },
    {
      id: nanoid(),
      title: "Refactor legacy code",
      priority: "high",
      assignee: {
        name: "Tom Becker",
        avatar:
          "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=100&h=100&fit=crop",
      },
      tags: ["Maintenance", "Refactoring"],
      dueDate: new Date("2025-11-16"),
      commentsCount: 4,
      createdAt: new Date("2025-08-30"),
      status: "toDo",
      comments: [],
      description: "",
      links: [],
    },
    {
      id: nanoid(),
      title: "Review accessibility standards",
      priority: "medium",
      assignee: {
        name: "Priya Sharma",
        avatar:
          "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=100&h=100&fit=crop",
      },
      tags: ["Frontend", "Accessibility"],
      dueDate: new Date("2025-11-19"),
      commentsCount: 1,
      createdAt: new Date("2025-08-29"),
      status: "toDo",
      comments: [],
      description: "",
      links: [],
    },
    {
      id: nanoid(),
      title: "Conduct user interviews",
      priority: "low",
      assignee: {
        name: "Nina D'Souza",
        avatar:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
      },
      tags: ["Research", "UX"],
      dueDate: new Date("2025-11-22"),
      commentsCount: 0,
      createdAt: new Date("2025-08-28"),
      status: "toDo",
      comments: [],
      description: "",
      links: [],
    },
    {
      id: nanoid(),
      title: "Design mobile app UI",
      priority: "medium",
      assignee: {
        name: "Ravi Mehta",
        avatar:
          "https://images.unsplash.com/photo-1603415526960-f8f0a5f0c4f6?w=100&h=100&fit=crop",
      },
      tags: ["Design", "Mobile"],
      dueDate: new Date("2025-11-17"),
      commentsCount: 2,
      createdAt: new Date("2025-08-26"),
      status: "toDo",
      comments: [],
      description: "",
      links: [],
    },
    {
      id: nanoid(),
      title: "Write unit tests for API",
      priority: "medium",
      assignee: {
        name: "Emily Zhang",
        avatar:
          "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&h=100&fit=crop",
      },
      tags: ["Testing", "Backend"],
      dueDate: new Date("2025-11-14"),
      commentsCount: 3,
      createdAt: new Date("2025-08-23"),
      status: "toDo",
      comments: [],
      description: "",
      links: [],
    },
  ],
  inProgress: [
    {
      id: nanoid(),
      title:
        "Fix mobile responsiveness issues on checkout page and update payment gateway integration",
      priority: "high",
      assignee: {
        name: "Alex Rivera",
      },
      tags: ["Frontend", "Bug", "Mobile"],
      dueDate: new Date("2025-10-28"),
      attachmentsCount: 1,
      createdAt: new Date("2025-08-20"),
      status: "inProgress",
      comments: [],
      description: "",
      links: [],
    },
  ],
  done: [
    {
      id: nanoid(),
      title: "Update documentation",
      priority: "low",
      assignee: {
        name: "Emily Watson",
      },
      tags: ["Docs"],
      dueDate: new Date("2025-11-30"),
      commentsCount: 1,
      createdAt: new Date("2025-08-20"),
      status: "done",
      comments: [],
      description: "",
      links: [],
    },
  ],
};

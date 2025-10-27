import { nanoid } from "nanoid";

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

export const DUMMY_TASKS = {
  toDo: [
    {
      id: nanoid(),
      title: "Implement user authentication with OAuth 2.0 and JWT tokens",
      priority: "high",
      assignee: {
        name: "Sarah Johnson",
      },
      tags: ["Backend", "Security", "API", "Authentication"],
      dueDate: "2025-10-20",
      commentsCount: 5,
      attachmentsCount: 2,
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
      dueDate: "2025-11-15",
      commentsCount: 3,
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
      dueDate: "2025-10-28",
      attachmentsCount: 1,
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
      dueDate: "2025-11-30",
      commentsCount: 1,
    },
  ],
};

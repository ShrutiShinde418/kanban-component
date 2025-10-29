export interface KanbanTask {
  id: string;
  title: string;
  description?: string;
  status: string;
  priority?: "low" | "medium" | "high" | "urgent";
  assignee?: {
    name?: string;
    avatar?: string;
  };
  tags?: string[];
  createdAt: Date;
  dueDate?: Date;
  commentsCount?: number;
  attachmentsCount?: number;
  comments?: {
    id: string;
    text: string;
    timestamp: string;
  }[];
  links?: {
    id: string;
    url: string;
  }[];
}

export interface KanbanColumnProps {
  id: string;
  title: string;
  color: string;
  taskIds?: string[];
  maxTasks?: number;
  numberOfTasks: number;
  tasks: KanbanTask[];
}

export interface KanbanViewProps {
  columns: KanbanColumnProps[];
  tasks: Record<string, KanbanTask>;
  onTaskMove: (
    taskId: string,
    fromColumn: string,
    toColumn: string,
    newIndex: number
  ) => void;
  onTaskCreate: (columnId: string, task: KanbanTask) => void;
  onTaskUpdate: (taskId: string, updates: Partial<KanbanTask>) => void;
  onTaskDelete: (taskId: string) => void;
}

export interface TaskFormData {
  title: string;
  description?: string;
  priority: "low" | "medium" | "high" | "urgent";
  assignee?: string;
  tags: string[];
}

export type FormErrors = Partial<Record<keyof TaskFormData, string>>;

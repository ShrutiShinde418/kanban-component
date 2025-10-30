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

export interface KanbanBoardProps {
  tasks: Record<string, KanbanTask[]>;
}

export interface TaskFormData {
  title: string;
  description?: string;
  priority: "low" | "medium" | "high" | "urgent";
  assignee?: string;
  tags: string[];
}

export type FormErrors = Partial<Record<keyof TaskFormData, string>>;

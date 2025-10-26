export interface KanbanTask {
  id: string;
  title: string;
  description?: string;
  status: string; // column identifier
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
}

export interface KanbanColumnProps {
  id: string;
  title: string;
  color: string;
  taskIds?: string[]; // ordered list of task IDs
  maxTasks?: number; // WIP limit (optional)
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
    newIndex: number,
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

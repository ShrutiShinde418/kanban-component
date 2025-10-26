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
    medium: "bg-yellow-100 text-yellow-700 border-l-4 border-yellow-500",
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
  const month = date.toLocaleDateString("en-US", { month: "short" });
  const day = date.getDate();
  return `${month} ${day}`;
};

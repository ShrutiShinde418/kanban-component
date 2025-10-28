import React, { useState } from "react";
import { useKanbanStore } from "../store/useKanbanStore";

export const useDragAndDrop = () => {
  const [dropIndicator, setDropIndicator] = useState<string | null>(null);

  const updateTaskStatusHandler = useKanbanStore(
    (state) => state.updateTaskStatusHandler
  );

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    taskDetails: { taskId: string; status: string }
  ) => {
    e.dataTransfer.setData(
      "text/plain",
      `${taskDetails.taskId.toString()}|${taskDetails.status}`
    );
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.clearData();
    setDropIndicator(null);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDropIndicator(e.currentTarget.id);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, status: string) => {
    e.preventDefault();
    const [taskId, originalTaskType] = e.dataTransfer
      .getData("text/plain")
      .split("|");

    updateTaskStatusHandler(taskId, originalTaskType, status);
    setDropIndicator(null);
  };

  return {
    dropIndicator,
    setDropIndicator,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDrop,
  };
};

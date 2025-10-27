import React, { useState } from "react";

export const useDragAndDrop = () => {
  const [dropIndicator, setDropIndicator] = useState<string | null>(null);

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    taskId: string,
  ) => {
    console.log(e.currentTarget);
    e.dataTransfer.setData("text/plain", taskId.toString());
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
    const taskId = e.dataTransfer.getData("text/plain");
    console.log(taskId);
    console.log(status);
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

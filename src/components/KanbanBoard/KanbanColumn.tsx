import React from "react";
import { type KanbanColumnProps } from "./KanbanBoard.ts";
import KanbanCard from "./KanbanCard.tsx";
import { useModalStore } from "../../store/modalStore.ts";
import { useDragAndDrop } from "../../hooks/useDragAndDrop.ts";

const KanbanColumn: React.FC<KanbanColumnProps> = ({
  title,
  numberOfTasks,
  color,
  tasks,
  id,
}) => {
  const { handleDragOver, handleDrop, dropIndicator } = useDragAndDrop();
  const openModal = useModalStore((state) => state.openModal);

  const openAddTaskHandler = (id: string) => {
    openModal(id);
  };

  return (
    <>
      <div
        className={`bg-neutral-100 rounded-lg py-2 px-4 flex flex-col ${
          dropIndicator === id ? "border" : ""
        }`}
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, id)}
        id={id}
      >
        <div className="flex gap-x-3 items-center">
          <span className={`rounded-circle size-2 ${color}`}></span>
          <h3>{title}</h3>
          <h4 className="bg-primary-700 rounded-circle py-1 px-2 text-xs text-white">
            {numberOfTasks}
          </h4>
        </div>
        {tasks.length === 0 && <p className="self-center mt-20">No Tasks</p>}
        <div className="flex flex-col gap-y-5 mt-4">
          {tasks.length > 0 &&
            tasks.map((task) => <KanbanCard {...task} key={task.id} />)}
        </div>
        <button
          className="mt-auto bg-primary-700 text-white py-3 font-semibold rounded-lg"
          onClick={() => openAddTaskHandler(id)}
        >
          Add Task
        </button>
      </div>
    </>
  );
};

export default KanbanColumn;

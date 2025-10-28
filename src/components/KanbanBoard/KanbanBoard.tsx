import React from "react";
import KanbanColumn from "./KanbanColumn.tsx";
import { useKanbanStore } from "../../store/useKanbanStore.ts";
import { kanbanBoards } from "../../utils/column.utils.ts";

const KanbanBoard: React.FC = () => {
  const tasks = useKanbanStore((state) => state.tasks);

  return (
    <div className="grid grid-cols-3 gap-x-5 mt-5 min-h-dvh">
      {kanbanBoards.map((board) => (
        <KanbanColumn
          id={board.id}
          key={board.id}
          title={board.title}
          color={board.color}
          tasks={tasks[board.id]}
          numberOfTasks={tasks[board.id].length}
        />
      ))}
    </div>
  );
};

export default KanbanBoard;

import React from "react";
import KanbanColumn from "./KanbanColumn.tsx";
import type { KanbanBoardProps } from "./KanbanBoardTypes.ts";
import { useKanbanStore } from "../../store/useKanbanStore.ts";

const KanbanBoard: React.FC<KanbanBoardProps> = ({ tasks }) => {
  const kanbanBoards = useKanbanStore((state) => state.kanbanBoards);
  return (
    <div className={`flex gap-x-5 gap-y-5 mt-5 min-h-dvh`}>
      {kanbanBoards.map((board) => (
        <KanbanColumn
          id={board.id}
          key={board.id}
          title={board.title}
          color={board.color}
          tasks={tasks[board.id]}
          numberOfTasks={tasks[board.id]?.length || 0}
        />
      ))}
    </div>
  );
};

export default KanbanBoard;

import React from "react";
import { useShallow } from "zustand/react/shallow";
import KanbanColumn from "./KanbanColumn.tsx";
import { useKanbanStore } from "../../store/useKanbanStore.ts";

const KanbanBoard: React.FC = () => {
  const { kanbanBoards, tasks: kanbanTasks } = useKanbanStore(
    useShallow((state) => ({
      kanbanBoards: state.kanbanBoards,
      tasks: state.tasks,
    })),
  );

  return (
    <div className={`flex gap-x-5 gap-y-5 mt-5 min-h-dvh`}>
      {kanbanBoards.map((board) => (
        <KanbanColumn
          id={board.id}
          key={board.id}
          title={board.title}
          color={board.color}
          tasks={kanbanTasks[board.id]}
          numberOfTasks={kanbanTasks[board.id]?.length || 0}
          maxTasks={board.maxTasks}
        />
      ))}
    </div>
  );
};

export default KanbanBoard;

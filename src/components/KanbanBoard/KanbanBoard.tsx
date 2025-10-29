import React, { useEffect } from "react";
import KanbanColumn from "./KanbanColumn.tsx";
import { useKanbanStore } from "../../store/useKanbanStore.ts";
import { kanbanBoards } from "../../utils/column.utils.ts";
import { DUMMY_TASKS } from "../../utils/task.utils";

const initializeDummyTasks = () => {
  useKanbanStore.setState({ tasks: DUMMY_TASKS });
};

const KanbanBoard: React.FC = () => {
  const tasks = useKanbanStore((state) => state.tasks);

  useEffect(() => {
    initializeDummyTasks();
  }, []);

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

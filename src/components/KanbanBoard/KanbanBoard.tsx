import React from "react";
import KanbanColumn from "./KanbanColumn.tsx";
import { useKanbanStore } from "../../store/useKanbanStore.ts";

const KanbanBoard: React.FC = () => {
  const tasks = useKanbanStore((state) => state.tasks);

  return (
    <div className="grid grid-cols-3 gap-x-5 mt-5 min-h-dvh">
      <KanbanColumn
        id="toDo"
        title="To Do"
        key="To Do"
        color="bg-error-500"
        numberOfTasks={4}
        tasks={tasks.toDo}
      />
      <KanbanColumn
        id="inProgress"
        title="In Progress"
        key="In Progress"
        color="bg-warning-500"
        numberOfTasks={4}
        tasks={tasks.inProgress}
      />
      <KanbanColumn
        id="done"
        title="Done"
        key="Done"
        color="bg-success-500"
        numberOfTasks={4}
        tasks={tasks.done}
      />
    </div>
  );
};

export default KanbanBoard;

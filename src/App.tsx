import { useEffect } from "react";
import KanbanBoard from "./components/KanbanBoard/KanbanBoard.tsx";
import AddTaskModal from "./components/KanbanBoard/AddTaskModal.tsx";
import TaskDetailModal from "./components/KanbanBoard/TaskDetailModal.tsx";
import { useKanbanStore } from "./store/useKanbanStore.ts";
import { DUMMY_TASKS } from "./utils/task.utils.ts";

const initializeDummyTasks = () => {
  useKanbanStore.setState({ tasks: DUMMY_TASKS });
};

function App() {
  const tasks = useKanbanStore((state) => state.tasks);

  useEffect(() => {
    initializeDummyTasks();
  }, []);

  return (
    <main className="container xl:mx-auto my-4 px-5 font-custom">
      <header className="flex justify-between items-center">
        <div className="flex flex-col gap-y-1">
          <h1 className="text-3xl font-medium">Tasks</h1>
          <h2 className="text-neutral-500">
            Keep Track of your team's tasks all in one place.
          </h2>
        </div>
      </header>
      <KanbanBoard tasks={tasks} />
      <AddTaskModal />
      <TaskDetailModal />
    </main>
  );
}

export default App;

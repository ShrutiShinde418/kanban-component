import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useShallow } from "zustand/react/shallow";
import KanbanBoard from "./components/KanbanBoard/KanbanBoard.tsx";
import AddTaskModal from "./components/KanbanBoard/AddTaskModal.tsx";
import TaskDetailModal from "./components/KanbanBoard/TaskDetailModal.tsx";
import { useKanbanStore } from "./store/useKanbanStore.ts";
import { DUMMY_TASKS } from "./utils/task.utils.ts";
import KanbanColumnOptionsModal from "./components/KanbanBoard/KanbanColumnOptionsModal.tsx";

const initializeDummyTasks = () => {
  useKanbanStore.setState({ tasks: DUMMY_TASKS });
};

function App() {
  const { error, resetErrorMessage, success, resetSuccessMessage } =
    useKanbanStore(
      useShallow((state) => ({
        error: state.error,
        resetErrorMessage: state.resetErrorMessage,
        success: state.success,
        resetSuccessMessage: state.resetSuccessMessage,
      }))
    );

  useEffect(() => {
    initializeDummyTasks();
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
      resetErrorMessage();
    }
  }, [error, resetErrorMessage]);

  useEffect(() => {
    if (success) {
      toast.success(success);
      resetSuccessMessage();
    }
  }, [success, resetSuccessMessage]);

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
      <ToastContainer />
      <KanbanBoard />
      <AddTaskModal />
      <TaskDetailModal />
      <KanbanColumnOptionsModal />
    </main>
  );
}

export default App;

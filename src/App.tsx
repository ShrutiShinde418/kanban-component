import { UserRoundPlus } from "lucide-react";
import KanbanBoard from "./components/KanbanBoard/KanbanBoard.tsx";
import TaskModal from "./components/KanbanBoard/TaskModal.tsx";

function App() {
  return (
    <div className="container xl:mx-auto my-4 px-5 font-custom">
      <header className="flex justify-between items-center">
        <div className="flex flex-col gap-y-1">
          <h1 className="text-3xl font-medium">Tasks</h1>
          <h2 className="text-neutral-500">
            Keep Track of your team's tasks all in one place.
          </h2>
        </div>
        <div>
          <button className="flex items-center gap-2 bg-primary-800 text-white rounded-lg px-4 py-2">
            <UserRoundPlus className="size-4" />
            Invite Member
          </button>
        </div>
      </header>
      <KanbanBoard />
      <TaskModal />
    </div>
  );
}

export default App;

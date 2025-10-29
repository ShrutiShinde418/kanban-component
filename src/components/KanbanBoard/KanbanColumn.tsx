import React, { useState } from "react";
import { type KanbanColumnProps } from "./KanbanBoardTypes.ts";
import KanbanCard from "./KanbanCard.tsx";
import { useModalStore } from "../../store/useModalStore.ts";
import { useDragAndDrop } from "../../hooks/useDragAndDrop.ts";
import { Ellipsis } from "lucide-react";
import Menu from "../primitives/Menu.tsx";
import { menuItems } from "../../utils/column.utils.ts";

// TODO: sticky columns headers while scrolling

const KanbanColumn: React.FC<KanbanColumnProps> = ({
  title,
  numberOfTasks,
  color,
  tasks,
  id,
}) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const { handleDragOver, handleDrop, dragEnterState, setDragEnterState } =
    useDragAndDrop();
  const openModal = useModalStore((state) => state.openModal);

  const openAddTaskHandler = (id: string) => {
    openModal(id);
  };

  const openMenuHandler = () => {
    setShowMenu((state) => !state);
  };

  return (
    <>
      <div
        className={`bg-neutral-100 rounded-lg p-4 flex flex-col overflow-y-scroll h-svh flex-1 xl:min-w-80 ${
          dragEnterState ? "border-2 border-gray-600" : "border-0"
        }`}
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, id)}
        onDragEnter={() => setDragEnterState(true)}
        onDragEnd={() => setDragEnterState(false)}
        onDragLeave={() => setDragEnterState(false)}
        id={id}
      >
        <div className="relative">
          <div className="flex gap-x-3 items-center sticky top-4 z-10">
            <span className={`rounded-circle size-2 ${color}`}></span>
            <h3>{title}</h3>
            <h4 className="bg-primary-700 rounded-circle py-1 px-2 text-xs text-white">
              {numberOfTasks}
            </h4>
            <button className={"ml-auto"} onClick={openMenuHandler}>
              <Ellipsis className={"text-gray-500 size-30"} />
            </button>
          </div>
          {showMenu && (
            <Menu
              subMenuItems={menuItems}
              classNames={showMenu ? "opacity-100 top-5 right-0" : ""}
              menuItemClassNames="px-5 py-2 text-sm hover:bg-blue-500 hover:text-white font-semibold"
            />
          )}
        </div>
        {tasks?.length === 0 && <p className="self-center mt-20">No Tasks</p>}
        <div className="flex flex-col gap-y-5 mt-4 mb-5">
          {tasks?.length > 0 &&
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

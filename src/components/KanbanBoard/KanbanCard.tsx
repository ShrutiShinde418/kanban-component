import React from "react";
import { Calendar, MessageCircle, Paperclip } from "lucide-react";
import type { KanbanTask } from "./KanbanBoardTypes.ts";
import {
  formatDate,
  getInitials,
  getPriorityColor,
  isOverdue,
} from "../../utils/task.utils.ts";
import { useDragAndDrop } from "../../hooks/useDragAndDrop.ts";
import { useModalStore } from "../../store/useModalStore.ts";

const KanbanCard: React.FC<KanbanTask> = (task) => {
  const { handleDragStart, handleDragEnd } = useDragAndDrop();
  const openTaskDetailModal = useModalStore(
    (state) => state.openTaskDetailModal,
  );

  return (
    <div
      className={`bg-white rounded-lg shadow-sm border-l-4 ${getPriorityColor(
        task?.priority || "low",
      )} p-4 hover:shadow-md transition-shadow cursor-pointer`}
      draggable={true}
      onDragEnd={handleDragEnd}
      onDragStart={(e) =>
        handleDragStart(e, { taskId: task.id, status: task.status })
      }
      id={task.id}
      onClick={() => openTaskDetailModal(task)}
      aria-label={"task details"}
      role={"article"}
    >
      <h3 className="font-bold text-gray-900 mb-3 line-clamp-2 leading-snug">
        {task.title}
      </h3>
      {task.description && (
        <p className="text-neutral-500 mb-3 line-clamp-2">{task.description}</p>
      )}
      {task.tags && task.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {task.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded"
            >
              {tag}
            </span>
          ))}
          {task.tags.length > 3 && (
            <span className="px-2 py-1 text-xs font-medium bg-gray-200 text-gray-600 rounded">
              +{task.tags.length - 3}
            </span>
          )}
        </div>
      )}
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-2">
          {task.assignee?.avatar ? (
            <img
              src={task.assignee.avatar}
              alt={task.assignee.name}
              className="w-7 h-7 rounded-full object-cover"
            />
          ) : (
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-semibold">
              {getInitials(task?.assignee?.name ?? "UN")}
            </div>
          )}
        </div>
        <div className="flex items-center gap-3">
          {task?.commentsCount !== null && (
            <div className="flex items-center gap-1 text-gray-500">
              <MessageCircle size={14} />
              <span className="text-xs">{task.commentsCount}</span>
            </div>
          )}
          {task?.attachmentsCount !== null && (
            <div className="flex items-center gap-1 text-gray-500">
              <Paperclip size={14} />
              <span className="text-xs">{task.attachmentsCount}</span>
            </div>
          )}
          {task.dueDate && (
            <div
              className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
                isOverdue(task.dueDate)
                  ? "bg-red-100 text-red-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              <Calendar size={12} />
              <span>{formatDate(task.dueDate)}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KanbanCard;

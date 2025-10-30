import React, { type FormEvent, useEffect, useState } from "react";
import { AlertCircle, Calendar, Plus, Tag, User, X } from "lucide-react";
import { format } from "date-fns";
import { useShallow } from "zustand/react/shallow";
import Modal from "../primitives/Modal.tsx";
import Button from "../primitives/Button.tsx";
import Input from "../primitives/Input.tsx";
import FormControl from "../primitives/FormControl.tsx";
import type { KanbanTask } from "./KanbanBoardTypes.ts";
import { useModalStore } from "../../store/useModalStore.ts";
import { useKanbanStore } from "../../store/useKanbanStore.ts";

const TaskDetailModal: React.FC = () => {
  const { taskItem, closeModal } = useModalStore(
    useShallow((state) => ({
      taskItem: state.taskItem,
      closeModal: state.closeModal,
    })),
  );

  const { deleteSingleTaskHandler, updateSingleTaskHandler } = useKanbanStore(
    useShallow((state) => ({
      deleteSingleTaskHandler: state.deleteSingleTaskHandler,
      updateSingleTaskHandler: state.updateSingleTaskHandler,
    })),
  );

  const [title, setTitle] = useState<KanbanTask["title"]>(
    taskItem?.["title"] ?? "",
  );
  const [description, setDescription] = useState<KanbanTask["description"]>(
    taskItem?.description,
  );
  const [tags, setTags] = useState<KanbanTask["tags"]>(taskItem?.tags);
  const [tagInput, setTagInput] = useState<string>("");
  const [assignee, setAssignee] = useState<string>(
    taskItem?.assignee?.name ?? "Unknown",
  );
  const [priority, setPriority] = useState<KanbanTask["priority"]>(
    taskItem?.priority,
  );
  const [dueDate, setDueDate] = useState<string | Date>(
    taskItem?.dueDate ?? format(new Date(), "yyyy/MM/dd"),
  );

  useEffect(() => {
    if (taskItem) {
      setTitle(taskItem.title ?? "");
      setDescription(taskItem.description ?? "");
      setTags(taskItem.tags ?? []);
      setAssignee(taskItem.assignee?.name ?? "Unknown");
      setPriority(taskItem.priority ?? "medium");
      setDueDate(taskItem.dueDate ?? new Date());
    }
  }, [taskItem]);

  const removeTask = (
    taskId: KanbanTask["id"],
    taskType: KanbanTask["status"],
  ) => {
    deleteSingleTaskHandler(taskId, taskType);
    closeModal();
  };

  const updateTask = (
    taskId: KanbanTask["id"],
    taskType: KanbanTask["status"],
  ) => {
    const updatedTaskItem: Partial<KanbanTask> = {
      id: taskId,
      title,
      description,
      tags,
      assignee: {
        name: assignee,
      },
      priority,
      dueDate: new Date(dueDate),
    };
    updateSingleTaskHandler(taskType, updatedTaskItem);
    closeModal();
  };

  const addTag = () => {
    if (tagInput.trim() && !tags?.includes(tagInput.trim())) {
      setTags([...(tags || []), tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags?.filter((tag: string) => tag !== tagToRemove));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    closeModal();
  };

  return (
    <Modal onClose={closeModal} open={Boolean(taskItem)}>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <form
          className="bg-white rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
          onSubmit={handleSubmit}
        >
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-900">
              Update Task
            </h2>
            <Button
              onClick={closeModal}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </Button>
          </div>

          <div className="p-6 space-y-6">
            <FormControl
              key={"Title"}
              labelName={"Title"}
              labelClasses={"block text-sm font-medium text-gray-700 mb-2"}
              isFieldRequired={true}
              inputProps={{
                type: "text",
                value: title,
                onChange: (e) => setTitle(e.target.value),
                className:
                  "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                placeholder: "Enter task title",
                required: true,
              }}
            />
            <FormControl
              key={"Description"}
              labelName={"Description"}
              labelClasses={"block text-sm font-medium text-gray-700 mb-2"}
              isFieldRequired={false}
              inputProps={{
                isTextArea: true,
                value: description,
                onChange: (e) => setDescription(e.target.value),
                rows: 4,
                className:
                  "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none",
                placeholder: "Enter task description",
              }}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <AlertCircle size={16} className="inline mr-1" />
                  Priority
                </label>
                <select
                  value={priority}
                  onChange={(e) =>
                    setPriority(e.target.value as KanbanTask["priority"])
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
              <FormControl
                key={"Due Date"}
                labelName={"Due Date"}
                labelClasses={"block text-sm font-medium text-gray-700 mb-2"}
                isFieldRequired={true}
                inputProps={{
                  type: "date",
                  value: format(dueDate, "yyyy-MM-dd"),
                  onChange: (e) => setDueDate(e.target.value),
                  className:
                    "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                  required: true,
                }}
                icon={<Calendar size={16} className="inline mr-1" />}
              />
            </div>
            <FormControl
              key={"Assignee"}
              labelName={"Assignee"}
              labelClasses={"block text-sm font-medium text-gray-700 mb-2"}
              isFieldRequired={true}
              inputProps={{
                type: "text",
                value: assignee,
                onChange: (e) => setAssignee(e.target.value),
                className:
                  "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                required: true,
                placeholder: "Enter assignee name",
              }}
              icon={<User size={16} className="inline mr-1" />}
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Tag size={16} className="inline mr-1" />
                Tags
              </label>
              <div className="flex gap-2 mb-2">
                <Input
                  isTextArea={false}
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Add a tag"
                />
                <Button
                  type="button"
                  onClick={addTag}
                  className="px-4 py-2 bg-primary-700 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <Plus size={20} />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags?.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                  >
                    {tag}
                    <Button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="hover:text-blue-900"
                    >
                      <X size={14} />
                    </Button>
                  </span>
                ))}
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <Button
                type="button"
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                onClick={() =>
                  removeTask(
                    taskItem?.id as KanbanTask["id"],
                    taskItem?.status as KanbanTask["status"],
                  )
                }
              >
                Remove
              </Button>
              <Button
                type="submit"
                className="px-6 py-2 bg-primary-700 text-white rounded-lg hover:bg-blue-600 transition-colors"
                onClick={() =>
                  updateTask(
                    taskItem?.id as KanbanTask["id"],
                    taskItem?.status as KanbanTask["status"],
                  )
                }
              >
                Update Task
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default TaskDetailModal;

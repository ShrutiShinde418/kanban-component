import React, { useState, useEffect } from "react";
import {
  X,
  Plus,
  Trash2,
  Calendar,
  Upload,
  Tag,
  User,
  LinkIcon,
  AlertCircle,
} from "lucide-react";
import { nanoid } from "nanoid";
import { format } from "date-fns";
import { useShallow } from "zustand/react/shallow";
import Modal from "../primitives/Modal.tsx";
import Button from "../primitives/Button.tsx";
import FormControl from "../primitives/FormControl.tsx";
import type { KanbanTask } from "./KanbanBoard.ts";
import { useModalStore } from "../../store/modalStore.ts";
import { useKanbanStore } from "../../store/useKanbanStore.ts";
import { DUMMY_TASKS, taskTypeMapper } from "../../utils/task.utils.ts";

const initializeDummyTasks = () => {
  useKanbanStore.setState({ tasks: DUMMY_TASKS });
};

const TaskModal: React.FC = () => {
  const [title, setTitle] = useState<KanbanTask["title"]>("");
  const [description, setDescription] = useState<KanbanTask["description"]>("");
  const [tags, setTags] = useState<KanbanTask["tags"]>([]);
  const [tagInput, setTagInput] = useState<string>("");
  const [assignee, setAssignee] = useState<string>("");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [comments, setComments] = useState<KanbanTask["comments"]>([]);
  const [commentInput, setCommentInput] = useState<string>("");
  const [links, setLinks] = useState<KanbanTask["links"]>([]);
  const [linkInput, setLinkInput] = useState<string>("");
  const [priority, setPriority] = useState<KanbanTask["priority"]>("low");
  const [dueDate, setDueDate] = useState<string>(
    format(new Date(), "yyyy/MM/dd"),
  );

  useEffect(() => {
    initializeDummyTasks();
  }, []);

  const { taskModalType, closeModal } = useModalStore(
    useShallow((state) => ({
      taskModalType: state.taskModalType,
      closeModal: state.closeModal,
    })),
  );

  const { addTaskHandler } = useKanbanStore(
    useShallow((state) => ({
      addTaskHandler: state.addTaskHandler,
    })),
  );

  const addTag = () => {
    if (tagInput.trim() && !tags?.includes(tagInput.trim())) {
      setTags([...(tags || []), tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags?.filter((tag) => tag !== tagToRemove));
  };

  const addComment = () => {
    if (commentInput.trim()) {
      setComments([
        ...comments,
        { id: Date.now(), text: commentInput.trim(), timestamp: new Date() },
      ]);
      setCommentInput("");
    }
  };

  const removeComment = (id: string) => {
    setComments(comments?.filter((comment) => comment.id !== id));
  };

  const addLink = () => {
    if (linkInput.trim()) {
      setLinks([...links, { id: Date.now(), url: linkInput.trim() }]);
      setLinkInput("");
    }
  };

  const removeLink = (id: string) => {
    setLinks(links?.filter((link) => link.id !== id));
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTaskHandler(taskModalType as string, {
      title,
      description,
      tags,
      assignee: {
        name: assignee,
        avatar: avatarPreview as string | undefined,
      },
      comments,
      links,
      priority,
      dueDate: new Date(dueDate),
      status: taskModalType as string,
      id: nanoid(),
      createdAt: new Date(),
    });
    closeModal();
  };

  return (
    <Modal onClose={closeModal} open={Boolean(taskModalType)}>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <form
          className="bg-white rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
          onSubmit={handleSubmit}
        >
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-900">
              Add new {taskTypeMapper[taskModalType]} Task
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Enter task description"
              />
            </div>
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar size={16} className="inline mr-1" />
                  Due Date
                </label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User size={16} className="inline mr-1" />
                  Assignee
                </label>
                <input
                  type="text"
                  value={assignee}
                  onChange={(e) => setAssignee(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter assignee name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Upload size={16} className="inline mr-1" />
                  Avatar Image
                </label>
                <div className="flex items-center space-x-3">
                  {avatarPreview && (
                    <img
                      src={avatarPreview}
                      alt="Avatar preview"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  )}
                  <label className="flex-1 cursor-pointer">
                    <div className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-center text-sm text-gray-600">
                      Choose File
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Tag size={16} className="inline mr-1" />
                Tags
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Add a tag"
                />
                <Button
                  type="button"
                  onClick={addTag}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <Plus size={20} />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags?.map((tag, index) => (
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <LinkIcon size={16} className="inline mr-1" />
                Links
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="url"
                  value={linkInput}
                  onChange={(e) => setLinkInput(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Add a link URL"
                />
                <Button
                  type="button"
                  onClick={addLink}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <Plus size={20} />
                </Button>
              </div>
              <div className="space-y-2">
                {links?.map((link) => (
                  <div
                    key={link.id}
                    className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                  >
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-sm truncate flex-1"
                    >
                      {link.url}
                    </a>
                    <Button
                      type="button"
                      onClick={() => removeLink(link.id)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Comments
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Add a comment"
                />
                <Button
                  type="button"
                  onClick={addComment}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <Plus size={20} />
                </Button>
              </div>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {comments?.map((comment) => (
                  <div
                    key={comment.id}
                    className="flex items-start justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-1">
                      <p className="text-sm text-gray-800">{comment.text}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {comment.timestamp.toLocaleString()}
                      </p>
                    </div>
                    <Button
                      type="button"
                      onClick={() => removeComment(comment.id)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <Button
                type="button"
                onClick={closeModal}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Create Task
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default TaskModal;

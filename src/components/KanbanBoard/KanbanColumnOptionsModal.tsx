import React, { type FormEvent, useState, useEffect } from "react";
import { X } from "lucide-react";
import { useShallow } from "zustand/react/shallow";
import Modal from "../primitives/Modal";
import { useModalStore } from "../../store/useModalStore";
import Button from "../primitives/Button";
import FormControl from "../primitives/FormControl";

const KanbanColumnOptionsModal: React.FC = () => {
  const { closeModal, kanbanColumnInfo } = useModalStore(
    useShallow((state) => ({
      closeModal: state.closeModal,
      kanbanColumnInfo: state.kanbanColumnInfo,
    }))
  );

  console.log(kanbanColumnInfo);
  const [columnName, setColumnName] = useState("");
  const [wipLimit, setWipLimit] = useState(0);

  useEffect(() => {
    if (kanbanColumnInfo) {
      setColumnName(kanbanColumnInfo?.column.title);
      setWipLimit(kanbanColumnInfo?.column.maxTasks);
    }
  }, [kanbanColumnInfo]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    closeModal();
  };

  return (
    <Modal onClose={closeModal} open={Boolean(kanbanColumnInfo)}>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <form
          className="bg-white rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
          onSubmit={handleSubmit}
        >
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-900">
              {kanbanColumnInfo?.option === "Rename"
                ? "Rename Kanban Column"
                : "Set WIP Limit"}
            </h2>
            <Button
              onClick={closeModal}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </Button>
          </div>
          <div className="p-6 space-y-6">
            {kanbanColumnInfo?.option === "Rename" ? (
              <FormControl
                key={"Kanban Column"}
                labelName={"Kanban Column Name"}
                labelClasses={"block text-sm font-medium text-gray-700 mb-2"}
                isFieldRequired={true}
                inputProps={{
                  type: "text",
                  value: columnName,
                  onChange: (e) => setColumnName(e.target.value),
                  className:
                    "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                  placeholder: "Enter Column Name",
                  name: "columnName",
                  required: true,
                }}
              />
            ) : (
              <FormControl
                key={"WIP Limit"}
                labelName={"Set WIP Limit"}
                labelClasses={"block text-sm font-medium text-gray-700 mb-2"}
                isFieldRequired={true}
                inputProps={{
                  type: "number",
                  value: wipLimit,
                  onChange: (e) => setWipLimit(+e.target.value),
                  className:
                    "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                  placeholder: "Enter WIP Limit",
                  name: "wipLimit",
                  required: true,
                }}
              />
            )}
          </div>
          <div className="flex justify-end gap-3 pt-4 mb-4 mr-6 border-t border-gray-200">
            <Button
              type="button"
              onClick={closeModal}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="px-6 py-2 bg-primary-700 text-white rounded-lg hover:bg-primary-500 transition-colors"
            >
              Update
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default KanbanColumnOptionsModal;

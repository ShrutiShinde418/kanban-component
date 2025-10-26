import React from "react";
import KanbanColumn from "./KanbanColumn.tsx";

const KanbanBoard: React.FC = () => {
  return (
    <div className="grid grid-cols-3 gap-x-5 mt-5 min-h-dvh">
      <KanbanColumn
        id="To Do"
        title="To Do"
        key="To Do"
        color="bg-error-500"
        numberOfTasks={4}
        tasks={[
          {
            id: "To Do",
            title:
              "Implement user authentication with OAuth 2.0 and JWT tokens",
            priority: "high",
            assignee: {
              name: "Sarah Johnson",
            },
            tags: ["Backend", "Security", "API", "Authentication"],
            dueDate: new Date("2025-10-20"),
            commentsCount: 5,
            attachmentsCount: 2,
            status: "active",
            createdAt: new Date("2025-10-20"),
          },
          {
            id: "To Do",
            title:
              "Implement user authentication with OAuth 2.0 and JWT tokens",
            priority: "low",
            assignee: {
              name: "Sarah Johnson",
            },
            tags: ["Backend", "Security", "API", "Authentication"],
            dueDate: new Date("2025-10-20"),
            commentsCount: 5,
            attachmentsCount: 2,
            status: "active",
            createdAt: new Date("2025-10-20"),
          },
        ]}
      />
      <KanbanColumn
        id="In Progress"
        title="In Progress"
        key="In Progress"
        color="bg-warning-500"
        numberOfTasks={4}
        tasks={[]}
      />
      <KanbanColumn
        id="Done"
        title="Done"
        key="Done"
        color="bg-success-500"
        numberOfTasks={4}
        tasks={[]}
      />
    </div>
  );
};

export default KanbanBoard;

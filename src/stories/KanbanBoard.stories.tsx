import type { Meta, StoryObj } from "@storybook/react";
import KanbanBoard from "../components/KanbanBoard/KanbanBoard.tsx";

const meta: Meta<typeof KanbanBoard> = {
  title: "Components/KanbanBoard",
  component: KanbanBoard,
};

export const Default: StoryObj<typeof KanbanBoard> = {
  args: {
    // Provide default props if needed
  },
};

export default meta;

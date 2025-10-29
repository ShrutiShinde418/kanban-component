// TODO: install and implement storybook
import type { Meta, StoryObj } from '@storybook/react';
import KanbanBoard from '../components/KanbanBoard/KanbanBoard.tsx';

const meta: Meta<typeof KanbanBoard> = {
  title: 'Components/KanbanBoard',
  component: KanbanBoard,
};

export default meta;

export const Default: StoryObj<typeof KanbanBoard> = {
  args: {
    // Provide default props if needed
  },
};


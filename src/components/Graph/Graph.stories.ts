import Graph from '@/components/Graph/Graph';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Component/Graph',
  component: Graph,
  tags: ['autodocs'],
} satisfies Meta<typeof Graph>;

export default meta;

type Story = StoryObj<typeof meta>;

export const PastLevel: Story = {
  args: {
    status: 'past-level',
    symbolStack: 210,
  },
};

export const PresentLevel: Story = {
  args: {
    status: 'present-level',
    symbolStack: 210,
  },
};

export const FutureLevel: Story = {
  args: {
    status: 'future-level',
    symbolStack: 210,
    level: 4,
  },
};

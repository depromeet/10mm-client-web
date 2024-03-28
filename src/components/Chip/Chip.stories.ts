import Chip from '@/components/Chip/Chip';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Component/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
    controls: {
      include: ['selected', 'children'],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    selected: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    selected: false,
    children: '텍스트',
  },
};

export const Selected: Story = {
  args: {
    selected: true,
    children: '텍스트',
  },
};

import Header from '@/components/Header/Header';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Component/Header',
  component: Header,
  tags: ['autodocs'],
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const None: Story = {
  args: {
    rightAction: 'none',
    title: '타이틀',
    onBackAction: () => alert('back button click'),
  },
};

export const TextButton: Story = {
  args: {
    rightAction: 'text-button',
    title: '타이틀',
    onBackAction: () => alert('back button click'),
  },
};

export const Icon: Story = {
  args: {
    title: '타이틀',
    rightAction: 'icon',
  },
};

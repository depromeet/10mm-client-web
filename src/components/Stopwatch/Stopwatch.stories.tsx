import Stopwatch from '@/components/Stopwatch/Stopwatch';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Component/Stopwatch',
  component: Stopwatch,
  parameters: {
    layout: 'centered',
    // controls: {
    //   include: ['variant', 'size', 'children', 'disabled'],
    // },
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Stopwatch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

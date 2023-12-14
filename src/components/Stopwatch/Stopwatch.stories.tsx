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
  args: {
    minutes: 10,
    seconds: 10,
    category: '잠들기 전 오늘 하루 감사일기 쓰기',
    stack: 1,
  },
};

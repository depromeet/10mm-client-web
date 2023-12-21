import Header from '@/components/Header';
import type { Meta } from '@storybook/react';

const meta = {
  title: 'Component/Header',
  component: Header,
  tags: ['autodocs'],
} satisfies Meta<typeof Header>;

export default meta;

export const Primary = {
  args: {
    title: '타이틀',
  },
};

export const RightActionNone = () => {
  return <Header.None title="타이틀" />;
};

export const RightActionTextButton = () => {
  return <Header.TextButton title="타이틀" />;
};

export const RightActionIcon = () => {
  return <Header.Icon title="타이틀" />;
};

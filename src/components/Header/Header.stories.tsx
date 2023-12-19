import IconHeader from '@/components/Header/IconHeader';
import TextButtonHeader from '@/components/Header/TextButtonHeader';
import type { Meta } from '@storybook/react';

import Header from './Header';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Example/Header',
  component: Header,
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} satisfies Meta<typeof Header>;

export default meta;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary = {
  args: {
    title: '타이틀',
  },
};

export const RightActionNone = {
  args: {
    title: '타이틀',
  },
};

export const RightActionTextButton = () => {
  return <TextButtonHeader title="타이틀" />;
};

export const RightActionIcon = () => {
  return <IconHeader title="타이틀" />;
};

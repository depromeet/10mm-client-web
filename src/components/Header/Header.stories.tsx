import Button from '@/components/Button/Button';
import TextButtonHeader from '@/components/Header/TextButtonHeader';
import Icon from '@/components/Icon';
import type { Meta, StoryObj } from '@storybook/react';

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
  return <TextButtonHeader title="타이틀" rightButtonText={'완료'} />;
};

export const RightActionIcon = {
  args: {
    title: '타이틀',
    rightElement: (
      <div>
        <Icon name="close" width={20} height={20} />
      </div>
    ),
  },
};

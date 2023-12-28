import type { Meta, StoryObj } from '@storybook/react';

import TextArea from './TextArea';

const meta = {
  title: 'Component/TextArea',
  component: TextArea,
  tags: ['autodocs'],
  argTypes: {
    count: {
      control: 'boolean',
      value: 'string',
    },
  },
} satisfies Meta<typeof TextArea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultTextArea: Story = {
  args: {
    count: true,
    placeholder: '일지를 작성해주세요',
    description: '디스크립션영역입니다',
    textAreaTitle: '일지 작성',
  },
};

export const FocusedTextArea: Story = {
  args: {
    count: true,
    placeholder: '일지를 작성해주세요',
    description: '디스크립션영역입니다',
    textAreaTitle: '일지 작성',
    autoFocus: true,
  },
};

export const TypingTextArea: Story = {
  args: {
    count: true,
    placeholder: '일지를 작성해주세요',
    description: '디스크립션영역입니다',
    textAreaTitle: '일지 작성',
    value: '오늘은 어제보다',
    autoFocus: true,
  },
};

export const FilledTextArea: Story = {
  args: {
    count: true,
    placeholder: '일지를 작성해주세요',
    description: '디스크립션영역입니다',
    textAreaTitle: '일지 작성',
    value: '오늘은 어제보다',
  },
};

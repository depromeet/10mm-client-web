import type { Meta, StoryObj } from '@storybook/react';

import Banner from './Banner';

const meta = {
  title: 'Component/Banner',
  component: Banner,
  tags: ['autodocs'],
  parameters: {},
  argTypes: {},
} satisfies Meta<typeof Banner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ListBanner: Story = {
  args: {
    type: 'list',
    title: '수미칩은 맛있다',
    description: '왜냐하면 수미칩은 맛있기 때문이다. ',
    imageUrl: '/images/category/study.png',
  },
};

export const ListBannerDate: Story = {
  args: {
    type: 'list',
    title: '수미칩은 맛있다',
    description: '왜냐하면 수미칩은 맛있기 때문이다. ',
    imageUrl: '/images/category/study.png',
    date: '날짜',
  },
};

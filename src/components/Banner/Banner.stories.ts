import type { Meta, StoryObj } from '@storybook/react';

import Banner from './Banner';

const meta = {
  title: 'Component/Banner',
  component: Banner,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    type: { table: { disable: true } },
  },
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
  argTypes: {
    iconName: { table: { disable: true } },
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
  argTypes: {
    iconName: { table: { disable: true } },
  },
};

export const CardBanner: Story = {
  args: {
    type: 'card',
    title: '수미칩은 맛있다',
    description: '난 최고야 ',
    iconName: '10mm-symbol',
  },
  argTypes: {
    imageUrl: { table: { disable: true } },
    date: { table: { disable: true } },
  },
};

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
  argTypes: {},
};

export const ListBannerDate: Story = {
  args: {
    type: 'list',
    title: '수미칩은 맛있다',
    description: '왜냐하면 수미칩은 맛있기 때문이다. ',
    imageUrl: '/images/category/study.png',
    date: '날짜',
  },
  argTypes: {},
};
export const ListLevelBanner: Story = {
  args: {
    type: 'level',
    symbolStack: 11,
  },
  argTypes: {},
};
export const CardBanner: Story = {
  args: {
    type: 'card',
    title: '수미칩은 맛있다',
    description: '난 최고야 ',
    iconUrl: '/assets/icons/graph/clock.png',
  },
  argTypes: {
    imageUrl: { table: { disable: true } },
    date: { table: { disable: true } },
  },
  decorators: [(Story) => <div style={{ maxWidth: '167px' }}>{<Story />}</div>],
};

export const GraphicBanner: Story = {
  args: {
    type: 'graphic',
    imageUrl: 'https://github.com/depromeet/10mm-client-web/assets/49177223/0b7b5bdf-3387-4438-b705-bfcb58fc1440', // 임시 사진
  },
  argTypes: {
    imageUrl: { table: { disable: true } },
    date: { table: { disable: true } },
  },
  decorators: [(Story) => <div style={{ maxWidth: '235px' }}>{<Story />}</div>],
};

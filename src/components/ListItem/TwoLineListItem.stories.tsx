import Badge from '@/components/Badge/Badge';
import TwoLineListItem from '@/components/ListItem/TwoLineListItem';
import { css } from '@/styled-system/css';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Component/ListItem/TwoLineListItem',
  component: TwoLineListItem,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: '리스트 요소입니다.',
    docs: {
      description: {
        component: 'Component',
      },
    },
    layout: 'centered',
    controls: { sort: 'requiredFirst' },
  },
  args: {
    name: '운동',
  },
  argTypes: {},
  decorators: [
    (Story) => (
      <div className={containerCss}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TwoLineListItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: '운동해야지',
    subName: '글쓰기',
    imageUrl: '/images/category/exercise.png',
  },
};

export const Long: Story = {
  args: {
    name: '운동해야지운동해야지운동해야지운동해야지운동해야지운동해야지운동해야지',
    subName: '글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기',
    imageUrl: '/images/category/exercise.png',
    badgeElement: <Badge color="purple">badge</Badge>,
  },
};

export const BadgeStory: Story = {
  args: {
    name: '운동해야지',
    subName: '글쓰기',
    imageUrl: '/images/category/exercise.png',
    badgeElement: <Badge color="purple">badge</Badge>,
  },
};

export const NoneBg: Story = {
  args: {
    name: '운동해야지',
    subName: '글쓰기',
    imageUrl: '/images/category/exercise.png',
    badgeElement: <Badge color="purple">badge</Badge>,
    isBackground: false,
  },
};

const containerCss = css({
  maxWidth: '375px',
});

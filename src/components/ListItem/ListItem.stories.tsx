import Badge from '@/components/Badge/Badge';
import ListItem from '@/components/ListItem/ListItem';
import Thumbnail from '@/components/Thumbnail/Thumbnail';
import { css } from '@/styled-system/css';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Component/ListItem',
  component: ListItem,
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
    category: '운동',
    missionTitle: '스쿼트 30개 하기',
    name: '수미칩',
    thumbnailElement: <Thumbnail size="h52" />,
  },
  argTypes: {
    onButtonClick: { table: { disable: true } },
    badgeElement: { table: { disable: true } },
    imageUrl: { table: { disable: true } },
    thumbnailElement: { table: { disable: true } },
  },
} satisfies Meta<typeof ListItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Category: Story = {
  args: {
    type: 'category',
    imageUrl: '/images/category/exercise.png',
    category: '운동',
    checked: true,
  },
  argTypes: {
    type: { table: { disable: true } },
    name: { table: { disable: true } },
    missionTitle: { table: { disable: true } },
  },
  decorators: [
    (Story) => (
      <div className={containerCss}>
        <Story />
      </div>
    ),
  ],
};

export const Mission: Story = {
  args: {
    type: 'mission',
    category: '글쓰기',
    missionTitle: '잠들기 전 오늘 하루 감사일기 쓰기',
    imageUrl: '/images/category/writting.png',
    badgeElement: <Badge color="purple">badge</Badge>,
  },
  argTypes: {
    type: { table: { disable: true } },
    checked: { table: { disable: true } },
    name: { table: { disable: true } },
  },
  decorators: [
    (Story) => (
      <div className={containerCss}>
        <Story />
      </div>
    ),
  ],
};

export const Profile: Story = {
  args: {
    type: 'profile',
    thumbnailElement: <Thumbnail size="h52" />,
    name: '수미칩',
    onButtonClick: () => alert('profile button clicked'),
  },
  argTypes: {
    category: { table: { disable: true } },
    missionTitle: { table: { disable: true } },
    checked: { table: { disable: true } },
    type: { table: { disable: true } },
  },
  decorators: [
    (Story) => (
      <div className={containerCss}>
        <Story />
      </div>
    ),
  ],
};

export const ProfileLong: Story = {
  args: {
    type: 'profile',
    thumbnailElement: <Thumbnail size="h52" />,
    name: '수미칩수미칩수미칩수미칩수미칩수미칩수미칩수미칩수미칩수미칩수미칩수미칩수미칩수미칩수미칩수미칩',
    onButtonClick: () => alert('profile button clicked'),
  },
  argTypes: {
    category: { table: { disable: true } },
    missionTitle: { table: { disable: true } },
    checked: { table: { disable: true } },
    type: { table: { disable: true } },
  },
  decorators: [
    (Story) => (
      <div className={containerCss}>
        <Story />
      </div>
    ),
  ],
};

export const ProfileFollower: Story = {
  args: {
    type: 'profile-follower',
    thumbnailElement: <Thumbnail size="h52" />,
    name: '수미칩',
    onButtonClick: () => alert('profile follower button clicked'),
  },
  argTypes: {
    category: { table: { disable: true } },
    missionTitle: { table: { disable: true } },
    checked: { table: { disable: true } },
    type: { table: { disable: true } },
  },
  decorators: [
    (Story) => (
      <div className={containerCss}>
        <Story />
      </div>
    ),
  ],
};

export const ProfileFollowerLong: Story = {
  args: {
    type: 'profile-follower',
    thumbnailElement: <Thumbnail size="h52" />,
    name: '짱긴문자열열열열열열열열열열열열열열열열열열열열열열열열열열열',
    onButtonClick: () => alert('profile follower button clicked'),
  },
  argTypes: {
    category: { table: { disable: true } },
    missionTitle: { table: { disable: true } },
    checked: { table: { disable: true } },
    type: { table: { disable: true } },
  },
  decorators: [
    (Story) => (
      <div className={containerCss}>
        <Story />
      </div>
    ),
  ],
};

const containerCss = css({
  maxWidth: '475px',
});

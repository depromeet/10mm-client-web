import Badge from '@/components/Badge/Badge';
import Button from '@/components/Button/Button';
import List from '@/components/List/List';
import Thumbnail from '@/components/Thumbnail/Thumbnail';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Component/List',
  component: List,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: '리스트 요소입니다.',
    docs: {
      description: {
        component: 'Component',
      },
    },
    layout: 'centered',
  },
  args: {},
  argTypes: {},
} satisfies Meta<typeof List>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Category: Story = {
  args: {
    type: 'category',
    imageUrl: '/images/category/exercise.png',
    category: '운동',
    checked: true,
  },
};

export const Mission: Story = {
  args: {
    type: 'mission',
    category: '글쓰기',
    missionTitle: '잠들기 전 오늘 하루 감사일기 쓰기',
    imageUrl: '/images/category/writting.png',
    badgeElement: <Badge color="purple">badge</Badge>,
  },
};

export const Profile: Story = {
  args: {
    type: 'profile',
    thumbnailElement: <Thumbnail variant="null" size="h52" />,
    name: '수미칩',
    buttonElement: (
      <Button size="small" variant="primary">
        팔로우
      </Button>
    ),
  },
};

export const ProfileFollower: Story = {
  args: {
    type: 'profile-follower',
    thumbnailElement: <Thumbnail variant="null" size="h52" />,
    name: '수미칩',
    buttonElement: (
      <Button size="small" variant="secondary">
        삭제
      </Button>
    ),
  },
};

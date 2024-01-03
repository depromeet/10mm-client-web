import Icon from '@/components/Icon';
import OneLineListItem from '@/components/ListItem/OneLineListItem';
import Thumbnail from '@/components/Thumbnail/Thumbnail';
import { css } from '@/styled-system/css';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Component/ListItem/OneLineListItem',
  component: OneLineListItem,
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
} satisfies Meta<typeof OneLineListItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: '운동해야지',
  },
};
export const Long: Story = {
  args: {
    name: '운동해야지운동해야지운동해야지운동해야지운동해야지운동해야지운동해야지운동해야지운동해야지운동해야지',
  },
};

export const CategoryStory = () => {
  return <OneLineListItem.Image name="수미칩" imageUrl="/images/category/exercise.png" />;
};

export const ThumbnailStory = () => {
  return <OneLineListItem.Thumbnail name="수미칩" />;
};

export const RightIcon: Story = {
  args: {
    name: '운동',
    leftElement: <Thumbnail variant="null" size="h36" />,
    rightElement: <Icon name="check-circle" width={24} height={24} color="purple.purple700" />,
  },
};

export const RightIconLone: Story = {
  args: {
    name: '운동해야지운동해야지운동해야지운동해야지운동해야지운동해야지운동해야지',
    leftElement: <Thumbnail variant="null" size="h36" />,
    rightElement: <Icon name="check-circle" width={24} height={24} color="purple.purple700" />,
  },
};

const containerCss = css({
  maxWidth: '375px',
});

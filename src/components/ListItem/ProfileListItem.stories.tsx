import Button from '@/components/Button/Button';
import ProfileListItem from '@/components/ListItem/ProfileListItem';
import { css } from '@/styled-system/css';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Component/ListItem/ProfileListItem',
  component: ProfileListItem,
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
    name: '수미칩',
    variant: 'one-button',
  },
  decorators: [
    (Story) => (
      <div className={containerCss}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProfileListItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: '수미칩',
    buttonElement: (
      <Button size="small" variant="primary">
        팔로우
      </Button>
    ),
  },
};

export const Long: Story = {
  args: {
    name: '수미칩수미칩수미칩수미칩수미칩수미칩수미칩수미칩수미칩',
    buttonElement: (
      <Button size="small" variant="primary">
        팔로우
      </Button>
    ),
  },
};

export const TwoButton: Story = {
  args: {
    name: '수미칩',
    variant: 'two-button',
    buttonElement: (
      <Button size="small" variant="primary">
        팔로우
      </Button>
    ),
    subElement: <span>팔로우</span>,
  },
};

export const TwoButtonLong: Story = {
  args: {
    name: '수미칩수미칩수미칩수미칩수미칩수미칩수미칩수미칩수미칩',
    variant: 'two-button',
    buttonElement: (
      <Button size="small" variant="primary">
        팔로우
      </Button>
    ),
    subElement: <span>팔로우</span>,
  },
};

const containerCss = css({
  maxWidth: '375px',
});

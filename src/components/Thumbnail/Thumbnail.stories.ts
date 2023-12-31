import Thumbnail from '@/components/Thumbnail/Thumbnail';
import type { Meta, StoryObj } from '@storybook/react';

const TEST_THUMBNAIL_IMAGE = '/images/thumbnail-test.png';

const meta = {
  title: 'Component/Thumbnail',
  component: Thumbnail,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: '썸네일 컴포넌트는 프로필 또는 커버 등의 대한 정보를 나타내는 이미지 요소입니다. ',
    docs: {
      description: {
        component: 'Component',
      },
    },
  },
  args: {
    variant: 'null',
    size: 'h52',
    selected: false,
  },
  argTypes: {
    url: {
      control: 'select',
      options: [TEST_THUMBNAIL_IMAGE],
    },
    selected: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Thumbnail>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Null: Story = {
  args: {
    variant: 'null',
  },
};
export const Filled: Story = {
  args: {
    variant: 'filled',
    url: TEST_THUMBNAIL_IMAGE,
  },
};

export const Dimed: Story = {
  args: {
    variant: 'dimed',
    url: TEST_THUMBNAIL_IMAGE,
  },
};

export const SelectedFilled: Story = {
  args: {
    variant: 'filled',
    selected: true,
    url: TEST_THUMBNAIL_IMAGE,
  },
};

export const SelectedNull: Story = {
  args: {
    variant: 'null',
    selected: true,
  },
};

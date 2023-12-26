import { css } from '@/styled-system/css';
import type { Meta, StoryObj } from '@storybook/react';

import Badge from './Badge';

const meta = {
  title: 'Component/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    controls: {
      include: ['color'],
    },
  },
  argTypes: {
    color: {
      control: 'select',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ minWidth: '327px', minHeight: '52px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Purple: Story = {
  args: {
    color: 'purple',
    children: (
      <span
        className={css({
          textStyle: 'body5',
        })}
      >
        badge
      </span>
    ),
  },
};

export const Gray: Story = {
  args: {
    color: 'gray',
    children: (
      <span
        className={css({
          textStyle: 'body5',
        })}
      >
        badge
      </span>
    ),
  },
};

export const Red: Story = {
  args: {
    color: 'red',
    children: (
      <span
        className={css({
          textStyle: 'body5',
        })}
      >
        badge
      </span>
    ),
  },
};

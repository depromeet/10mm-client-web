import SnackBar from '@/components/SnackBar/SnackBar';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Component/SnackBar',
  component: SnackBar,

  tags: ['autodocs'],
} satisfies Meta<typeof SnackBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const None: Story = {
  args: {
    rightAction: 'none',
    message: 'SnackBar',
    id: 'snackbar',
  },
};

export const Icon: Story = {
  args: {
    rightAction: 'icon',
    message: 'SnackBar',
    iconName: 'arrow-forward',
    id: 'snackbar',
    iconAction: () => {},
  },
};

export const TextButton: Story = {
  args: {
    rightAction: 'text-button',
    message: 'SnackBar',
    buttonText: 'Button',
    timerSecond: 100,
    id: 'snackbar',
    buttonAction: () => {},
  },
};

import Button from '@/components/Button/Button';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Example/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CTA: Story = {
  args: {
    size: 'large',
    children: 'CTA Button',
    variant: 'cta',
  },
};

export const Primary: Story = {
  args: {
    size: 'large',
    children: 'Primary Button',
    variant: 'primary',
  },
};

export const SecondaryButton: Story = {
  args: {
    size: 'large',
    children: 'Secondary Button',
    variant: 'secondary',
  },
};

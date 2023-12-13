import Button from '@/components/Button/Button';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Example/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    controls: {
      include: ['variant', 'size', 'children', 'disabled'],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
    },
  },
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
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const SecondaryButton: Story = {
  args: {
    size: 'large',
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

export const GhostButton: Story = {
  args: {
    size: 'large',
    variant: 'ghost',
    children: 'Ghost Button',
  },
};

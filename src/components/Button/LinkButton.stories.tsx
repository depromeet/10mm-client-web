import LinkButton from '@/components/Button/LinkButton';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Component/LinkButton',
  component: LinkButton,
  parameters: {
    layout: 'centered',
    controls: {
      include: ['variant', 'size', 'children', 'disabled'],
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ minWidth: '327px', minHeight: '52px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LinkButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    href: '#',
    size: 'large',
    variant: 'primary',
    children: 'Primary LinkButton',
  },
};

export const CTA: Story = {
  args: {
    href: '#',
    size: 'large',
    children: 'CTA LinkButton',
    variant: 'cta',
  },
};

export const SecondaryButton: Story = {
  args: {
    href: '#',
    size: 'large',
    variant: 'secondary',
    children: 'Secondary LinkButton',
  },
};

export const GhostButton: Story = {
  args: {
    href: '#',
    size: 'large',
    variant: 'ghost',
    children: 'Ghost LinkButton',
  },
};

export const DisabledButton: Story = {
  args: {
    href: '#',
    disabled: true,
    size: 'large',
    variant: 'cta',
    children: 'Disabled LinkButton',
  },
};

export const MediumButton: Story = {
  args: {
    href: '#',
    size: 'medium',
    variant: 'primary',
    children: 'Medium LinkButton',
  },
};

export const SmallButton: Story = {
  args: {
    href: '#',
    size: 'small',
    variant: 'primary',
    children: 'Small LinkButton',
  },
};

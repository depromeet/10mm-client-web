import Button from '@/components/Button/Button';
import type { Meta, StoryObj } from '@storybook/react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Example/Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'large',
    children: 'Default Large Button',
  },
};

export const CTALarge: Story = {
  args: {
    size: 'large',
    children: 'CTA Large Button',
    variant: 'cta',
  },
};

export const PrimaryLarge: Story = {
  args: {
    size: 'large',
    children: 'PrimaryLarge',
    variant: 'primary',
  },
};

export const SecondaryLargeButton: Story = {
  args: {
    size: 'large',
    children: 'SecondaryLargeButton',
    variant: 'secondary',
  },
};

export const CTAMedium: Story = {
  args: {
    size: 'medium',
    children: 'CTA Large Button',
    variant: 'cta',
  },
};

export const PrimaryMedium: Story = {
  args: {
    size: 'medium',
    children: 'PrimaryMedium',
    variant: 'primary',
  },
};

export const SecondaryMediumButton: Story = {
  args: {
    size: 'medium',
    children: 'SecondaryMediumButton',
    variant: 'secondary',
  },
};

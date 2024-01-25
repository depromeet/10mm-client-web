import { type ComponentProps } from 'react';
import { LEVEL_SYSTEM } from '@/constants/level';
import { flex } from '@/styled-system/patterns';
import type { Meta, StoryObj } from '@storybook/react';

import CardLevel from './CardLevel';

type Props = Pick<ComponentProps<typeof CardLevel>, 'isSelected' | 'isLocked'>;

const CardLevelStory = (args: Props) => {
  return (
    <div className={flex({ gap: '14px' })}>
      {LEVEL_SYSTEM.map((level) => (
        <CardLevel key={level.level} level={level.level} {...args} />
      ))}
    </div>
  );
};

const meta = {
  title: 'Component/Banner/CardLevel',
  component: CardLevelStory,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    isLocked: false,
    isSelected: false,
  },
  // argTypes: {
  //   type: { table: { disable: true } },
  // },
} satisfies Meta<typeof CardLevel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isLocked: false,
    isSelected: false,
  },
};

export const Locked: Story = {
  args: {
    isLocked: true,
    isSelected: false,
  },
};

export const Selected: Story = {
  args: {
    isLocked: false,
    isSelected: true,
  },
};

export const LockedSelect: Story = {
  args: {
    isLocked: true,
    isSelected: true,
  },
};

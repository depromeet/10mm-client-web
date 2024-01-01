import React from 'react';
import Tab from '@/components/Tab/Tab';
import type { Meta, StoryObj } from '@storybook/react';

const TabStory = (arg: { Tabs: { tabName: string; active: boolean }[] }) => <Tab {...arg} />;

const meta: Meta = {
  title: 'Component/Tab',
  component: TabStory,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    Tabs: [
      { tabName: 'Tab 1', active: true },
      { tabName: 'Tab 2', active: false },
      { tabName: 'Tab 3', active: false },
    ],
  },
};

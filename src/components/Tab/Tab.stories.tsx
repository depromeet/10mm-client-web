import { type ComponentProps } from 'react';
import Tab from '@/components/Tab/Tab';
import { useTab } from '@/components/Tab/Tab.hooks';
import type { Meta, StoryObj } from '@storybook/react';

const TabStory = (arg: ComponentProps<typeof Tab>) => <Tab {...arg} />;

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
    tabs: [
      {
        id: 'Tab1',
        tabName: 'Tab1',
      },
      {
        id: 'Tab2',
        tabName: 'Tab2',
      },
      {
        id: 'Tab3',
        tabName: 'Tab3',
      },
    ],
    activeTab: 'Tab1',
    onTabClick: (id: string) => {
      console.log(id);
    },
  },
};

export const ActiveTab = () => {
  const props = useTab([
    {
      id: 'Tab1',
      tabName: 'Tab1',
    },
    {
      id: 'Tab2',
      tabName: 'Tab2',
    },
    {
      id: 'Tab3',
      tabName: 'Tab3',
    },
  ]);

  return <Tab {...props} />;
};

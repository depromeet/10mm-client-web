import { useState } from 'react';
import AppBarBottom from '@/components/AppBarBottom/AppBarBottom';
import AppBarBottomView from '@/components/AppBarBottom/AppBarBottomVIew';
import type { Meta } from '@storybook/react';

const meta = {
  title: 'Component/AppBarBottom',
  component: AppBarBottom,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ minHeight: '140px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AppBarBottom>;

export default meta;

export const Default = () => {
  const [current, setCurrent] = useState('home');

  return <AppBarBottomView current={current} onClick={(item) => setCurrent(item.key)} />;
};

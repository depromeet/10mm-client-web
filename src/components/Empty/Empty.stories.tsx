import Empty from '@/components/Empty/Empty';
import { flex, stack } from '@/styled-system/patterns';
import type { Meta, StoryObj } from '@storybook/react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function EmptyStory(props: any) {
  return (
    <div className={flex({ gap: '8px' })}>
      <div className={stack({ alignItems: 'center', color: 'white' })}>
        <span>suggest</span>
        <Empty type="suggest" link="#" buttonText="button" {...props} />
      </div>
      <div className={stack({ alignItems: 'center', color: 'white' })}>
        <span>notice</span>
        <Empty type="notice" {...props} />
      </div>
      <div className={stack({ alignItems: 'center', color: 'white' })}>
        <span>refresh</span>
        <Empty type="refresh" />
      </div>
    </div>
  );
}

const meta = {
  title: 'Component/Empty',
  component: EmptyStory,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    title: '타이틀',
    description: '디스크립션을 작성해 주세요.',
    image: 'docs',
  },
} satisfies Meta<typeof Empty>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

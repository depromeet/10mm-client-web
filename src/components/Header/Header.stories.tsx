import Header from '@/components/Header/Header';
import IconComponent from '@/components/Icon';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Component/Header',
  component: Header,
  tags: ['autodocs'],
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const None: Story = {
  args: {
    rightAction: 'none',
    title: '타이틀',
    onBackAction: () => alert('back button click'),
  },
};

export const TextButton: Story = {
  args: {
    rightAction: 'text-button',
    title: '타이틀',
    onBackAction: () => alert('back button click'),
  },
};

export const Icon: Story = {
  args: {
    title: '타이틀',
    rightAction: 'icon',
  },
};
export const Custom: Story = {
  args: {
    title: '타이틀',
    rightAction: 'custom',
    rightElement: (
      <div style={{ display: 'flex', marginRight: '8px' }}>
        <div style={{ padding: '10px' }}>
          <IconComponent name={'menu'} width={20} height={20} />
        </div>
        <div style={{ padding: '10px' }}>
          <IconComponent name={'plus'} width={20} height={20} />
        </div>
      </div>
    ),
  },
};

export const IconMenu = (
  args = {
    title: '타이틀',
    rightAction: 'icon',
  },
) => {
  const menus = [
    {
      id: 'menu1',
      label: '메뉴1',
    },
    {
      id: 'menu2',
      label: '메뉴2',
    },
    {
      id: 'menu3',
      label: '메뉴3',
    },
  ];

  const onMenuClick = (id: string) => {
    alert(id);
  };
  return (
    <div>
      <Header title={args.title} rightAction={'icon-menu'} menus={menus} onMenuClick={onMenuClick} />
    </div>
  );
};

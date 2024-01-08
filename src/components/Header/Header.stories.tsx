import Header from '@/components/Header/Header';
import { Menu } from '@/components/Menu';
import useModal from '@/hooks/useModal';
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
  const { isOpen, closeModal, openModal } = useModal();
  const onMenuClick = (id: string) => {
    alert(id);
  };
  return (
    <div>
      <Menu menus={menus} onMenuClick={onMenuClick} onClose={closeModal} isOpen={isOpen}>
        <Header
          title={args.title}
          rightAction={'icon'}
          onIconClick={() => {
            openModal();
          }}
        />
      </Menu>
    </div>
  );
};

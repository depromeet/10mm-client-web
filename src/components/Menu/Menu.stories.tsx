import Button from '@/components/Button/Button';
import Menu from '@/components/Menu/Menu';
import MenuContent from '@/components/Menu/MenuContent';
import { type MenuItemProps } from '@/components/Menu/MenuItem';
import useModal from '@/hooks/useModal';
import type { Meta } from '@storybook/react';

const MenuStory = (arg: { menus: MenuItemProps[]; topOffset: number; leftOffset: number }) => {
  const { menus } = arg;
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <div>
      <Menu menus={menus} isOpen={isOpen} onClose={closeModal}>
        <Button size={'large'} variant={'primary'} onClick={openModal}>
          Open Modal
        </Button>
      </Menu>
    </div>
  );
};

const meta = {
  title: 'Component/Menu',
  component: MenuStory,

  args: {
    menus: [
      {
        id: 'menu1',
        label: '메뉴1',
        onClick: () => {
          alert('메뉴1');
        },
      },
      {
        id: 'menu2',
        label: '메뉴2',
        onClick: () => {
          alert('메뉴2');
        },
      },
      {
        id: 'menu3',
        label: '메뉴3',
        onClick: () => {
          alert('메뉴3');
        },
      },
    ],
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MenuStory>;

export default meta;

export const Default = {
  arguments: {
    menus: [
      {
        label: '메뉴1',
        onClick: () => {},
      },
      {
        label: '메뉴2',
        onClick: () => {},
      },
      {
        label: '메뉴3',
        onClick: () => {},
      },
    ],
  },
};

export const Content = (arg: { menus: MenuItemProps[] }) => {
  return <MenuContent menus={arg.menus} />;
};

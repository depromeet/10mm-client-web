import { useRef } from 'react';
import Button from '@/components/Button/Button';
import Menu from '@/components/Menu/Menu';
import MenuContent from '@/components/Menu/MenuContent';
import { type MenuItemProps } from '@/components/Menu/MenuItem';
import useModal from '@/hooks/useModal';
import type { Meta } from '@storybook/react';

const MenuStory = (arg: { menus: MenuItemProps[]; topOffset: number; leftOffset: number }) => {
  const { menus, topOffset, leftOffset } = arg;
  const { isOpen, openModal, closeModal } = useModal();
  const anchorRef = useRef(null);

  return (
    <div>
      <Button ref={anchorRef} size={'large'} variant={'primary'} onClick={openModal}>
        Open Modal
      </Button>
      <Menu
        anchorRef={anchorRef}
        offset={{
          topOffset,
          leftOffset,
        }}
        menus={menus}
        isOpen={isOpen}
        onClose={closeModal}
      />
    </div>
  );
};

const meta = {
  title: 'Component/Menu',
  component: MenuStory,

  args: {
    topOffset: 30,
    leftOffset: 30,

    menus: [
      {
        id: 'menu1',
        label: '메뉴1',
        onClick: () => {},
      },
      {
        id: 'menu2',
        label: '메뉴2',
        onClick: () => {},
      },
      {
        id: 'menu3',
        label: '메뉴3',
        onClick: () => {},
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

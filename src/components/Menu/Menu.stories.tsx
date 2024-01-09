import { type ComponentProps } from 'react';
import Button from '@/components/Button/Button';
import Menu from '@/components/Menu/Menu';
import MenuContent from '@/components/Menu/MenuContent';
import useModal from '@/hooks/useModal';
import type { Meta } from '@storybook/react';

const MenuStory = (arg: ComponentProps<typeof Menu>) => {
  const { menus, onMenuClick, offsetTop, offsetRight } = arg;
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <div>
      <Menu
        menus={menus}
        onMenuClick={onMenuClick}
        isOpen={isOpen}
        onClose={closeModal}
        offsetRight={offsetRight}
        offsetTop={offsetTop}
      >
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
      },
      {
        id: 'menu2',
        label: '메뉴2',
      },
      {
        id: 'menu3',
        label: '메뉴3',
      },
    ],
    onMenuClick: (id: string) => {
      alert(id);
    },
    offsetTop: 4,
    offsetRight: 8,
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MenuStory>;

export default meta;

export const Default = {
  arguments: {
    menus: [
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
    ],
  },
  onMenuClick: (id: string) => {
    alert(id);
  },
  offsetTop: 4,
  offsetRight: 8,
};

export const Content = (arg: ComponentProps<typeof MenuContent>) => {
  return <MenuContent {...arg} />;
};

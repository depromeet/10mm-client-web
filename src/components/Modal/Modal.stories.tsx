import Button from '@/components/Button/Button';
import Modal from '@/components/Modal/Modal';
import useModal from '@/hooks/useModal';
import type { Meta, StoryObj } from '@storybook/react';
import { css } from '@styled-system/css';

const ModalStory = () => {
  const { isOpen, openModal, closeModal } = useModal();
  return (
    <div>
      <Button size={'large'} variant={'cta'} onClick={openModal}>
        Open Modal
      </Button>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <div
          className={css({
            textStyle: 'title3',
            color: 'text.primary',
          })}
        >
          모달입니다
        </div>
      </Modal>
    </div>
  );
};

const meta = {
  title: 'Component/Modal',
  component: ModalStory,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ModalStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

import Button from '@/components/Button/Button';
import Dialog from '@/components/Dialog/Dialog';
import { type DefaultDialogProps } from '@/components/Dialog/Dialog.types';
import useModal from '@/hooks/useModal';
import type { Meta, StoryObj } from '@storybook/react';

const DialogStory = (arg: Pick<DefaultDialogProps, 'title' | 'content' | 'cancelText' | 'confirmText'>) => {
  const { isOpen, openModal, closeModal } = useModal();
  return (
    <div>
      <Button size={'large'} variant={'cta'} onClick={openModal}>
        Open Dialog
      </Button>
      <Dialog variant={'default'} isOpen={isOpen} onClose={closeModal} {...arg} />
    </div>
  );
};

const meta = {
  title: 'Component/Dialog',
  component: DialogStory,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DialogStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Modal Title',
    content: 'Modal Content',
    cancelText: '취소',
    confirmText: '확인',
  },
};

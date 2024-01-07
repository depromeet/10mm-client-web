import Dialog from '@/components/Dialog/Dialog';
import { type ModalProps } from '@/components/Modal/Modal';

function LogoutDialog(props: ModalProps) {
  // TODO : logout 동작
  const onLogout = () => {};

  return (
    <Dialog
      variant={'default'}
      isOpen={props.isOpen}
      onClose={props.onClose}
      title="로그아웃 하시겠어요?"
      cancelText="취소"
      confirmText="로그아웃"
      onConfirm={onLogout}
    />
  );
}

export default LogoutDialog;

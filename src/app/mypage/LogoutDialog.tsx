import { useRouter } from 'next/navigation';
import Dialog from '@/components/Dialog/Dialog';
import { type ModalProps } from '@/components/Modal/Modal';
import { ROUTER } from '@/constants/router';
import { removeTokens } from '@/services/auth/actions';

function LogoutDialog(props: ModalProps) {
  const router = useRouter();
  // TODO : logout 동작
  const onLogout = async () => {
    await removeTokens();
    router.replace(ROUTER.AUTH.LOGIN);
  };

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

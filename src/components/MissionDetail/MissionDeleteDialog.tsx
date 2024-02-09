import React from 'react';
import { useRouter } from 'next/navigation';
import { useDeleteMissionMutation } from '@/apis/mission';
import Dialog from '@/components/Dialog/Dialog';
import { useSnackBar } from '@/components/SnackBar/SnackBarProvider';
import { ROUTER } from '@/constants/router';
import { type UseModalReturn } from '@/hooks/useModal';

interface Props extends Omit<UseModalReturn, 'openModal'> {
  successRoutePath: string;
  missionId: string;
}

function MissionDeleteDialog(props: Props) {
  const router = useRouter();
  const { triggerSnackBar } = useSnackBar();

  const { mutate: missionDeleteMutate } = useDeleteMissionMutation(props.missionId, {
    onSuccess: () => {
      router.replace(props.successRoutePath ?? ROUTER.HOME);
    },
    onError: () => {
      triggerSnackBar({ message: '미션 삭제에 실패했습니다. 다시 시도해주세요.' });
    },
  });

  return (
    <Dialog
      variant={'default'}
      isOpen={props.isOpen}
      onClose={props.closeModal}
      onConfirm={missionDeleteMutate}
      onCancel={props.closeModal}
      title="정말 삭제하시겠어요?"
      content="미션을 삭제하면 그동안의 기록들이 사라져요."
      confirmText="삭제"
      cancelText="취소"
    />
  );
}

export default MissionDeleteDialog;

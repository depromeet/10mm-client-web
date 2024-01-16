import { useRouter } from 'next/navigation';
import APIS from '@/apis';
import { isSeverError } from '@/apis/instance.api';
import { useSnackBar } from '@/components/SnackBar/SnackBarProvider';
import { ROUTER } from '@/constants/router';
import { useMutation } from '@tanstack/react-query';

const useCreateMissionMutation = () => {
  const router = useRouter();
  const { triggerSnackBar } = useSnackBar();

  return useMutation({
    mutationFn: APIS.createMission,
    onSuccess: () => {
      router.replace(ROUTER.HOME);
    },
    onError: (error) => {
      console.error('error: ', error);
      if (isSeverError(error)) {
        triggerSnackBar({
          message: error.data.message,
        });
        return;
      }
    },
  });
};

export default useCreateMissionMutation;

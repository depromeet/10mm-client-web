import { useRouter } from 'next/navigation';
import APIS from '@/apis';
import { ROUTER } from '@/constants/router';
import { useMutation } from '@tanstack/react-query';

const useCreateMissionMutation = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: APIS.createMission,
    onSuccess: () => {
      router.push(ROUTER.HOME);
    },
    onError: () => {
      // TODO: error handling
    },
  });
};

export default useCreateMissionMutation;

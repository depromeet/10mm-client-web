import { useRouter } from 'next/navigation';
import APIS from '@/apis';
import { ROUTER } from '@/constants/router';
import { eventLogger } from '@/utils';
import { useMutation } from '@tanstack/react-query';

const useRecordTime = (missionId: string) => {
  const router = useRouter();

  return useMutation({
    mutationFn: APIS.recordTime,
    onSuccess: () => {
      router.replace(ROUTER.MISSION.RECORD(missionId));
      eventLogger.logEvent('api/record-time', 'stopwatch', missionId);
    },
    onError: () => {
      // TODO: error handling
    },
  });
};

export default useRecordTime;

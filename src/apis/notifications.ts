import useMutationHandleError from '@/hooks/query/useMutationHandleError';
import { type UseMutationOptions } from '@tanstack/react-query';

import apiInstance from './instance.api';

interface NotifyUrgingRequest {
  /**
   * 미션 ID
   */
  missionId: number;
}

const NOTIFICATION_APIS = {
  // POST /notifications/urging - 재촉하기
  notifyUrging: (data: NotifyUrgingRequest) => {
    return apiInstance.post('/notifications/urging', data);
  },
};

const NOTIFICATION_MISSIONS_APIS = {
  // POST /notifications/missions/remind - 미션 알림
  remind: (seconds: number) => {
    return apiInstance.post('/notifications/missions/remind', { seconds });
  },
};

export default NOTIFICATION_APIS;
export { NOTIFICATION_MISSIONS_APIS };

export const useNotifyUrging = (options?: UseMutationOptions<unknown, unknown, NotifyUrgingRequest>) => {
  return useMutationHandleError({
    mutationFn: NOTIFICATION_APIS.notifyUrging,
    ...options,
  });
};

export const useRemind = (options?: UseMutationOptions<unknown, unknown, number>) => {
  return useMutationHandleError({
    mutationFn: NOTIFICATION_MISSIONS_APIS.remind,
    ...options,
  });
};

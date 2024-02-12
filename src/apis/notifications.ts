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

export default NOTIFICATION_APIS;

export const useNotifyUrging = (options?: UseMutationOptions<unknown, unknown, NotifyUrgingRequest>) => {
  return useMutationHandleError({
    mutationFn: NOTIFICATION_APIS.notifyUrging,
    ...options,
  });
};

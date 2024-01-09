import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import apiInstance from './instance.api';

interface RecordTimeRequest {
  missionId: string;
  startedAt: string;
  finishedAt: string;
  durationMin: number;
  durationSec: number;
}

interface RecordTimeResponse {
  data: {
    data: number;
  };
}

const STOPWATCH_APIS = {
  recordTime: (request: RecordTimeRequest): Promise<RecordTimeResponse> => {
    return apiInstance.post('/records', request);
  },
};

export default STOPWATCH_APIS;

export const useRecordTime = (options?: UseMutationOptions<RecordTimeResponse, unknown, RecordTimeRequest>) =>
  useMutation({ mutationFn: STOPWATCH_APIS.recordTime, ...options });

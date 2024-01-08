import apiInstance from './instance.api';

interface RecordTimeRequest {
  missionId: string;
  startedAt: string;
  finishedAt: string;
  durationMin: number;
  durationSec: number;
}

const STOPWATCH_APIS = {
  recordTime: (data: RecordTimeRequest) => {
    return apiInstance.post('/records', {
      ...data,
    });
  },
};

export default STOPWATCH_APIS;

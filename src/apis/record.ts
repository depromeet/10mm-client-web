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

// TODO : 이동
type ImageFileExtensionType = 'JPG' | 'JPEG' | 'PNG';

interface UploadUrlRequest {
  missionRecordId: string;
  imageFileExtension: ImageFileExtensionType;
}

interface UploadUrlResponse {
  data: {
    presignedUrl: string;
  };
}

interface UploadCompleteRequest {
  missionRecordId: string;
  imageFileExtension: string;
  remark: string;
}

interface UploadCompleteResponse {}

const STOPWATCH_APIS = {
  recordTime: (request: RecordTimeRequest): Promise<RecordTimeResponse> => {
    return apiInstance.post('/records', request);
  },
  uploadUrl: (request: UploadUrlRequest): Promise<UploadUrlResponse> => {
    return apiInstance.post('/records/upload-url', request);
  },
  uploadComplete: (request: UploadCompleteRequest): Promise<UploadCompleteResponse> => {
    return apiInstance.post('/records/upload-complete', request);
  },
};

export default STOPWATCH_APIS;

export const useRecordTime = (options?: UseMutationOptions<RecordTimeResponse, unknown, RecordTimeRequest>) =>
  useMutation({ mutationFn: STOPWATCH_APIS.recordTime, ...options });

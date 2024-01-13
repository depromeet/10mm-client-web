import { createQueryKeyFactory } from '@/apis/createQueryKeyFactory';
import { type ImageFileExtensionType, type RecordType } from '@/apis/schema/record';
import { useMutation, type UseMutationOptions, type UseQueryOptions, useSuspenseQuery } from '@tanstack/react-query';

import apiInstance from './instance.api';

interface RecordTimeRequest {
  missionId: string;
  startedAt: string;
  finishedAt: string;
  durationMin: number;
  durationSec: number;
}

interface RecordTimeResponse {
  missionId: string;
}

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

type GetRecordsParams = {
  missionId: number;
  yearMonth: string;
};

type GetRecordsResponse = RecordType[];

const RECORD_API = {
  getRecords: async (params: GetRecordsParams) => {
    const { data } = await apiInstance.get<GetRecordsResponse>('/records', {
      params,
    });
    return data;
  },
  recordTime: async (request: RecordTimeRequest): Promise<RecordTimeResponse> => {
    const { data } = await apiInstance.post('/records', request);
    return data;
  },
  uploadUrl: (request: UploadUrlRequest): Promise<UploadUrlResponse> => {
    return apiInstance.post('/records/upload-url', request);
  },
  uploadComplete: (request: UploadCompleteRequest): Promise<UploadCompleteResponse> => {
    return apiInstance.post('/records/upload-complete', request);
  },
};

export default RECORD_API;

const getRecordQueryKey = createQueryKeyFactory<GetRecordsParams>('record');

export const useGetRecord = (params: GetRecordsParams, option?: UseQueryOptions<GetRecordsResponse>) => {
  return useSuspenseQuery({
    queryKey: getRecordQueryKey(params),
    queryFn: () => RECORD_API.getRecords(params),
    ...option,
  });
};

export const useRecordTime = (options?: UseMutationOptions<RecordTimeResponse, unknown, RecordTimeRequest>) =>
  useMutation({ mutationFn: RECORD_API.recordTime, ...options });

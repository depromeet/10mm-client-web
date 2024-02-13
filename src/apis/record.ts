import getQueryKey from '@/apis/getQueryKey';
import { type RecordType } from '@/apis/schema/record';
import { type ImageFileExtensionType, type UploadBaseRequest } from '@/apis/schema/upload';
import useMutationHandleError from '@/hooks/query/useMutationHandleError';
import {
  useMutation,
  type UseMutationOptions,
  useQuery,
  type UseQueryOptions,
  useSuspenseQuery,
} from '@tanstack/react-query';

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

interface UploadUrlRequest extends UploadBaseRequest {
  missionRecordId: string;
}

interface UploadUrlResponse {
  data: {
    presignedUrl: string;
  };
}

interface UploadCompleteRequest {
  missionRecordId: string;
  imageFileExtension: ImageFileExtensionType;
  remark: string;
}

interface UploadCompleteResponse {}

type GetRecordsParams = {
  missionId: number;
  yearMonth: string;
};

interface GetRecordsResponse {
  missionFinishedAt: string;
  missionStartedAt: string;
  missionRecords: RecordType[];
  urgingStatus: UrgingStatus;
}

type GetRecordDetailResponse = RecordType & {
  sinceDay: number;
  duration: number;
};

export enum UrgingStatus {
  NONE = 'NONE',
  URGING = 'URGING',
}

interface StatisticTimeTable {
  symbolStack: number;
  durationMinute: number;
  startedAt: string;
  finishedAt: string;
}

interface RecordStatisticsResponse {
  totalMissionHour: number;
  totalMissionMinute: number;
  totalSymbolStack: number;
  continuousSuccessDay: number;
  totalSuccessDay: number;
  totalMissionAttainRate: number;
  startedAt: string;
  finishedAt: string;
  timeTable: StatisticTimeTable[];
}

const RECORD_API = {
  getRecords: async (params: GetRecordsParams) => {
    const { data } = await apiInstance.get<GetRecordsResponse>('/records', {
      params,
    });
    return data;
  },
  getRecordDetail: async (recordId: string) => {
    const { data } = await apiInstance.get<GetRecordDetailResponse>(`/records/${recordId}`);
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

  updateRemark: (recordId: string) => async (request: { remark: string }) => {
    const { data } = await apiInstance.put(`/records/${recordId}`, request);
    return data;
  },
  deleteInProgressRecord: async () => {
    return apiInstance.delete('/records/in-progress');
  },

  getRecordsStatistics: async (missionId: number) => {
    const { data } = await apiInstance.get<RecordStatisticsResponse>(`/records/statistics/${missionId}`);
    return data;
  },
};

export default RECORD_API;

export const useGetRecordsStatistics = (missionId: number, option?: UseQueryOptions<RecordStatisticsResponse>) => {
  return useQuery({
    queryKey: getQueryKey('recordStatistics', { missionId }),
    queryFn: () => RECORD_API.getRecordsStatistics(missionId),
    ...option,
  });
};

export const useGetRecord = (params: GetRecordsParams, option?: UseQueryOptions<GetRecordsResponse>) => {
  return useQuery({
    queryKey: getQueryKey('record', params),
    queryFn: () => RECORD_API.getRecords(params),
    enabled: !!params.missionId && !!params.yearMonth,
    ...option,
  });
};

export const useGetRecordDetail = (recordId: string, option?: UseQueryOptions<GetRecordDetailResponse>) => {
  return useSuspenseQuery({
    queryKey: getQueryKey('recordDetail', { recordId }),
    queryFn: () => RECORD_API.getRecordDetail(recordId),

    ...option,
  });
};

export const useRecordTime = (options?: UseMutationOptions<RecordTimeResponse, unknown, RecordTimeRequest>) =>
  useMutationHandleError(
    { mutationFn: RECORD_API.recordTime, ...options },
    {
      offset: 'appBar',
    },
  );

export const useUpdateRemarkMutation = (
  recordId: string,
  options?: UseMutationOptions<
    { recordId: number },
    unknown,
    {
      remark: string;
    }
  >,
) => {
  return useMutation({
    mutationFn: RECORD_API.updateRemark(recordId),
    ...options,
  });
};

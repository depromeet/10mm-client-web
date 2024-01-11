import { createQueryKeyFactory } from '@/apis/createQueryKeyFactory';
import apiInstance from '@/apis/instance.api';
import { type RecordType } from '@/apis/schema/record';
import { type UseQueryOptions, useSuspenseQuery } from '@tanstack/react-query';

type GetRecordsParams = {
  missionId: number;
  yearMonth: string;
};

type GetRecordsResponse = RecordType[];

type GetRecordDetailResponse = RecordType & {
  sinceDay: number;
  duration: number;
};

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
};

const getRecordQueryKey = createQueryKeyFactory<GetRecordsParams>('record');

export const useGetRecord = (params: GetRecordsParams, option?: UseQueryOptions<GetRecordsResponse>) => {
  return useSuspenseQuery({
    queryKey: getRecordQueryKey(params),
    queryFn: () => RECORD_API.getRecords(params),
    ...option,
  });
};

export const useGetRecordDetail = (recordId: string, option?: UseQueryOptions<GetRecordDetailResponse>) => {
  return useSuspenseQuery({
    queryKey: ['recordDetail', recordId],
    queryFn: () => RECORD_API.getRecordDetail(recordId),
    ...option,
  });
};

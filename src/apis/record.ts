import { createQueryKeyFactory } from '@/apis/createQueryKeyFactory';
import apiInstance from '@/apis/instance.api';
import { type RecordType } from '@/apis/schema/record';
import { type UseQueryOptions, useSuspenseQuery } from '@tanstack/react-query';

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
};

const getRecordQueryKey = createQueryKeyFactory<GetRecordsParams>('record');

export const useGetRecord = (params: GetRecordsParams, option?: UseQueryOptions<GetRecordsResponse>) => {
  return useSuspenseQuery({
    queryKey: getRecordQueryKey(params),
    queryFn: () => RECORD_API.getRecords(params),
    ...option,
  });
};

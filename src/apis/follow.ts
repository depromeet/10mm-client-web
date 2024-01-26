import apiInstance from '@/apis/instance.api';

export const FOLLOW_API = {
  addFollow: async (targetId: number) => {
    const { data } = await apiInstance.post(`/follows`, { targetId });
    return data;
  },
  deleteFollow: async (targetId: number) => {
    const { data } = await apiInstance.delete(`/follows`, { data: { targetId } });
    return data;
  },
};

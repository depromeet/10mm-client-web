import { useEffect, useState } from 'react';
import { useGetMembersMe } from '@/apis/member';
import { type FollowerMemberWithStatusType } from '@/apis/schema/member';
import { sorFollowerList } from '@/pages/profile/[id]/follows/index.utils';

export const useViewList = (list: FollowerMemberWithStatusType[]) => {
  const myId = useGetMeId();
  const [viewList, setViewList] = useState(list);

  const onUpdateItem = (member: FollowerMemberWithStatusType) => {
    setViewList((prev) => prev.map((item) => (item.memberId === member.memberId ? member : item)));
  };

  useEffect(() => {
    const sortList = sorFollowerList(list, Number(myId));
    setViewList(sortList);
  }, []);

  return { list: viewList, onUpdateItem };
};

/**
 * @description 현재 로그인한 사용자의 memberId를 가져옵니다.
 * @returns {number} memberId
 */
export const useGetMeId = () => {
  const { data } = useGetMembersMe();
  const memberId = data?.memberId ?? 0;
  return memberId;
};

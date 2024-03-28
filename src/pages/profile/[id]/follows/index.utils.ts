import { type FollowerMemberWithStatusType, FollowStatus } from '@/apis/schema/member';

export const sorFollowerList = (list: FollowerMemberWithStatusType[], myId: number): FollowerMemberWithStatusType[] => {
  // 1순위) 내 계정, 내가 팔로잉 중인 계정, 내가 팔로우 중이지 않은 계정 순으로 리스트 나열
  // 2순위) 가나다 순, ABC순으로 나열

  const myAccount = list.filter((item) => item.memberId === myId);

  const _list = list.filter((item) => item.memberId !== myId);
  const followingList = _list.filter((item) => item.followStatus === FollowStatus.FOLLOWING);
  const followedByMeList = _list.filter((item) => item.followStatus === FollowStatus.FOLLOWED_BY_ME);
  const notFollowingList = _list.filter((item) => item.followStatus === FollowStatus.NOT_FOLLOWING);

  const sortedList = [...myAccount, ...followingList, ...followedByMeList, ...notFollowingList];

  return sortedList;
};

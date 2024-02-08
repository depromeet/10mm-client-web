import Link from 'next/link';
import { useAddFollow } from '@/apis/follow';
import { type FollowerMemberWithStatusType, FollowStatus } from '@/apis/schema/member';
import { useViewList } from '@/app/profile/[id]/follows/index.hooks';
import { ProfileListItem } from '@/components/ListItem';
import { stagger } from '@/components/Motion/Motion.constants';
import StaggerWrapper from '@/components/Motion/StaggerWrapper';
import { ROUTER } from '@/constants/router';
import { css } from '@/styled-system/css';

interface Props {
  list: FollowerMemberWithStatusType[];
  refetch: () => void;
}

function MyFollowerList(props: Props) {
  const { list, onUpdateItem } = useViewList(props.list);

  return (
    <StaggerWrapper wrapperOverrideCss={containerCss} staggerVariants={stagger(0.1)}>
      {list.map((item) => (
        <Item
          key={`${item.memberId}-${item.followStatus}`}
          item={item}
          onUpdateItem={(_item) => {
            onUpdateItem(_item);
            props.refetch();
          }}
        />
      ))}
    </StaggerWrapper>
  );
}

export default MyFollowerList;

interface ItemProps {
  item: FollowerMemberWithStatusType;
  onUpdateItem: (member: FollowerMemberWithStatusType) => void;
}

function Item({ item, onUpdateItem }: ItemProps) {
  const { mutate } = useAddFollow({
    onSuccess: () => {
      onUpdateItem({ ...item, followStatus: FollowStatus.FOLLOWING });
    },
  });

  const isFollowing = item.followStatus === FollowStatus.FOLLOWING;

  return (
    <Link key={item.memberId} href={ROUTER.PROFILE.DETAIL(item.memberId)}>
      <ProfileListItem
        variant={isFollowing ? 'one-button' : 'two-button'}
        subElement={
          !isFollowing && (
            <span className={followLabelCss} onClick={() => mutate(item.memberId)}>
              팔로우
            </span>
          )
        }
        buttonElement={
          // TODO : 삭제 버튼 추가 필요 (맞팔 관계 팔로우 삭제, 맞팔 x, 팔로워 관계 삭제)
          // 일정 상 무리라고 판단 (2/6) 추후 수정
          <div></div>
        }
        thumbnailUrl={item.profileImageUrl}
        name={item.nickname}
      />
    </Link>
  );
}

const containerCss = css({
  padding: '16px',
});

const followLabelCss = css({
  padding: '8px 12px',
});

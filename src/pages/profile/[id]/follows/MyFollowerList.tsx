import Link from 'next/link';
import { useAddFollow } from '@/apis/follow';
import { type FollowerMemberWithStatusType, FollowStatus } from '@/apis/schema/member';
import { ProfileListItem } from '@/components/ListItem';
import { stagger } from '@/components/Motion/Motion.constants';
import StaggerWrapper from '@/components/Motion/StaggerWrapper';
import { ROUTER } from '@/constants/router';
import { useViewList } from '@/pages/profile/[id]/follows/index.hooks';
import { css } from '@/styled-system/css';

interface Props {
  list: FollowerMemberWithStatusType[];
  refetch: () => void;
}

function MyFollowerList(props: Props) {
  const { list, onUpdateItem } = useViewList(props.list);

  return (
    <StaggerWrapper wrapperOverrideCss={containerCss} staggerVariants={stagger(0.02)}>
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
  const isFollowing = item.followStatus === FollowStatus.FOLLOWING;

  return (
    <Link key={item.memberId} href={ROUTER.PROFILE.DETAIL(item.memberId)}>
      {isFollowing ? <MutualFollowingItem item={item} /> : <FollowerItem item={item} onUpdateItem={onUpdateItem} />}
    </Link>
  );
}

function FollowerItem({ item, onUpdateItem }: ItemProps) {
  const { mutate } = useAddFollow({
    onSuccess: () => {
      onUpdateItem({ ...item, followStatus: FollowStatus.FOLLOWING });
    },
  });

  return (
    <ProfileListItem
      variant={'two-button'}
      thumbnailUrl={item.profileImageUrl}
      name={item.nickname}
      subElement={
        <span className={followLabelCss} onClick={() => mutate(item.memberId)}>
          팔로우
        </span>
      }
      buttonElement={
        // TODO : 삭제 버튼 추가 필요 (맞팔 관계 팔로우 삭제, 맞팔 x, 팔로워 관계 삭제)
        // 일정 상 무리라고 판단 (2/6) 추후 수정
        <div></div>
      }
    />
  );
}

/**
 * @description 맞팔
 */
function MutualFollowingItem({ item }: Pick<ItemProps, 'item'>) {
  return (
    <ProfileListItem
      variant={'one-button'}
      thumbnailUrl={item.profileImageUrl}
      name={item.nickname}
      buttonElement={
        // TODO : 삭제 버튼 추가 필요 (맞팔 관계 팔로우 삭제, 맞팔 x, 팔로워 관계 삭제)
        // 일정 상 무리라고 판단 (2/6) 추후 수정
        <div></div>
      }
    />
  );
}

const containerCss = css({
  padding: '16px',
});

const followLabelCss = css({
  padding: '8px 12px',
});

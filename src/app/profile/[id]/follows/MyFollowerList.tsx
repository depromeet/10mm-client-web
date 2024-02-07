import Link from 'next/link';
import { type FollowerMemberWithStatusType } from '@/apis/schema/member';
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
  // const onFollowerDelete = () => {
  //   // TODO : 삭제 버튼 클릭 시 삭제 처리
  //   props.refetch();
  // };

  // // 맞팔 관계 팔로우 삭제
  // const onDeleteFollowByMe = () => {
  //   onFollowerDelete();
  // };

  // // 맞팔 x, 팔로워 관계 삭제
  // const onDeleteFollower = () => {
  //   onFollowerDelete();
  // };

  return (
    <StaggerWrapper wrapperOverrideCss={containerCss} staggerVariants={stagger(0.1)}>
      {props.list.map((item) => {
        return (
          <Link key={item.memberId} href={ROUTER.PROFILE.DETAIL(item.memberId)}>
            {/* TODO :맞팔, 팔로우 버튼 클릭 처리 */}
            <ProfileListItem
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
      })}
    </StaggerWrapper>
  );
}

export default MyFollowerList;

const containerCss = css({
  padding: '16px',
});

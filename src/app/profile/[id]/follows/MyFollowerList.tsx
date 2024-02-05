import Link from 'next/link';
import { type FollowerMemberWithStatusType } from '@/apis/schema/member';
import Button from '@/components/Button/Button';
import { ProfileListItem } from '@/components/ListItem';
import { ROUTER } from '@/constants/router';
import { css } from '@/styled-system/css';

interface Props {
  list: FollowerMemberWithStatusType[];
  refetch: () => void;
}
function MyFollowerList(props: Props) {
  const onFollowerDelete = () => {
    // TODO
    props.refetch();
  };

  return (
    <section className={containerCss}>
      {props.list.map((item) => {
        return (
          <Link key={item.memberId} href={ROUTER.PROFILE.DETAIL(item.memberId)}>
            {/* TODO :맞팔, 팔로우 버튼 클릭 처리 */}
            <ProfileListItem
              buttonElement={
                <Button size="small" variant="secondary" onClick={onFollowerDelete}>
                  삭제 {item.followStatus}
                </Button>
              }
              thumbnail={{
                url: item.profileImageUrl,
                variant: 'filled',
                size: 'h36',
              }}
              name={item.nickname}
            />
          </Link>
        );
      })}
    </section>
  );
}

const containerCss = css({
  padding: '16px',
});
export default MyFollowerList;

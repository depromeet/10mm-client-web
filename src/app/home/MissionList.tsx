import Badge from '@/components/Badge/Badge';
import Icon from '@/components/Icon';
import { TwoLineListItem } from '@/components/ListItem/ListItem';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

type MissionStatusType = 'COMPLETED' | 'NONE' | 'REQUIRED';

function MissionList() {
  const list = DUMMY_MISSION_LIST;
  return (
    <div className={containerCss}>
      <h2 className={headingCss}>
        <span>내 미션 목록</span>
        <Icon name="plus" />
      </h2>
      <ul className={listCss}>
        {/* TODO : 미션 최근 순 정렬 */}
        {/* TODO : 완료된 미션은 하단 정렬 */}
        {list.map((item) => (
          <TwoLineListItem
            key={item.missionTitle}
            badgeElement={<MissionBadge status={item.status as MissionStatusType} />}
            name={item.missionTitle}
            subName={item.category}
            imageUrl={item.imageUrl}
          />
        ))}
      </ul>
    </div>
  );
}

export default MissionList;

const containerCss = css({
  padding: '0 16px 30px',
});

const headingCss = flex({
  padding: '16px 0',
  justifyContent: 'space-between',
  textStyle: 'subtitle3',
  color: 'text.primary',
  userSelect: 'none',
});

const listCss = flex({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

const DUMMY_MISSION_LIST = [
  {
    imageUrl: '/images/category/writing.png',
    category:
      '글쓰기일이삼사오육칠팔구십일이삼사오육칠팔구십일일이삼사오육칠팔구십일이삼사오육칠팔구십일일이삼사오육칠팔구십일이삼사오육칠팔구십일',
    missionTitle:
      '오늘 하루 감사일기 쓰기 일이삼사오육칠팔구십일이삼사오육칠팔구십일일이삼사오육칠팔구십일이삼사오육칠팔구십일일이삼사오육칠팔구십일이삼사오육칠팔구십일',
    status: 'NONE',
  },
  {
    imageUrl: '/images/category/etc.png',
    category:
      '글쓰기일이삼사오육칠팔구십일이삼사오육칠팔구십일일이삼사오육칠팔구십일이삼사오육칠팔구십일일이삼사오육칠팔구십일이삼사오육칠팔구십일',
    missionTitle: '포트폴리오 레퍼런스 수집하기',
    status: 'COMPLETED',
  },
  {
    imageUrl: '/images/category/exercise.png',
    category: '운동',
    missionTitle: '스쿼트 해서 튼튼해지자!',
    status: 'COMPLETED',
  },
  {
    imageUrl: '/images/category/exercise.png',
    category: '운동',
    missionTitle: '스쿼트 해서 튼튼해지자!',
    status: 'COMPLETED',
  },
  {
    imageUrl: '/images/category/exercise.png',
    category: '운동',
    missionTitle: '스쿼트 해서 튼튼해지자!',
    status: 'COMPLETED',
  },
  {
    imageUrl: '/images/category/exercise.png',
    category: '운동',
    missionTitle: '스쿼트 해서 튼튼해지자!',
    status: 'COMPLETED',
  },
  {
    imageUrl: '/images/category/exercise.png',
    category: '운동',
    missionTitle: '스쿼트 해서 튼튼해지자!',
    status: 'COMPLETED',
  },
  {
    imageUrl: '/images/category/exercise.png',
    category: '운동',
    missionTitle: '스쿼트 해서 튼튼해지자!',
    status: 'COMPLETED',
  },
  {
    imageUrl: '/images/category/exercise.png',
    category: '운동',
    missionTitle: '스쿼트 해서 튼튼해지자!',
    status: 'COMPLETED',
  },
  {
    imageUrl: '/images/category/exercise.png',
    category: '운동',
    missionTitle: '스쿼트 해서 튼튼해지자!',
    status: 'COMPLETED',
  },
  {
    imageUrl: '/images/category/exercise.png',
    category: '운동',
    missionTitle: '스쿼트 해서 튼튼해지자!',
    status: 'COMPLETED',
  },
];

function MissionBadge({ status }: { status: MissionStatusType }) {
  switch (status) {
    case 'COMPLETED':
      return <Badge color="purple">완료</Badge>;
    case 'REQUIRED':
      return <Badge color="red">인증 필요</Badge>;

    default:
      return null;
  }
}

import Badge from '@/components/Badge/Badge';
import Icon from '@/components/Icon';
import List from '@/components/ListItem/ListItem';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

function MissionList() {
  const list = DUMMY_MISSION_LIST;
  return (
    <div className={containerCss}>
      <h2 className={headingCss}>
        <span>내 미션 목록</span>
        <Icon name="plus" />
      </h2>
      <ul className={listCss}>
        {list.map((item) => (
          <List
            type="mission"
            key={item.missionTitle}
            {...item}
            badgeElement={item.isComplete ? <Badge color="purple">완료</Badge> : null}
          />
        ))}
      </ul>
    </div>
  );
}

export default MissionList;

const containerCss = css({
  padding: '0 16px',
});

const headingCss = flex({
  padding: '16px 0',
  justifyContent: 'space-between',
  textStyle: 'subtitle3',
  color: 'text.primary',
});

const listCss = flex({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

const DUMMY_MISSION_LIST = [
  {
    imageUrl: '/images/category/writing.png',
    category: '글쓰기',
    missionTitle: '오늘 하루 감사일기 쓰기',
  },
  {
    imageUrl: '/images/category/etc.png',
    category: '기타',
    missionTitle: '포트폴리오 레퍼런스 수집하기',
    isComplete: true,
  },
  {
    imageUrl: '/images/category/exercise.png',
    category: '운동',
    missionTitle: '스쿼트 해서 튼튼해지자!',
    isComplete: true,
  },
];

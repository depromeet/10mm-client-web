import { TwoLineListItem } from '@/components/ListItem/ListItem';
import { flex } from '@/styled-system/patterns';

function CompleteMissionPage() {
  return (
    <div className={containerCss}>
      {DUMMY_MISSION_LIST.map((item) => (
        <TwoLineListItem
          key={item.missionTitle}
          name={item.missionTitle}
          subName={item.category}
          imageUrl={item.imageUrl}
        />
      ))}
    </div>
  );
}

export default CompleteMissionPage;

const containerCss = flex({
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
  },
  {
    imageUrl: '/images/category/exercise.png',
    category: '운동',
    missionTitle: '스쿼트 해서 튼튼해지자!',
  },
];

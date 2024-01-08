import { MissionCategory, MissionVisibility } from '@/apis/mission';

export const MISSION_CATEGORY_LIST = [
  {
    imgUrl: '/images/category/exercise.png',
    label: '운동',
    value: MissionCategory.EXERCISE,
  },
  {
    label: '공부',
    value: MissionCategory.STUDY,
    imgUrl: '/images/category/study.png',
  },
  {
    label: '글 읽기',
    value: MissionCategory.READING,
    imgUrl: '/images/category/reading.png',
  },
  {
    label: '글 쓰기',
    value: MissionCategory.WRITING,
    imgUrl: '/images/category/writing.png',
  },
  {
    label: '프로젝트 / 작업',
    value: MissionCategory.PROJECT,
    imgUrl: '/images/category/laptop.png',
  },
  {
    label: '영상 보기 / 팟캐스트 듣기',
    value: MissionCategory.WATCHING,
    imgUrl: '/images/category/play-button.png',
  },
  {
    label: '기타',
    value: MissionCategory.ETC,
    imgUrl: '/images/category/etc.png',
  },
];

export const PUBLIC_SETTING_LIST = [
  {
    value: MissionVisibility.FOLLOWER,
    label: '팔로워에게 공개',
  },
  {
    value: MissionVisibility.ALL,
    label: '전체 공개',
  },
  {
    value: MissionVisibility.NONE,
    label: '비공개',
  },
];

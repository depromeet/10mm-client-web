import { MissionCategory, MissionVisibility } from '@/apis/schema/mission';

export const MISSION_CATEGORY_LABEL: Record<
  MissionCategory,
  {
    imgUrl: string;
    label: string;
    value: MissionCategory;
  }
> = {
  EXERCISE: {
    imgUrl: '/images/category/exercise.png',
    label: '운동',
    value: MissionCategory.EXERCISE,
  },

  STUDY: {
    label: '공부',
    value: MissionCategory.STUDY,
    imgUrl: '/images/category/study.png',
  },
  READING: {
    label: '글 읽기',
    value: MissionCategory.READING,
    imgUrl: '/images/category/reading.png',
  },
  WRITING: {
    label: '글 쓰기',
    value: MissionCategory.WRITING,
    imgUrl: '/images/category/writing.png',
  },
  PROJECT: {
    label: '프로젝트 / 작업',
    value: MissionCategory.PROJECT,
    imgUrl: '/images/category/laptop.png',
  },
  WATCHING: {
    label: '영상 보기 / 팟캐스트 듣기',
    value: MissionCategory.WATCHING,
    imgUrl: '/images/category/play-button.png',
  },
  ETC: {
    label: '기타',
    value: MissionCategory.ETC,
    imgUrl: '/images/category/etc.png',
  },
} as const;

export const MISSION_CATEGORY_LIST = Object.values(MISSION_CATEGORY_LABEL);

export const PUBLIC_SETTING_LABEL = {
  [MissionVisibility.FOLLOWER]: {
    label: '팔로워에게 공개',
    value: MissionVisibility.FOLLOWER,
  },
  [MissionVisibility.ALL]: {
    label: '전체 공개',
    value: MissionVisibility.ALL,
  },
  [MissionVisibility.NONE]: {
    label: '비공개',
    value: MissionVisibility.NONE,
  },
};

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

const MISSION_CATEGORY: Record<string, { label: string; imgUrl?: string }> = {
  운동: {
    imgUrl: '/images/category/exercise.png',
    label: '운동',
  },
  공부: {
    label: '공부',
    imgUrl: '/images/category/study.png',
  },
  '글 읽기': {
    label: '글 읽기',
    imgUrl: '/images/category/reading.png',
  },
  '글 쓰기': {
    label: '글 쓰기',
    imgUrl: '/images/category/writing.png',
  },
  '프로젝트 / 작업': {
    label: '프로젝트 / 작업',
    value: '프로젝트 / 작업',
    imgUrl: '/images/category/laptop.png',
  },
  '영상 보기 / 팟캐스트 듣기': {
    label: '영상 보기 / 팟캐스트 듣기',
    imgUrl: '/images/category/play-button.png',
  },
  기타: {
    label: '기타',
    imgUrl: '/images/category/exercise.png',
  },
};

export const MISSION_CATEGORY_LIST = Object.keys(MISSION_CATEGORY).map((key) => ({
  ...MISSION_CATEGORY[key],
  value: key,
}));

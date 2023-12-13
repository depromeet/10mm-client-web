export const MISSION_CATEGORIES = {
  exercise: {
    id: 'exercise',
    label: '운동',
    imgSrc: '/images/emoji-exercise.png',
  },
  study: {
    id: 'study',
    label: '공부',
    imgSrc: '/images/emoji-book.png',
  },
  reading: {
    id: 'reading',
    label: '글 읽기',
    imgSrc: '/images/emoji-open-book.png',
  },
  writing: {
    id: 'writing',
    label: '글 쓰기',
    imgSrc: '/images/emoji-pen.png',
  },
  video: {
    id: 'video',
    label: '영상 보기 / 팟캐스트 듣기',
    imgSrc: '/images/emoji-laptop.png',
  },
  etc: {
    id: 'etc',
    label: '기타',
    imgSrc: '/images/emoji-speech-bubble.png',
  },
} as const;

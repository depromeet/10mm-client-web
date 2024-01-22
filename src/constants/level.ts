export interface LevelSystemType {
  label: string;
  level: string;
  levelName: string;
  min: number;
  max: number;
  imageUrl: string;
  isFinal?: boolean;
}

export const LEVEL_SYSTEM: LevelSystemType[] = [
  {
    label: 'Lv. 1 씨드',
    level: 'Lv. 1',
    levelName: '씨드',
    min: 0,
    max: 10,
    imageUrl: '/assets/level/level-1.png',
  },
  {
    label: 'Lv. 2 키즈',
    level: 'Lv. 2',
    levelName: '키즈',
    min: 11,
    max: 30,
    imageUrl: '/assets/level/level-2.png',
  },
  {
    label: 'Lv.3 주니어',
    level: 'Lv. 3',
    levelName: '주니어',
    min: 31,
    max: 90,
    imageUrl: '/assets/level/level-3.png',
  },
  {
    label: 'Lv.4 시니어',
    level: 'Lv. 4',
    levelName: '시니어',
    min: 91,
    max: 240,
    imageUrl: '/assets/level/level-4.png',
  },
  {
    label: 'Lv.5 플라이어',
    level: 'Lv. 5',
    levelName: '플라이어',
    min: 241,
    max: 500,
    imageUrl: '/assets/level/level-5.png',
  },
  {
    label: 'Lv.6 마스터',
    level: 'Lv. 6',
    levelName: '마스터',
    min: 501,
    max: 600,
    isFinal: true,
    imageUrl: '/assets/level/level-6.png',
  },
];

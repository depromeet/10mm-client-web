export interface LevelSystemType {
  label: string;
  min: number;
  max: number;
  imageUrl: string;
  isFinal?: boolean;
}

export const LEVEL_SYSTEM: LevelSystemType[] = [
  {
    label: 'Lv.1',
    min: 0,
    max: 10,
    imageUrl: '/assets/level/1.png',
  },
  {
    label: 'Lv.2',
    min: 11,
    max: 30,
    imageUrl: '/assets/level/1.png',
  },
  {
    label: 'Lv.3',
    min: 31,
    max: 90,
    imageUrl: '/assets/level/1.png',
  },
  {
    label: 'Lv.4',
    min: 91,
    max: 240,
    imageUrl: '/assets/level/1.png',
  },
  {
    label: 'Lv.5',
    min: 241,
    max: 500,
    imageUrl: '/assets/level/1.png',
  },
  {
    label: 'Lv.6',
    min: 501,
    max: 600,
    isFinal: true,
    imageUrl: '/assets/level/1.png',
  },
];

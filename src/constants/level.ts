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
    imageUrl: 'https://github.com/depromeet/10mm-client-web/assets/49177223/2f733659-4b1d-4ed2-a073-bd656f405efc',
  },
  {
    label: 'Lv.2',
    min: 11,
    max: 30,
    imageUrl: 'https://github.com/depromeet/10mm-client-web/assets/49177223/2f733659-4b1d-4ed2-a073-bd656f405efc',
  },
  {
    label: 'Lv.3',
    min: 31,
    max: 90,
    imageUrl: 'https://github.com/depromeet/10mm-client-web/assets/49177223/2f733659-4b1d-4ed2-a073-bd656f405efc',
  },
  {
    label: 'Lv.4',
    min: 91,
    max: 240,
    imageUrl: 'https://github.com/depromeet/10mm-client-web/assets/49177223/2f733659-4b1d-4ed2-a073-bd656f405efc',
  },
  {
    label: 'Lv.5',
    min: 241,
    max: 500,
    imageUrl: 'https://github.com/depromeet/10mm-client-web/assets/49177223/2f733659-4b1d-4ed2-a073-bd656f405efc',
  },
  {
    label: 'Lv.6',
    min: 501,
    max: 600,
    isFinal: true,
    imageUrl: 'https://github.com/depromeet/10mm-client-web/assets/49177223/2f733659-4b1d-4ed2-a073-bd656f405efc',
  },
];

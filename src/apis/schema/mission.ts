/**
 * @description 미션 스키마
 * @param missionId
 * @param name - 미션 이름
 * @param content - 미션 내용
 * @param category - 미션 카테고리
 * @param visibility - 미션 공개여부
 * @param sort - 미션 정렬 값
 */
export interface MissionType {
  missionId: number;
  name: string;
  content: string;
  category: MissionCategory;
  visibility: MissionVisibility;
  sort: number;
}

/**
 * @param missionId
 * @param name - 미션 이름
 * @param content - 미션 내용
 * @param category - 미션 카테고리
 * @param visibility - 미션 공개여부
 * @param status - 미션 아카이빙 상태
 * @param sort - 미션 정렬 값
 */
export interface MissionItemType {
  missionId: number;
  name: string;
  content: string;
  category: MissionCategory;
  visibility: MissionVisibility;
  missionStatus: MissionStatus;
  archiveStatus: ArchiveStatus;
  ttlFinishedAt: string;
  sort: number;
}

export interface MissionItemTypeWithRecordId extends MissionItemType {
  missionRecordId?: string;
}

export interface FinishedMissionItemType {
  missionId: number;
  name: string;
  content: string;
  category: MissionCategory;
  missionAttainRate: number;
  startedAt: string;
  finishedAt: string;
}

export enum MissionCategory {
  STUDY = 'STUDY',
  EXERCISE = 'EXERCISE',
  READING = 'READING',
  WRITING = 'WRITING',
  PROJECT = 'PROJECT',
  WATCHING = 'WATCHING',
  ETC = 'ETC',
}
export enum MissionVisibility {
  ALL = 'ALL',
  FOLLOWER = 'FOLLOWER',
  NONE = 'NONE',
}
export enum ArchiveStatus {
  NONE = 'NONE',
  ARCHIVED = 'ARCHIVED',
}

export enum MissionStatus {
  COMPLETED = 'COMPLETED',
  NONE = 'NONE',
  REQUIRED = 'REQUIRED',
  PROGRESSING = 'PROGRESSING', // 진행중, 프론트에서만 존재
}

export enum MissionPeriod {
  TWO_WEEKS = 'TWO_WEEKS',
  ONE_MONTH = 'ONE_MONTH',
  TWO_MONTHS = 'TWO_MONTHS',
  THREE_MONTHS = 'THREE_MONTHS',
  FOUR_MONTHS = 'FOUR_MONTHS',
}

export interface FeedItemType extends FeedBaseType {
  remark?: string;
  nickname: string;
  profileImage?: string;
  memberId: number;
  recordStartedAt: string;
}

export interface FeedBaseType {
  missionId: number;
  recordId: number;
  name: string;
  recordImageUrl: string;
  duration: number;
  sinceDay: number;
  startedAt: string;
  finishedAt: string;
}

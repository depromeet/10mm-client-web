/**
 * @description 미션 기록 스키마
 * @param recordId - 미션기록 ID
 * @param missionDay
 * @param remark - 미션 일지
 * @param imageUrl - 미션 인증사진 URL
 * @param startedAt - 미션 시작시간
 * @param finishedAt - 미션 종료시간
 */
export interface RecordType {
  recordId: number;
  missionDay: number;
  remark: string;
  imageUrl: string;
  startedAt: string;
  finishedAt: string;
}

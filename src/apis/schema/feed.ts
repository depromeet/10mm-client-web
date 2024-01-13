import { type MissionType } from '@/apis/schema/mission';
import { type RecordType } from '@/apis/schema/record';

/**
 * @description
 * @param mission - 미션
 * @param records - 미션 기록
 */
export interface FeedType {
  mission: MissionType;
  records: RecordType[];
}

/**
 * @description 미션 통계 요약 (Statistics 보다 미션 기록에 대한 전체보다는 기간에 따른 요약으로 Summary 라는 명칭 사용)
 * @param streak
 * @param weekly - 주간 통계
 */
export interface SummaryType {
  streak: StreakType;
  weekly: WeeklyType[];
}

/**
 * @description 주간 통계
 * @param date - 참여일
 * @param duration - 총 참여시간
 */
interface WeeklyType {
  date: string;
  duration: string;
}

/**
 * @param currentStreak - 현재 습관 연속 일수
 * @param maxStreak - 최대 습관 연속 일수
 * @param totalStreak - 10분 이상 지속한 날
 */
interface StreakType {
  currentStreak: number;
  maxStreak: number;
  totalStreak: number;
}

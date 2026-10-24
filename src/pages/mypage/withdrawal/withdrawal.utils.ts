import axios from 'axios';

/**
 * 회원탈퇴 요청(DELETE /members/withdrawal) 실패를 원인별로 나눈다.
 *
 * - ALREADY_WITHDRAWN: 404. 서버는 이미 탈퇴한 회원이면 MEMBER_ALREADY_DELETED(404)를 준다.
 *   (중복 탭으로 두 번째 요청이 나가는 경우 등) → 탈퇴는 끝난 상태이므로 성공으로 처리한다.
 * - AUTH_EXPIRED: 401. 헤더 액세스 토큰이 만료됐고 쿠키 재발급도 안 된 경우.
 * - NETWORK: 응답 자체를 못 받은 경우(오프라인, 타임아웃 등).
 * - UNKNOWN: 그 밖의 서버 오류.
 */
export type WithdrawalErrorReason = 'ALREADY_WITHDRAWN' | 'AUTH_EXPIRED' | 'NETWORK' | 'UNKNOWN';

export const getWithdrawalErrorReason = (error: unknown): WithdrawalErrorReason => {
  if (!axios.isAxiosError(error)) return 'UNKNOWN';

  const status = error.response?.status;
  if (status === undefined) return 'NETWORK';
  if (status === 401) return 'AUTH_EXPIRED';
  if (status === 404) return 'ALREADY_WITHDRAWN';
  return 'UNKNOWN';
};

export const WITHDRAWAL_ERROR_MESSAGE: Record<Exclude<WithdrawalErrorReason, 'ALREADY_WITHDRAWN'>, string> = {
  AUTH_EXPIRED: '로그인이 만료됐어요. 다시 로그인한 뒤 탈퇴해 주세요.',
  NETWORK: '네트워크 연결이 불안정해요. 연결을 확인한 뒤 다시 시도해 주세요.',
  UNKNOWN: '회원탈퇴에 실패했어요. 잠시 후 다시 시도해 주세요.',
};

export const ROUTER = {
  HOME: '/',
  MISSION: {
    NEW: '/mission/new',
    SUCCESS: `/mission/success`,
    RECORD: (id: string) => `/mission/${id}/stopwatch`,
    STOP_WATCH: (id: string) => `/mission/${id}/stopwatch`,
    DETAIL: (id: string) => `/mission/${id}/detail`,
  },
  MYPAGE: {
    HOME: '/mypage',
    // TODO : 상황에 맞게 수정 필요
    PROFILE_MODIFY: '/mypage/profile_modify',
    COMPLETE_MISSION_BOX: '/mypage/complete_mission',
    TERMS: '/mypage/terms',
    LOGIN_INFO: '/mypage/login_info',
  },
  RESULT: {
    HOME: '/result',
  },
  AUTH: {
    LOGIN: '/auth/login',
  },
  GUEST: {
    MISSION: {
      NEW: '/guest/mission/new',
      SUCCESS: `/guest/mission/success`,
      STOP_WATCH: `/guest/mission/stopwatch`,
    },
  },
};

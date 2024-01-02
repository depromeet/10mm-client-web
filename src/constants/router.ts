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

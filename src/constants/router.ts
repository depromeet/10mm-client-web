export const ROUTER = {
  HOME: '/',
  MISSION: {
    NEW: '/mission/new',
    SUCCESS: `/mission/success`,
    RECORD: (id: string) => `/mission/${id}/stopwatch`,
    STOP_WATCH: (id: string) => `/mission/${id}/stopwatch`,
  },
  MYPAGE: {
    HOME: '/mypage',
  },
  RESULT: {
    HOME: '/result',
  },
};

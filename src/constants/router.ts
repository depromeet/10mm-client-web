export const ROUTER = {
  HOME: '/',
  MISSION: {
    NEW: '/mission/new',
    RECORD: (id: string) => `/mission/${id}/stopwatch`,
    STOP_WATCH: (id: string) => `/mission/${id}/stopwatch`,
    SUCCESS: (id: string) => `/mission/${id}/success`,
  },
};

export const ROUTER = {
  HOME: '/',
  MISSION: {
    NEW: '/mission/new',

    STOP_WATCH: (id: string) => `/mission/${id}/stopwatch`,
    DETAIL: (id: string) => `/mission/${id}/detail`,
    MODIFY: (id: string) => `/mission/${id}/detail/modify`,
  },

  RECORD: {
    CREATE: (id: string) => `/record/${id}`,
    SUCCESS: `/record/success`, // TODO: 여기있는것이 맞ㄴ느가?
    DETAIL: {
      HOME: (id: string) => `/record/${id}/detail`,
      EMPTY: `/record/empty`,
      EDIT: (id: string) => `/record/${id}/edit`,
    },
  },
  MYPAGE: {
    HOME: '/mypage',
    // TODO : 상황에 맞게 수정 필요
    PROFILE_MODIFY: '/mypage/profile_modify',
    COMPLETE_MISSION_BOX: '/mypage/complete_mission',
    TERMS: '/mypage/terms',
    LOGIN_INFO: '/mypage/login_info',
    WITHDRAWAL: '/mypage/withdrawal',
  },
  RESULT: {
    HOME: '/result',
  },
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
    SIGNIN: '/auth/signin',
    NICKNAME: '/auth/nickname',
    TEMP_REGISTER: '/auth/temp-register',
    REGISTER: '/auth/register',
  },
  GUEST: {
    MISSION: {
      NEW: '/guest/mission/new',
      SUCCESS: `/guest/mission/success`,
      STOP_WATCH: `/guest/mission/stopwatch`,
    },
  },
};

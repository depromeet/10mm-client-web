import { type ResultTabId } from '@/pages/result/result.constants';

export const ROUTER = {
  HOME: '/',
  MISSION: {
    NEW: '/mission/new',
    FOLLOW: (id: string) => `/mission/${id}/follow`,
    STOP_WATCH: (id: string) => `/mission/${id}/stopwatch`,
    DETAIL: (id: string) => `/mission/${id}/detail`,
    MODIFY: (id: string) => `/mission/${id}/detail/modify`,
  },
  FEED: {
    HOME: '/feed',
  },
  ONBOARDING: {
    HOME: '/onboarding',
  },
  RECORD: {
    CREATE: (id: string) => `/record/${id}`,
    SUCCESS: `/record/success`, // TODO: 여기있는것이 맞ㄴ느가?
    DETAIL: {
      HOME: (id: string) => `/record/${id}/detail`,
      FOLLOW: (id: string) => `/record/${id}/follow`,
      EMPTY: `/record/empty`,
      EDIT: (id: string) => `/record/${id}/edit`,
    },
  },
  PROFILE: {
    DETAIL: (id: number) => `/profile/${id}`,
    FOLLOW_LIST: (id: number, query?: 'following' | 'follower') =>
      `/profile/${id}/follows${query ? `?tab=${query}` : ''}`,
  },
  MYPAGE: {
    HOME: '/mypage',
    // TODO : 상황에 맞게 수정 필요
    PROFILE_MODIFY: '/mypage/profile_modify',
    TERMS: '/mypage/terms',
    LOGIN_INFO: '/mypage/login_info',
    WITHDRAWAL: '/mypage/withdrawal',
    SETTING: '/mypage/setting_and_private',
  },
  RESULT: {
    HOME: (query?: ResultTabId) => `/result${query ? `?tab=${query}` : ''}`,
    FINISHED_MISSION: (id: number) => `/result/finished/${id}`,
  },
  LEVEL: {
    GUIDE: '/level/guide',
  },
  AUTH: {
    SOCIAL_LOGIN: (provider: string) => `/auth/social-login?provider=${provider}`,
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
    SIGNIN: '/auth/signin',
    NICKNAME: '/auth/nickname',
    TEMP_REGISTER: '/auth/temp-register',
    REGISTER: '/auth/register',
    KAKAO_CALLBACK: '/auth/kakaoCallback',
    APPLE_CALLBACK: '/auth/appleCallback',
  },
  PRIVACY: '/privacy',
  GUEST: {
    MISSION: {
      NEW: '/guest/mission/new',
      SUCCESS: `/guest/mission/success`,
      STOP_WATCH: `/guest/mission/stopwatch`,
    },
  },
  SEARCH: {
    HOME: '/search',
  },
};

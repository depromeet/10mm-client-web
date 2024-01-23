import { ANDROID, APP_USER_AGENT, IOS } from '@/constants/common';

const getUserAgent = () => {
  if (typeof window === 'undefined') {
    return '';
  }
  return window.navigator.userAgent;
};

// Todo 테스트 코드 추가 예정
export const isWebView = () => RegExp(APP_USER_AGENT).test(getUserAgent());
export const isAndroid = () => RegExp(ANDROID).test(getUserAgent());
export const isIOS = () => RegExp(IOS).test(getUserAgent());

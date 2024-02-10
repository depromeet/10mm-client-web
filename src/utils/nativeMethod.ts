import { NATIVE_CUSTOM_EVENTS } from '@/constants/nativeCustomEvent';

export const NATIVE_METHODS = {
  HAPTIC: () => {
    window.ReactNativeWebView?.postMessage(
      JSON.stringify({
        type: NATIVE_CUSTOM_EVENTS.HAPTIC,
      }),
    );
  },
  VIBRATE: () => {
    window.ReactNativeWebView?.postMessage(
      JSON.stringify({
        type: NATIVE_CUSTOM_EVENTS.VIBRATE,
      }),
    );
  },
};

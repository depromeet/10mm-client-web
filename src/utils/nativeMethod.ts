import { NATIVE_CUSTOM_EVENTS } from '@/constants/nativeCustomEvent';
import type { MissionTimerSnapshot } from '@/utils/missionTimerNative';
import { sendMissionTimerSync } from '@/utils/missionTimerNative';

export const NATIVE_METHODS = {
  MISSION_TIMER_SYNC: (snapshot: MissionTimerSnapshot) => {
    sendMissionTimerSync(snapshot);
  },
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

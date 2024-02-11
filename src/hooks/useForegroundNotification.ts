import { useEffect } from 'react';
import { useNotificationSnackBar } from '@/components/NotificationSnackBar/NotificationSnackBarProvider';
import { NATIVE_CUSTOM_EVENTS } from '@/constants/nativeCustomEvent';

const useForegroundNotification = () => {
  const { triggerNotificationSnackBar } = useNotificationSnackBar();

  useEffect(() => {
    const webAppleIdSignInOnSuccessEventListener = (event: CustomEvent) => {
      triggerNotificationSnackBar({
        message: event.detail.data.data,
      });
    };

    document.addEventListener(
      NATIVE_CUSTOM_EVENTS.FOREGROUND_FCM,
      webAppleIdSignInOnSuccessEventListener as EventListener,
    );
  }, []);
};

export default useForegroundNotification;

import { createContext, type PropsWithChildren, useContext, useState } from 'react';
import {
  type SnackBarType as NotificationSnackBarType,
  type SnackBarWithoutId,
} from '@/components/SnackBar/SnackBar.types';

import NotificationSnackBarOverlay from './NotificationSnackBarOverlay';

const NotificationSnackBarContext = createContext<{
  notificationSnackBar: NotificationSnackBarType[];
  triggerNotificationSnackBar: (snackBar: SnackBarWithoutId) => void;
  removeNotificationSnackBar: (id: string) => void;
} | null>(null);

/**
 * useNotificationSnackBar
 * @returns notificationSnackBar, triggerNotificationSnackBar
 * snackBar 를 사용할땐 triggerSnackBar 를 사용해야 합니다.
 * triggerSnackBar({ message: 'test', rightAction: 'none' })로 선엉하여 사용합니다.
 */
export const useNotificationSnackBar = () => {
  const context = useContext(NotificationSnackBarContext);

  if (!context) {
    throw new Error('NotificationSnackBarProvider not found');
  }

  return context;
};

export default function NotificationSnackBarProvider({ children }: PropsWithChildren) {
  const [notificationSnackBar, setNotificationSnackBar] = useState<NotificationSnackBarType[]>([]);

  const removeNotificationSnackBar = (id: string) => {
    setNotificationSnackBar((prev) => prev.filter((item) => item.id !== id));
  };

  const triggerNotificationSnackBar = (addItem: SnackBarWithoutId) => {
    const id = new Date().getTime().toString();
    setNotificationSnackBar((prev) => [...prev, { ...addItem, id }]);

    setTimeout(
      () => {
        removeNotificationSnackBar(id);
      },
      addItem.variant === 'none' ? 1000 : 2000,
    );
  };

  return (
    <NotificationSnackBarContext.Provider
      value={{
        notificationSnackBar,
        triggerNotificationSnackBar,
        removeNotificationSnackBar,
      }}
    >
      {children}
      <NotificationSnackBarOverlay />
    </NotificationSnackBarContext.Provider>
  );
}

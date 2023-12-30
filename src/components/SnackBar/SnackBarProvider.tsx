'use client';

import { createContext, type PropsWithChildren, useContext, useState } from 'react';
import { type SnackBarType, type SnackBarWithId } from '@/components/SnackBar/SnackBar.types';
import SnackBarOverlay from '@/components/SnackBar/SnackBarOverlay';

const SnackBarContext = createContext<{
  snackBar: SnackBarWithId[];
  triggerSnackBar: (snackBar: SnackBarType) => void;
} | null>(null);

/**
 * useSnackBar
 * @returns snackBar, triggerSnackBar
 * snackBar 를 사용할땐 triggerSnackBar 를 사용해야 합니다.
 * triggerSnackBar({ message: 'test', rightAction: 'none' })로 선엉하여 사용합니다.
 */
export const useSnackBar = () => {
  const context = useContext(SnackBarContext);

  if (!context) {
    throw new Error('SnackBarProvider not found');
  }

  return context;
};

export default function SnackBarProvider({ children }: PropsWithChildren) {
  const [snackBar, setSnackBar] = useState<SnackBarWithId[]>([]);

  const removeSnackBar = (id: string) => {
    setSnackBar((prev) => prev.filter((item) => item.id !== id));
  };

  const triggerSnackBar = (addItem: SnackBarType) => {
    const id = new Date().getTime().toString();
    setSnackBar((prev) => [...prev, { ...addItem, id }]);

    setTimeout(
      () => {
        removeSnackBar(id);
      },
      addItem.variant === 'none' ? 1000 : 5000,
    );
  };

  return (
    <SnackBarContext.Provider value={{ snackBar, triggerSnackBar }}>
      {children}
      <SnackBarOverlay />
    </SnackBarContext.Provider>
  );
}

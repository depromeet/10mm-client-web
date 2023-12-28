import React, { useState } from 'react';
import AppBarBottomView from '@/components/AppBarBottom/AppBarBottomVIew';
import Button from '@/components/Button/Button';
import SnackBar from '@/components/SnackBar/SnackBar';
import { type SnackBarWithId } from '@/components/SnackBar/SnackBar.types';
import SnackBarProvider, { useSnackBar } from '@/components/SnackBar/SnackBarProvider';
import type { Meta } from '@storybook/react';

const meta = {
  title: 'Component/SnackBar',
  component: SnackBar,

  tags: ['autodocs'],

  decorators: [
    (Story) => (
      <SnackBarProvider>
        <Story />
      </SnackBarProvider>
    ),
  ],
} satisfies Meta<typeof SnackBar>;

export default meta;

export const WithCTA = (args: SnackBarWithId) => {
  const { triggerSnackBar } = useSnackBar();

  return (
    <Button variant={'cta'} size={'large'} onClick={() => triggerSnackBar(args)}>
      test
    </Button>
  );
};

export const WithAppBar = (args: SnackBarWithId) => {
  const { triggerSnackBar } = useSnackBar();
  const [current, setCurrent] = useState('home');

  return (
    <div>
      <AppBarBottomView current={current} onClick={(item) => setCurrent(item.key)} />
      <Button variant={'cta'} size={'large'} onClick={() => triggerSnackBar(args)}>
        test
      </Button>
    </div>
  );
};

export const None = {
  args: {
    rightAction: 'none',
    message: 'SnackBar',
    id: 'snackbar',
  },
};

export const Icon = {
  args: {
    rightAction: 'icon',
    message: 'SnackBar',
    iconName: 'arrow-forward',
    id: 'snackbar',
    iconAction: () => {},
  },
};

export const TextButton = {
  args: {
    rightAction: 'text-button',
    message: 'SnackBar',
    buttonText: 'Button',
    timerSecond: 100,
    id: 'snackbar',
    buttonAction: () => {},
  },
};

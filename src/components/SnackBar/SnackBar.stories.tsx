import React, { useState } from 'react';
import AppBarBottomView from '@/components/AppBarBottom/AppBarBottomVIew';
import Button from '@/components/Button/Button';
import SnackBar from '@/components/SnackBar/SnackBar';
import { type SnackBarType } from '@/components/SnackBar/SnackBar.types';
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

export const WithCTA = (args: SnackBarType) => {
  const { triggerSnackBar } = useSnackBar();

  return (
    <Button variant={'cta'} size={'large'} onClick={() => triggerSnackBar(args)}>
      test
    </Button>
  );
};

export const WithAppBar = (args: SnackBarType) => {
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

// TODO: 기본 arg 안들어가는 이슈 체크
export const None = {
  args: {
    variant: 'none',
    message: 'SnackBar',
    id: 'snackbar',
  },
};

export const Icon = {
  args: {
    variant: 'icon',
    message: 'SnackBar',
    iconName: 'arrow-forward',
    id: 'snackbar',
    onClick: () => {},
  },
};

export const TextButton = {
  args: {
    variant: 'text-button',
    message: 'SnackBar',
    buttonText: 'Button',
    timerSecond: 100,
    id: 'snackbar',
    onButtonClick: () => {},
  },
};

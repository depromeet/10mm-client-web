import type { Meta, StoryObj } from '@storybook/react';

import ButtonSocialLogin from './ButtonSocialLogin';

const meta = {
  title: 'Component/ButtonSocialLogin',
  component: ButtonSocialLogin,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
    },
  },
} satisfies Meta<typeof ButtonSocialLogin>;

export default meta;

type Story = StoryObj<typeof meta>;

export const KakaoLoginButton: Story = {
  args: {
    type: 'kakao',
  },
};

export const AppleLoginButton: Story = {
  args: {
    type: 'apple',
  },
};

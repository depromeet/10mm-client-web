'use client';
import { type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useTempRegister } from '@/apis/auth';
import { isSeverError } from '@/apis/instance.api';
import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import { useSnackBar } from '@/components/SnackBar/SnackBarProvider';
import { ROUTER } from '@/constants/router';
import { css } from '@styled-system/css';

export default function SignupPage() {
  const { triggerSnackBar } = useSnackBar();
  const router = useRouter();

  const { mutate } = useTempRegister({
    onSuccess: () => {
      router.replace(ROUTER.AUTH.NICKNAME);
    },
    onError: (error) => {
      if (isSeverError(error)) {
        triggerSnackBar({
          message: error.response.data.data.message,
        });
        return;
      }
    },
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const username = formData.get('아이디');
    const password = formData.get('비밀번호');
    const passwordConfirm = formData.get('비밀번호 확인');

    if (formData.get('비밀번호') !== formData.get('비밀번호 확인')) {
      triggerSnackBar({
        message: '비밀번호가 일치하지 않습니다.',
      });
      return;
    }

    if (!username || !password || !passwordConfirm) {
      triggerSnackBar({
        message: '아이디와 비밀번호를 입력해주세요.',
      });
      return;
    }

    mutate({
      username: username.toString(),
      password: password.toString(),
    });
  };

  return (
    <form className={mainWrapperCss} onSubmit={onSubmit}>
      <Input id={'userId'} name={'아이디'} variant={'normal'} />
      <Input id={'password'} name={'비밀번호'} variant={'normal'} type={'password'} />
      <Input id={'password-confirm'} name={'비밀번호 확인'} variant={'normal'} type={'password'} />

      <Button variant="primary" size="large" type="submit">
        회원가입
      </Button>
    </form>
  );
}

const mainWrapperCss = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0 40px',
  width: '100%',
  height: '100vh',

  color: 'text.primary',
  gap: '24px',

  '& section': {
    width: '100%',
  },
});

'use client';

import { type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useLogin } from '@/apis/auth';
import { isSeverError } from '@/apis/instance.api';
import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import Loading from '@/components/Loading';
import { useSnackBar } from '@/components/SnackBar/SnackBarProvider';
import { ROUTER } from '@/constants/router';
import { css } from '@styled-system/css';

export default function SigninPage() {
  const { triggerSnackBar } = useSnackBar();

  const router = useRouter();

  const { mutate, isPending } = useLogin({
    onSuccess: () => {
      router.replace(ROUTER.HOME);
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

  const onClick = () => {
    router.push(ROUTER.AUTH.SIGNUP);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const username = formData.get('아이디');
    const password = formData.get('비밀번호');

    if (!username || !password) {
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
    <>
      {isPending && <Loading />}
      <form className={mainWrapperCss} onSubmit={onSubmit}>
        <Input id={'userId'} name={'아이디'} variant={'normal'} />
        <Input id={'password'} name={'비밀번호'} variant={'normal'} type={'password'} />
        <Button variant="primary" size="large">
          로그인
        </Button>
        <Button variant="ghost" size="large" type={'button'} onClick={onClick}>
          회원가입
        </Button>
      </form>
    </>
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
  gap: '32px',

  '& section': {
    width: '100%',
  },
});

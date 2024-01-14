'use client';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import { ROUTER } from '@/constants/router';
import { css } from '@styled-system/css';

export default function LoginPage() {
  const router = useRouter();
  const onClickSignUp = () => {
    router.push(ROUTER.AUTH.SIGNUP);
  };

  return (
    <form className={mainWrapperCss}>
      <Input id={'userId'} name={'아이디'} variant={'normal'} value={''} />
      <Input id={'password'} name={'비밀번호'} variant={'normal'} type={'password'} value={''} />
      <Button variant="primary" size="large">
        로그인
      </Button>
      <Button variant="ghost" size="large" onClick={onClickSignUp}>
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
  gap: '32px',

  '& section': {
    width: '100%',
  },
});

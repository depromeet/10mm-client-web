'use client';
import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import { css } from '@styled-system/css';

export default function SignupPage() {
  return (
    <form className={mainWrapperCss}>
      <Input id={'userId'} name={'아이디'} variant={'normal'} value={''} />
      <Input id={'password'} name={'비밀번호'} variant={'normal'} type={'password'} value={''} />
      <Input id={'password-confirm'} name={'비밀번호 확인'} variant={'normal'} type={'password'} value={''} />

      <Button variant="primary" size="large">
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

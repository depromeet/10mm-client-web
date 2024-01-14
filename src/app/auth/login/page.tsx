'use client';

import { useRouter } from 'next/navigation';
import Button from '@/components/Button/Button';
import ButtonSocialLogin from '@/components/ButtonSocialLogin/ButtonSocialLogin';
import { ROUTER } from '@/constants/router';
import { css } from '@styled-system/css';

export default function LoginPage() {
  const router = useRouter();
  const onClickGuest = () => {
    router.push(ROUTER.GUEST.MISSION.NEW);
  };

  const onClickLoginButton = () => {
    router.push(ROUTER.AUTH.SIGNIN);
  };

  return (
    <main className={MainWrapperCss}>
      <div className={LoginButtonListWrapperCss}>
        <Button variant="primary" size="large" onClick={onClickLoginButton}>
          아이디로 로그인
        </Button>
        <ButtonSocialLogin type="kakao" />
        <ButtonSocialLogin type="apple" />
        <Button size="large" variant="ghost" onClick={onClickGuest}>
          둘러보기
        </Button>
      </div>
    </main>
  );
}

const MainWrapperCss = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-end',

  bgImage: 'url(/images/login_bg.png)',
  bgPosition: 'center',
  bgRepeat: 'no-repeat',
  bgSize: 'cover',

  width: '100%',
  height: '100vh',
  paddingBottom: '16px',
});

const LoginButtonListWrapperCss = css({
  maxWidth: '320px',
  display: 'flex',
  gap: '8px',
  flexDirection: 'column',
  width: '100%',
  alignItems: 'center',
});

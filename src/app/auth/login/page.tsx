import LinkButton from '@/components/Button/LinkButton';
import { ROUTER } from '@/constants/router';
import { css } from '@styled-system/css';

export default function LoginPage() {
  return (
    <main className={MainWrapperCss}>
      <div className={LoginButtonListWrapperCss}>
        <LinkButton href={ROUTER.AUTH.SIGNIN} variant="primary" size="large">
          아이디로 로그인
        </LinkButton>
        {/*<ButtonSocialLogin type="kakao" />*/}
        {/*<ButtonSocialLogin type="apple" />*/}
        <LinkButton href={ROUTER.GUEST.MISSION.NEW} size="large" variant="ghost">
          둘러보기
        </LinkButton>
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

import Button from '@/components/Button/Button';
import ButtonSocialLogin from '@/components/ButtonSocialLogin/ButtonSocialLogin';
import { css } from '@styled-system/css';

export default function LoginPage() {
  return (
    <main className={MainWrapperCss}>
      <div className={LoginButtonListWrapperCss}>
        <ButtonSocialLogin type="kakao" />
        <ButtonSocialLogin type="apple" />
        <Button size="large" variant="ghost">
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
  display: 'flex',
  gap: '8px',
  flexDirection: 'column',
  width: '100%',
  alignItems: 'center',
});

import Link from 'next/link';
import LogoIcon from '@/app/LogoIcon';
import { css } from '@styled-system/css';
import { styled } from '@styled-system/jsx';

export default function Home() {
  return (
    <main className={MainWrapperCss}>
      <div>
        <LogoIcon />
        <h1 className={MainTitleCss}>하루 10분의 변화를 경험하세요.</h1>
      </div>
      <Link className={LinkCss} href={'/select'}>
        <LoginButton>게스트 로그인</LoginButton>
      </Link>
    </main>
  );
}

const MainWrapperCss = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',

  bgImage: 'url(/images/login_bg.png)',
  bgPosition: 'center',
  bgRepeat: 'no-repeat',
  bgSize: 'cover',

  width: '100%',
  height: '100vh',
  padding: '118px 16px 50px 16px',
});

const Subtitle18Token = {
  lineHeight: '24px',
  fontSize: '18px',
  fontWeight: 600,
};

const MainTitleCss = css({
  color: '#fff',
  textShadow: '0px 0px 5px rgba(0, 0, 0, 0.08)',
  marginTop: '8px',
  ...Subtitle18Token,
});

const LoginButton = styled('button', {
  base: {
    width: '100%',
    padding: '16px 0px',
    cursor: 'pointer',

    borderRadius: '30px',
    boxShadow: '0px 4px 30px 5px rgba(18, 23, 41, 0.15)',
    background: '#fff',

    fontSize: '16px',
    fontWeight: 600,
    color: '#191F28',
  },
});

const LinkCss = css({
  width: '100%',
});

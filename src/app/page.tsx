import Link from 'next/link';
import LogoIcon from '@/app/LogoIcon';
import { css } from '@styled-system/css';
import { flex } from '@styled-system/patterns';

export default function Home() {
  return (
    <main className={MainWrapperCss}>
      <div className={logoCss}>
        <LogoIcon />
        <h1 className={MainTitleCss}>하루 10분의 변화를 경험하세요.</h1>
      </div>
      <Link className={LinkCss} href={'/select'}>
        <button type={'button'} className={LoginButtonCss}>
          게스트 로그인
        </button>
      </Link>
    </main>
  );
}

const logoCss = flex({
  flexDirection: 'column',
  alignItems: 'center',
});

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

const MainTitleCss = css({
  color: '#fff',
  textShadow: '0px 0px 5px rgba(0, 0, 0, 0.08)',
  marginTop: '8px',
  textStyle: 'title1', // pretendard 사용예시로 일단 임시 주석입니당
});

const LoginButtonCss = css({
  width: '100%',
  padding: '16px 0px',
  cursor: 'pointer',

  borderRadius: '30px',
  boxShadow: '0px 4px 30px 5px rgba(18, 23, 41, 0.15)',
  background: 'basicColor.white', // token 적용
  textStyle: 'title3', // pretendard 사용예시로 일단 임시 주석입니당
});

const LinkCss = css({
  width: '100%',
});

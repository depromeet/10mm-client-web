import React from 'react';
import Image from 'next/image';
import { css } from '@/styled-system/css';

function ErrorPage() {
  const targetDate = '2024-05-21T03:00:00.000Z';

  const now = new Date().getTime();
  const target = new Date(targetDate).getTime();

  // 이후가 되면 null 리턴
  if (now > target) return null;

  return (
    <div className={containerCss}>
      <main className={MainWrapperCss}>
        <div className={imageWrapperCss}>
          <Image src={'/images/crying-face.png'} width={80} height={80} alt={'crying-face'} />
        </div>
        <div className={titleWrapperCss}>
          <div className={titleCss}>서버 점검 안내</div>
          <p className={subTitleCss}>
            서버 이전 작업으로 인해, 점검중입니다.
            <br />
            양해 부탁드립니다.
            <br />
            <br />
            점검 예정 시간 : ~ 2024년 5월 21일 3시
          </p>
        </div>
      </main>
    </div>
  );
}

export default ErrorPage;

const containerCss = css({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 99999,
  background: '#18181D',
  maxWidth: '475px',
  margin: 'auto',
  height: '100%',
  overflow: 'hidden',
});

const MainWrapperCss = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',

  width: '100%',
  height: '100vh',
  padding: '118px 16px 50px 16px',
});

const imageWrapperCss = css({
  marginBottom: '18px',
});

const titleWrapperCss = css({
  display: 'flex',
  gap: '6px',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: '60px',
});

const titleCss = css({
  textStyle: 'subtitle2',
  color: 'text.primary',
});

const subTitleCss = css({
  textStyle: 'body5',
  color: 'gray.gray600',
  textAlign: 'center',
});

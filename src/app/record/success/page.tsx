'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import lottieJson from '@/assets/lotties/coin-double.json';
import Button from '@/components/Button/Button';
import { ROUTER } from '@/constants/router';
import { NATIVE_METHODS } from '@/utils/nativeMethod';
import { css } from '@styled-system/css';
import Lottie from 'react-lottie-player';

export default function MissionSuccessPage() {
  const router = useRouter();
  const onClickConfirmButton = () => router.replace(ROUTER.HOME);

  useEffect(() => {
    NATIVE_METHODS.VIBRATE();
  }, []);

  return (
    <main className={mainWrapperCss}>
      <Image className={gradientCss} src="/images/bg-gradient.png" alt="success" fill />
      <div className={containerCss}>
        <div className={contentWrapperCss}>
          <Lottie
            className={css({
              position: 'absolute',
              top: '0',
              left: '0',
              width: '100%',
              height: '100%',
            })}
            loop
            animationData={lottieJson}
            play
          />

          <div className={lottieWrapperCss}>
            <Image className={imageCss} src="/images/coin.png" alt="success" fill />
          </div>
          <div className={titleWrapperCss}>
            <span className={titleCss}>오늘의 미션완료!</span>
            <span className={subTitleCss}>{'잘 하셨어요, 오늘도 한 걸음 성장하셨네요 :)'}</span>
          </div>
        </div>
        <div className={buttonWrapperCss}>
          <Button type="button" size="large" variant="primary" onClick={onClickConfirmButton}>
            <span className={buttonTextCss}>확인</span>
          </Button>
        </div>
      </div>
    </main>
  );
}

const gradientCss = css({
  height: '100vh',
  width: '100%',
  maxWidth: 'maxWidth',
  position: 'absolute',
  top: '0',
  objectFit: 'cover',
  backgroundPosition: 'center',
  left: '0',
});

const mainWrapperCss = css({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'bg.surface2',
  height: '100vh',
  position: 'relative',
});

const buttonWrapperCss = css({
  padding: '16px 24px',
});

const containerCss = css({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'space-between',
  // padding: '16px 24px',
});

const contentWrapperCss = css({
  flex: 1,
  justifyContent: 'center',
  display: 'flex',
  flexDirection: 'column',
  animation: 'fadeIn 0.3s linear',
  position: 'relative',
});

const titleWrapperCss = css({
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',
  gap: '4px',
  position: 'relative',
  top: '-20px',
});

const titleCss = css({
  textStyle: 'title2',
  color: 'text.primary',
});

const subTitleCss = css({
  textStyle: 'body4',
  color: 'text.secondary',
});

const imageCss = css({
  background: 'transparent',
});

const lottieWrapperCss = css({
  position: 'relative',
  minHeight: '260px',
  maxWidth: '100vw',
  width: '100%',
  '& img': {
    objectFit: 'contain',
  },
});

const buttonTextCss = css({
  textStyle: 'subtitle4',
});

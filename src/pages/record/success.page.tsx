/* eslint-disable @next/next/no-img-element */

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Button from '@/components/Button/Button';
import { ROUTER } from '@/constants/router';
import { NATIVE_METHODS } from '@/utils/nativeMethod';
import { css } from '@styled-system/css';

export default function MissionSuccessPage() {
  const router = useRouter();
  const onClickConfirmButton = () => router.replace(ROUTER.HOME);

  useEffect(() => {
    NATIVE_METHODS.VIBRATE();
  }, []);

  return (
    <main className={mainWrapperCss}>
      <div className={containerCss}>
        <div className={contentWrapperCss}>
          <div className={lottieWrapperCss}>
            <img className={imageCss} src="/images/coin-full.png" alt="success" />

            <div className={titleWrapperCss}>
              <span className={titleCss}>오늘의 미션완료!</span>
              <span className={subTitleCss}>{'잘 하셨어요, 오늘도 한 걸음 성장하셨네요 :)'}</span>
            </div>
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

const mainWrapperCss = css({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'bg.surface2',
  position: 'relative',
  height: '100vh',
});

const buttonWrapperCss = css({
  padding: '16px 24px',
  zIndex: 'appBar',
  position: 'fixed',
  bottom: '0',
  width: '100%',
  maxWidth: 'maxWidth',
});

const containerCss = css({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'space-between',
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
  position: 'absolute',
  zIndex: 1,
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',
  gap: '4px',
  top: '60%',
  width: '100%',
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
  width: '100%',
  height: '100vh',
  objectFit: 'contain',
});

const lottieWrapperCss = css({
  position: 'relative',
  margin: '0px auto 0 auto',
  width: '100%',
});

const buttonTextCss = css({
  textStyle: 'subtitle4',
});

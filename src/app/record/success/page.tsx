'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
// import lottieJson from '@/assets/lotties/lottieExample.json';
import Button from '@/components/Button/Button';
import { ROUTER } from '@/constants/router';
import { css } from '@styled-system/css';
// import Lottie from 'react-lottie-player';

export default function MissionSuccessPage() {
  const router = useRouter();
  const onClickConfirmButton = () => router.replace(ROUTER.HOME);

  return (
    <main className={mainWrapperCss}>
      <div className={containerCss}>
        <div className={contentWrapperCss}>
          <div className={lottieWrapperCss}>
            <Image src="/assets/mission/10mm-success.svg" alt="success" fill />
            {/* <Lottie loop animationData={lottieJson} play /> */}
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

const mainWrapperCss = css({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'bg.surface2',
  height: '100vh',
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

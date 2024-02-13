'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import lottieJson from '@/assets/lotties/coin-double.json';
import Button from '@/components/Button/Button';
import { ROUTER } from '@/constants/router';
import { css } from '@styled-system/css';
import Lottie from 'react-lottie-player';

export default function GuestMissionSuccessPage() {
  const router = useRouter();
  const onClickConfirmButton = () => router.push(ROUTER.AUTH.LOGIN);

  return (
    <main className={mainWrapperCss}>
      <div className={containerCss}>
        <div className={contentWrapperCss}>
          <Lottie className={lottieCss} loop animationData={lottieJson} play />

          <div className={lottieWrapperCss}>
            <Image className={imageCss} src="/images/coin.png" alt="success" fill />
          </div>
          <div className={titleWrapperCss}>
            <span className={titleCss}>오늘의 미션완료!</span>
            <span className={subTitleCss}>{'잘 하셨어요, 오늘도 한 걸음 성장하셨네요 :)'}</span>
          </div>
        </div>
        <Button type="button" size="large" variant="primary" onClick={onClickConfirmButton}>
          <span className={buttonTextCss}>10분만 제대로 즐기기</span>
        </Button>
      </div>
    </main>
  );
}
const lottieCss = css({
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
});

const imageCss = css({
  width: '50%',
  background: 'transparent',
});

const mainWrapperCss = css({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'bg.surface2',
  height: '100vh',
});

const containerCss = css({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '16px 24px',
});

const contentWrapperCss = css({
  flex: 1,
  justifyContent: 'center',
  display: 'flex',
  flexDirection: 'column',
  gap: '25px',
});

const titleWrapperCss = css({
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',
  gap: '4px',
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
  margin: '24px auto 0 auto',
  width: '50%',
  '& img': {
    objectFit: 'contain',
  },
});

const buttonTextCss = css({
  textStyle: 'subtitle4',
});

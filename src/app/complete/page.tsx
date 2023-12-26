'use client';
import { useRouter } from 'next/navigation';
import lottieJson from '@/assets/lotties/lottieExample.json';
import Button from '@/components/Button/Button';
import { css } from '@styled-system/css';
import Lottie from 'react-lottie-player';

export default function CompletePage() {
  const router = useRouter();
  const onClickConfirmButton = () => router.push('/');

  return (
    <main className={mainWrapperCss}>
      <div className={containerCss}>
        <div className={contentWrapperCss}>
          <div className={titleWrapperCss}>
            <span className={titleCss}>오늘의 미션완료!</span>
            <span className={subTitleCss}>{'잘 하셨어요, 오늘도 한 걸음 성장하셨네요 :)'}</span>
          </div>
          <div className={lottieWrapperCss}>
            <Lottie loop animationData={lottieJson} play />
          </div>
        </div>
        <Button type="button" size="large" variant="primary" onClick={onClickConfirmButton}>
          <span className={buttonTextCss}>확인</span>
        </Button>
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
  textStyle: 'body3',
  color: 'text.secondary',
});

const lottieWrapperCss = css({});

const buttonTextCss = css({
  textStyle: 'subtitle4',
});

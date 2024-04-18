import { useEffect } from 'react';
import Image from 'next/image';
import { css } from '@/styled-system/css';

// reset 버튼 확인 필요
export default function Error({
  error,
  reset = () => null,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const onClickResetButton = () => reset();

  useEffect(() => {
    // TODO: ga로 쏘거나 하는 등의 플로우는 필요없을지 하는 생각
    console.error(error);
  }, [error]);

  return (
    <main className={MainWrapperCss}>
      <div className={imageWrapperCss}>
        <Image src={'/images/crying-face.png'} width={80} height={80} alt={'crying-face'} />
      </div>
      <div className={titleWrapperCss}>
        <div className={titleCss}>시스템에 문제가 생겼어요.</div>
        <p className={subTitleCss}>
          에러가 발생해 페이지를 로딩할 수 없어요.
          <br />
          이전 페이지로 돌아가 주세요.
        </p>
      </div>
      <button className={resetButtonCss} onClick={onClickResetButton} type="button">
        이전 페이지로 돌아가기
      </button>
    </main>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
Error.getInitialProps = ({ res, err }: { res: any; err: any }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

  const reset = () => null;
  return { statusCode, error: err, reset };
};

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

const resetButtonCss = css({
  color: 'text.secondary',
  textStyle: 'subtitle4',
  backgroundColor: 'gray.gray200',
  width: '177px',
  height: '44px',
  padding: '12px 20px',
  borderRadius: '16px',
});

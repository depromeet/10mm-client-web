'use client';

import { useRouter } from 'next/navigation';
import Button from '@/components/Button/Button';
import { css } from '@/styled-system/css';
import { grid } from '@/styled-system/patterns';

function WithdrawalPage() {
  const router = useRouter();

  const onCancel = () => {
    router.back();
  };

  const onWithdrawal = () => {};

  return (
    <>
      <section>
        <h1 className={headingCss}>벌써 헤어지다니 너무 아쉬워요...</h1>
        <p className={subHeadingCss}>지금 탈퇴하시면 미션과 관련된 모든 내용이 삭제돼요. </p>
        <p className={subHeadingCss}>그래도 탈퇴하시겠어요?</p>
      </section>

      {/* TODO : 슬픈 이미지 */}

      <section className={buttonWrapper}>
        <Button variant="secondary" onClick={onCancel}>
          취소
        </Button>
        <Button variant="primary" onClick={onWithdrawal}>
          탈퇴하기
        </Button>
      </section>
    </>
  );
}

export default WithdrawalPage;

const headingCss = css({
  textStyle: 'title2',
  color: 'text.primary',
  marginBottom: '4px',
});

const subHeadingCss = css({
  color: 'text.secondary',
  textStyle: 'body4',
});

const buttonWrapper = grid({
  gap: '8px',
  gridTemplateColumns: '1fr 1fr',
  margin: '16px 0',
});

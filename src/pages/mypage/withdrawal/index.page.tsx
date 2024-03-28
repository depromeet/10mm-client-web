import Image from 'next/image';
import { useRouter } from 'next/router';
import { useWithdrawalMember } from '@/apis/member';
import Button from '@/components/Button/Button';
import Header from '@/components/Header/Header';
import { useSnackBar } from '@/components/SnackBar/SnackBarProvider';
import { ROUTER } from '@/constants/router';
import { removeTokens } from '@/services/auth/actions';
import { css } from '@/styled-system/css';
import { flex, grid } from '@/styled-system/patterns';

function WithdrawalPage() {
  const router = useRouter();
  const { triggerSnackBar } = useSnackBar();

  const { mutate } = useWithdrawalMember({
    onSuccess: () => {
      removeTokens();
      triggerSnackBar({
        message: '회원탈퇴 했습니다.',
      });
      router.push(ROUTER.AUTH.LOGIN);
    },
    onError: () => {
      triggerSnackBar({
        message: '회원탈퇴에 실패했습니다.',
      });
    },
  });

  const onCancel = () => {
    router.back();
  };

  const onWithdrawal = () => {
    mutate();
  };

  return (
    <>
      <Header rightAction="none" title="회원 탈퇴" />
      <main className={mainCss}>
        <section>
          <h1 className={headingCss}>벌써 헤어지다니 너무 아쉬워요...</h1>
          <p className={subHeadingCss}>지금 탈퇴하시면 미션과 관련된 모든 내용이 삭제돼요. </p>
          <p className={subHeadingCss}>그래도 탈퇴하시겠어요?</p>
        </section>

        {/* TODO : 슬픈 이미지 */}
        {/* 지금은 임시. */}
        <div className={imageWrapperCss}>
          <Image src={'/images/crying-face.png'} width={120} height={120} alt={'crying-face'} />
        </div>

        <section className={buttonWrapper}>
          <Button variant="secondary" onClick={onCancel}>
            취소
          </Button>
          <Button variant="primary" onClick={onWithdrawal}>
            탈퇴하기
          </Button>
        </section>
      </main>
    </>
  );
}

export default WithdrawalPage;

const mainCss = flex({
  padding: '24px 16px 0',
  flex: 1,

  justifyContent: 'space-between',
  flexDirection: 'column',
});

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

const imageWrapperCss = css({
  margin: '100px auto',
});

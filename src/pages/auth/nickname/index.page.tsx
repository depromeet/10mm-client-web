import { useRouter } from 'next/router';
import { useNicknameRegister } from '@/apis/auth';
import { isSeverError } from '@/apis/instance.api';
import Button from '@/components/Button/Button';
import Header from '@/components/Header/Header';
import Input from '@/components/Input/Input';
import { useSnackBar } from '@/components/SnackBar/SnackBarProvider';
import { ROUTER } from '@/constants/router';
import useNickname from '@/hooks/useNickname';
import { css } from '@styled-system/css';

// TODO : 강제 접근 안되도록 수정 필요
export default function AuthNickNamePage() {
  const { nickname, handleNicknameChange, massageState, handleDuplicateCheck } = useNickname();

  const router = useRouter();
  const { triggerSnackBar } = useSnackBar();
  const { mutate } = useNicknameRegister({
    onSuccess: () => {
      router.replace(ROUTER.HOME);
    },
    onError: (error) => {
      if (isSeverError(error)) {
        triggerSnackBar({
          message: error.response.data.data.message,
        });
        return;
      }
    },
  });

  const isSubmitButtonDisabled = !nickname;

  const handleSubmit = async () => {
    if (!nickname) return;
    mutate({ nickname });
  };

  return (
    <main className={mainWrapperCss}>
      <Header rightAction="none" />
      <div className={containerCss}>
        <div className={subTitleWrapperCss}>
          <div className={subTitleCss}>닉네임을 설정해주세요.</div>
          <div className={subTitleDescriptionCss}>20자 이내의 한글, 영문, 숫자 입력이 가능합니다.</div>
        </div>

        <Input
          variant="normal-button"
          value={nickname}
          onChange={handleNicknameChange}
          placeholder="닉네임을 입력하세요"
          name="닉네임"
          maxLength={20}
          buttonText="중복확인"
          buttonDisabeld={Boolean(massageState.errorMsg)}
          errorMsg={massageState.errorMsg}
          validMsg={massageState.validMsg}
          onTextButtonClick={handleDuplicateCheck}
        />
        <div className={buttonContainerCss}>
          <Button variant={'cta'} size={'large'} onClick={handleSubmit} disabled={isSubmitButtonDisabled}>
            완료
          </Button>
        </div>
      </div>
    </main>
  );
}

const mainWrapperCss = css({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
});

const containerCss = css({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  gap: '36px',
  padding: '24px 16px',
  position: 'relative',
});

const subTitleWrapperCss = css({
  display: 'flex',
  gap: '4px',
  flexDirection: 'column',
});

const subTitleCss = css({
  textStyle: 'title2',
  color: 'text.primary',
});

const subTitleDescriptionCss = css({
  textStyle: 'body1',
  color: 'text.secondary',
});

const buttonContainerCss = css({
  display: 'flex',
  justifyContent: 'flex-end',
});

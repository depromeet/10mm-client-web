'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useNicknameRegister } from '@/apis/auth';
import { isSeverError } from '@/apis/instance.api';
import Button from '@/components/Button/Button';
import Header from '@/components/Header/Header';
import Input from '@/components/Input/Input';
import { useSnackBar } from '@/components/SnackBar/SnackBarProvider';
import { ROUTER } from '@/constants/router';
import { css } from '@styled-system/css';

export default function AuthNickNamePage() {
  const [nickname, setNickname] = useState('');
  const router = useRouter();
  const { triggerSnackBar } = useSnackBar();
  const { mutate } = useNicknameRegister({
    onSuccess: () => {
      router.push(ROUTER.HOME);
    },
    onError: (error) => {
      if (isSeverError(error)) {
        triggerSnackBar({
          message: error.data.message,
        });
        return;
      }
    },
  });

  const handleNickname = (value: string) => {
    setNickname(value);
  };

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
          type="text"
          placeholder="미션명을 입력하세요"
          name="닉네임"
          required
          maxLength={20}
          value={nickname}
          onChange={handleNickname}
          description="description"
        />
        <div className={buttonContainerCss}>
          <Button variant={'cta'} size={'medium'} onClick={handleSubmit} disabled={isSubmitButtonDisabled}>
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

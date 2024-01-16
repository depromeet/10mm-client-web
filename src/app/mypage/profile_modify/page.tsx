'use client';

import { type ChangeEvent, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUploadProfileImage, useUploadProfileImageComplete } from '@/apis/member';
import Header from '@/components/Header/Header';
import Icon from '@/components/Icon';
import Input from '@/components/Input/Input';
import { useSnackBar } from '@/components/SnackBar/SnackBarProvider';
import Thumbnail from '@/components/Thumbnail/Thumbnail';
import { ROUTER } from '@/constants/router';
import { checkImageType, useImage } from '@/hooks/useImage';
import { css } from '@/styled-system/css';

const PREVIOUS_NICKNAME = '수미칩';

function ProfileModifyPage() {
  const router = useRouter();

  const [nickname, setNickname] = useState(PREVIOUS_NICKNAME);
  const imageRef = useRef<HTMLInputElement>(null);

  const { uploadImageChange, imagePreview, imageFile } = useImage();
  const { triggerSnackBar } = useSnackBar();
  const { mutateAsync: uploadProfileMutate } = useUploadProfileImage(imageFile, {});
  const { mutateAsync: uploadProfileCompleteMutate } = useUploadProfileImageComplete({
    onSuccess: () => {
      triggerSnackBar({
        message: '프로필 수정이 완료되었습니다.',
      });
      router.replace(ROUTER.MYPAGE.HOME);
    },
  });
  const handleUploadChange = ({ target: { files } }: ChangeEvent<HTMLInputElement>) => {
    if (!files) return;

    uploadImageChange(files);
  };

  const handleImageClick = () => {
    imageRef.current?.click();
  };

  const isSubmitButtonDisabled = nickname === PREVIOUS_NICKNAME || nickname.length === 0;

  const onSubmit = async () => {
    const imageFileExtension = checkImageType(imageFile?.type);

    if (!imageFileExtension) return;
    try {
      await uploadProfileMutate({
        imageFileExtension,
      });
      await uploadProfileCompleteMutate({
        imageFileExtension,
        nickname: nickname,
      });
    } catch (e) {
      triggerSnackBar({
        message: '프로필 수정이 실패하였습니다. 다시 시도해주세요.',
      });
    }
  };

  return (
    <>
      <Header
        rightAction="text-button"
        title="프로필 수정"
        rightButtonProps={{ disabled: isSubmitButtonDisabled, onClick: onSubmit }}
      />

      <main className={mainCss}>
        <section className={thumbnailWrapperCss} onClick={handleImageClick}>
          <input
            accept="image/x-png,image/jpeg,image/gif"
            onChange={handleUploadChange}
            className={hiddenInputCss}
            ref={imageRef}
            type="file"
          />
          {imagePreview ? (
            <Thumbnail size="h80" url={imagePreview} variant={'filled'} />
          ) : (
            <Thumbnail size="h80" variant={'null'} />
          )}
          <div className={cameraIconWrapperCss}>
            <Icon name="camera" width={14} height={14} color="icon.secondary" />
          </div>
        </section>
        <Input value={nickname} onChange={setNickname} name="닉네임" maxLength={20} />;
      </main>
    </>
  );
}

export default ProfileModifyPage;

const hiddenInputCss = css({
  display: 'none',
});

const mainCss = css({
  padding: '0 16px',
});

const thumbnailWrapperCss = css({
  margin: '24px auto',
  width: 'fit-content',
  position: 'relative',
});

const cameraIconWrapperCss = css({
  width: '24px',
  height: '24px',
  borderRadius: '24px',
  backgroundColor: 'gray.gray400',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  position: 'absolute',
  bottom: '-2px',
  right: '-4px',
});

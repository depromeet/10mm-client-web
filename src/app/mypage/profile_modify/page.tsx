'use client';

import { type ChangeEvent, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useGetMembersMe, useUploadProfileImage, useUploadProfileImageComplete } from '@/apis/member';
import Header from '@/components/Header/Header';
import Icon from '@/components/Icon';
import Input from '@/components/Input/Input';
import { useSnackBar } from '@/components/SnackBar/SnackBarProvider';
import Thumbnail from '@/components/Thumbnail/Thumbnail';
import { ROUTER } from '@/constants/router';
import { checkImageType, getUrlImageType, useImage } from '@/hooks/useImage';
import useNickname from '@/hooks/useNickname';
import { css } from '@/styled-system/css';

function ProfileModifyPage() {
  const { data } = useGetMembersMe();

  const { nickname, handleNicknameChange, massageState, handleDuplicateCheck } = useNickname(data?.nickname);

  const router = useRouter();

  //TODO: 완료 버튼 disabled되는 조건 추가 -> 이미지가 바뀌지 않았을경우, 기존 닉네임에서 바뀐게 없을 경우, 중복확인 결과 사용 불가능한 닉네임일 경우
  const rightButtonDisabled = nickname.length === 0;

  const imageRef = useRef<HTMLInputElement>(null);
  const duplicateCheckButtonDisabled = data?.nickname === nickname;

  const { uploadImageChange, imagePreview, imageFile } = useImage(data?.profileImageUrl || '');
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

  const onSubmit = async () => {
    const imageType = imageFile?.type || getUrlImageType(data?.profileImageUrl || '');
    const imageFileExtension = checkImageType(imageType);

    try {
      imageFileExtension &&
        (await uploadProfileMutate({
          imageFileExtension,
        }));
      await uploadProfileCompleteMutate({
        imageFileExtension: imageFileExtension ? imageFileExtension : undefined,
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
        rightButtonProps={{ disabled: rightButtonDisabled, onClick: onSubmit }}
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
        <Input
          variant="normal-button"
          value={nickname}
          onChange={handleNicknameChange}
          name="닉네임"
          maxLength={20}
          buttonText="중복확인"
          buttonDisabeld={duplicateCheckButtonDisabled}
          errorMsg={massageState.errorMsg}
          validMsg={massageState.validMsg}
          onTextButtonClick={handleDuplicateCheck}
        />
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

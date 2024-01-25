'use client';

import { type ChangeEvent, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useGetMembersMe, useUploadProfileImage, useUploadProfileImageComplete } from '@/apis/member';
import Dialog from '@/components/Dialog/Dialog';
import Header from '@/components/Header/Header';
import Icon from '@/components/Icon';
import Input from '@/components/Input/Input';
import { useSnackBar } from '@/components/SnackBar/SnackBarProvider';
import Thumbnail from '@/components/Thumbnail/Thumbnail';
import { ROUTER } from '@/constants/router';
import { checkImageType, getUrlImageType, useImage } from '@/hooks/useImage';
import useModal from '@/hooks/useModal';
import useNickname from '@/hooks/useNickname';
import { css } from '@/styled-system/css';

interface DialogProps {
  isOpen: boolean;
  onClose: VoidFunction;
  onConfirm: VoidFunction;
  onCancel: VoidFunction;
  logData?: Record<string, string | number>;
}

const validateProfileData = ({
  nickname,
  imageFile,
  isError,
  isNicknameValid,
}: {
  nickname: string;
  imageFile: File | undefined;
  isError: boolean;
  isNicknameValid: boolean;
}) => {
  if (nickname.length === 0) return true;
  if (isError) return true;
  if (imageFile) return false;
  return isNicknameValid;
};

function ProfileModifyPage() {
  const { data } = useGetMembersMe();

  const { nickname, handleNicknameChange, massageState, handleDuplicateCheck } = useNickname(data?.nickname);

  const router = useRouter();

  const imageRef = useRef<HTMLInputElement>(null);

  const { uploadImageChange, imagePreview, imageFile } = useImage(data?.profileImageUrl || '');
  const { triggerSnackBar } = useSnackBar();
  const { mutateAsync: uploadProfileMutate } = useUploadProfileImage(imageFile, {});
  const { mutateAsync: uploadProfileCompleteMutate } = useUploadProfileImageComplete({
    onSuccess: () => {
      triggerSnackBar({
        message: '프로필 수정이 완료되었습니다.',
        offset: 'appBar',
      });
      router.replace(ROUTER.MYPAGE.HOME);
    },
  });

  const rightButtonDisabled = validateProfileData({
    nickname,
    imageFile,
    isError: Boolean(massageState.errorMsg),
    isNicknameValid: data?.nickname === nickname,
  });

  const duplicateCheckButtonDisabled = data?.nickname === nickname;

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

  const { isOpen: isCancleModalOpen, openModal: openCancleModal, closeModal: closeCancleModal } = useModal();
  const onExit = () => {
    router.replace(ROUTER.MYPAGE.HOME);
  };
  const onCancel = () => {};

  function CancleDialog({ onConfirm, logData, ...props }: DialogProps) {
    return (
      <Dialog
        variant={'default'}
        title="프로필 수정을 취소하시겠어요?"
        content="나가게 되면 변경 사항은 저장되지 않아요."
        confirmText="나가기"
        cancelText="취소"
        onConfirm={onConfirm}
        {...props}
      />
    );
  }

  return (
    <div className={backgroundCss}>
      <Header
        rightAction="text-button"
        title="프로필 수정"
        textColor={'text.primary'}
        iconColor={'icon.primary'}
        headerBgColor={'transparent'}
        rightButtonProps={{ disabled: rightButtonDisabled, onClick: onSubmit }}
        onBackAction={openCancleModal}
      />
      <div className={dimCss} />
      <main className={mainCss}>
        <section className={myTabContainerCss}>
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
        </section>
        <CancleDialog isOpen={isCancleModalOpen} onClose={closeCancleModal} onCancel={onCancel} onConfirm={onExit} />
      </main>
    </div>
  );
}

export default ProfileModifyPage;

const myTabContainerCss = css({
  position: 'relative',
  width: '100%',
  height: '100vh',
  backgroundColor: 'bg.surface2',
  borderTopRightRadius: '28px',
  borderTopLeftRadius: '28px',
  padding: '52px 24px 0',
  zIndex: 4,
});

const hiddenInputCss = css({
  display: 'none',
});

const mainCss = css({
  paddingTop: '184px',
  height: '100vh',
  flex: 1,
});

const backgroundCss = css({
  background: 'gradients.primary',
  position: 'relative',
});

const dimCss = css({
  position: 'absolute',
  width: '100%',
  height: '100%',
  background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.34) 0%, rgba(0, 0, 0, 0.15) 100%)',
  top: 0,
  zIndex: 1,
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

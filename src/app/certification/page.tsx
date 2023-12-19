'use client';

import { type ChangeEvent, useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button/Button';
import Dialog from '@/components/Dialog/Dialog';
import EllipseCameraIcon from '@/components/Icon/EllipseCameraIcon';
import NormalClose from '@/components/Icon/NormalClose';
import PlusCircle from '@/components/Icon/PlusCircle';
import useModal from '@/hooks/useModal';
import { css } from '@styled-system/css';

export default function CertificationPage() {
  const router = useRouter();
  const { isOpen, openModal, closeModal } = useModal();
  const [remark, setRemark] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  const handleUploadChange = async ({ target: { files } }: ChangeEvent<HTMLInputElement>) => {
    const file = files?.[0];
    if (!file) {
      return;
    }

    setImagePreview(URL.createObjectURL(file));
  };

  const onImageClick = () => {
    imageRef.current?.click();
  };

  const onChangeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    // TODO: 200자 제한
    setRemark(e.target.value);
  };

  const onClickSubmitButton = () => {
    router.replace('/complete');
  };
  const onClickModalConfirm = () => {
    router.push('/');
  };

  const isButtonDisabled = () => {
    return !imagePreview;
  };

  return (
    <main className={mainWrapperCss}>
      <div className={headerWrapperCss}>
        <div className={headerTitleCss}>미션 인증</div>
        <div className={headerRightCss} onClick={openModal}>
          <NormalClose />
        </div>
      </div>
      <div className={containerCss}>
        <div>
          <div className={imageUploadWrapperCss}>
            <input
              accept="image/x-png,image/jpeg,image/gif"
              onChange={handleUploadChange}
              className={hiddenInputCss}
              ref={imageRef}
              type="file"
            />
            <div className={imageUploadTitleWrapperCss}>
              <p className={imageUploadTitleCss}>
                <span className={imageUploadTitleTextCss}>인증 사진 업로드</span>
                <span className={imageUploadTitleTextIconCss}>*</span>
              </p>
            </div>
            {!!imagePreview ? (
              <div className={imageWrapperCss}>
                <Image
                  src={imagePreview}
                  alt="missionRemarkImage"
                  width={100}
                  height={100}
                  className={imageUploadInputAreaCss}
                  onClick={onImageClick}
                />
                <EllipseCameraIcon className={imageIconCss} />
              </div>
            ) : (
              <div className={imageUploadInputAreaCss} onClick={onImageClick}>
                <PlusCircle />
                <div className={imageUploadInputAreaTextCss}>
                  인증한 사진이 없네요.
                  <br />
                  한번 올려볼까요?
                </div>
              </div>
            )}
          </div>
          <div className={remarkAreaWrapperCss}>
            <div className={remarkAreaTitleCss}>일지 작성</div>
            <textarea
              placeholder="일지를 작성해주세요"
              className={remarkAreaInputCss}
              value={remark}
              onChange={onChangeText}
            />
            <div className={remarkAreaCountWrapperCss}>
              <span className={remarkAreaCountTextCss}>{remark.length}</span>
              <span className={remarkAreaCountLimitCss}>/200</span>
            </div>
          </div>
        </div>
        <Button type="button" size="large" variant="cta" disabled={isButtonDisabled()} onClick={onClickSubmitButton}>
          <span className={buttonTextCss}>완료</span>
        </Button>
      </div>
      <Dialog
        variant="default"
        title="잠깐! 정말 나가시겠습니까?"
        content="미션 완료 인증을 하지 않으면 지금까지 집중한 시간들이 사라집니다."
        cancelText="취소"
        confirmText="나가기"
        onConfirm={onClickModalConfirm}
        isOpen={isOpen}
        onClose={closeModal}
      />
    </main>
  );
}

const mainWrapperCss = css({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'bg.surface2',
  height: '100vh',
});

const headerWrapperCss = css({
  padding: '12px 8px 10px',
  maxHeight: '44px',
  height: 'inherit',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  alignItems: 'center',
});

const headerTitleCss = css({
  textStyle: 'subtitle1',
  color: 'text.primary',
  textAlign: 'center',
});

const headerRightCss = css({
  position: 'absolute',
  top: '0px',
  right: '8px',
  padding: '12px',
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
});

const containerCss = css({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '16px',
});

const buttonTextCss = css({
  textStyle: 'subtitle4',
});

const imageUploadWrapperCss = css({
  marginTop: '28px',
  gap: '12px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

const imageUploadTitleWrapperCss = css({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
});

const imageUploadTitleCss = css({
  display: 'flex',
  gap: '2px',
});

const imageUploadTitleTextCss = css({
  color: 'text.primary',
  textStyle: 'body2',
});

const imageUploadTitleTextIconCss = css({
  color: 'red.500',
});

const imageUploadInputAreaCss = css({
  width: 'calc(100vw - 32px)',
  height: 'calc(100vw - 32px)',
  borderRadius: '23.08px',
  borderWidth: '2px',
  borderColor: 'gray.gray400',
  borderStyle: 'dashed',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  gap: '8px',
});

const imageWrapperCss = css({
  position: 'relative',
});

const imageIconCss = css({
  position: 'absolute',
  bottom: '16px',
  right: '16px',
  pointerEvents: 'none',
});

const imageUploadInputAreaTextCss = css({
  textAlign: 'center',
  color: 'text.quaternary',
  textStyle: 'subtitle3',
});

const remarkAreaWrapperCss = css({
  marginTop: '24px',
  display: 'flex',
  gap: '8px',
  flexDirection: 'column',
});

const remarkAreaTitleCss = css({
  color: 'text.primary',
  textStyle: 'body2',
});

const remarkAreaInputCss = css({
  width: '100%',
  height: '86px',
  borderRadius: '16px',
  backgroundColor: 'bg.surface3',
  padding: '16px',
  color: 'text.primary',
  resize: 'none',
  borderColor: 'gray.gray400',
  outline: 'none',

  '&::placeholder': {
    color: 'text.quaternary',
    textStyle: 'body1',
  },
});

const remarkAreaCountWrapperCss = css({
  display: 'flex',
  justifyContent: 'flex-end',
});

const remarkAreaCountTextCss = css({
  color: 'text.tertiary',
  textStyle: 'body4',
});

const remarkAreaCountLimitCss = css({
  color: 'text.secondary',
  textStyle: 'body4',
});

const hiddenInputCss = css({
  display: 'none',
});

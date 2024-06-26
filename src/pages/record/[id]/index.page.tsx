import { type ChangeEvent, useRef, useState } from 'react';
import { type GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import RECORD_API from '@/apis/record';
import Button from '@/components/Button/Button';
import Dialog from '@/components/Dialog/Dialog';
import Icon from '@/components/Icon';
import Loading from '@/components/Loading';
import { type ModalProps } from '@/components/Modal/Modal';
import { useSnackBar } from '@/components/SnackBar/SnackBarProvider';
import { EVENT_LOG_CATEGORY, EVENT_LOG_NAME } from '@/constants/eventLog';
import { ROUTER } from '@/constants/router';
import { checkImageType, uploadImageToServer, useImage } from '@/hooks/useImage';
import useModal from '@/hooks/useModal';
import { eventLogger } from '@/utils';
import { css } from '@styled-system/css';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      id: context.query.id,
    },
  };
}

export default function MissionRecordPage(params: { id: string }) {
  const router = useRouter();

  const missionId = params.id as string;

  const { triggerSnackBar } = useSnackBar();
  const { isOpen, openModal, closeModal } = useModal();

  const { uploadImageChange, imagePreview, imageFile } = useImage();

  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [remark, setRemark] = useState('');

  const imageRef = useRef<HTMLInputElement>(null);

  const onChangeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    // TODO: 200자 제한
    setRemark(e.target.value);
  };

  const handleUploadChange = ({ target: { files } }: ChangeEvent<HTMLInputElement>) => {
    eventLogger.logEvent(EVENT_LOG_NAME.CERTIFICATION.CLICK_IMAGE_PREVIEW, EVENT_LOG_CATEGORY.CERTIFICATION);
    if (!files) return;

    uploadImageChange(files);
  };

  const onClickSubmitButton = async () => {
    if (!imageFile || !checkImageType(imageFile.type)) {
      return;
    }

    eventLogger.logEvent(EVENT_LOG_NAME.CERTIFICATION.CLICK_CONFIRM, EVENT_LOG_CATEGORY.CERTIFICATION, { remark });

    await onSubmit(missionId, imageFile);
  };

  const isButtonDisabled = !imagePreview || isSubmitLoading;

  const onImageClick = () => {
    imageRef.current?.click();
  };

  // react query 지우로 axios 호출
  const onSubmit = async (_missionId: string, _imageFile: File) => {
    setIsSubmitLoading(true);

    try {
      const { imageFileExtension } = await uploadImageToServer(_missionId, _imageFile);
      await RECORD_API.uploadComplete({ missionRecordId: _missionId, imageFileExtension, remark });

      router.replace(ROUTER.RECORD.SUCCESS);
    } catch (e) {
      triggerSnackBar({
        message: '미션 인증에 실패했습니다. 다시 시도해주세요.',
      });
      setIsSubmitLoading(false);
    }
  };

  return (
    <main className={mainWrapperCss}>
      <div className={headerWrapperCss}>
        {isSubmitLoading && <Loading />}
        <div className={headerTitleCss}>미션 인증</div>
        <div className={headerRightCss} onClick={openModal}>
          <Icon name="normal-close" />
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
                <Icon name="ellipse-camera-icon" className={imageIconCss} />
              </div>
            ) : (
              <div className={imageUploadInputAreaCss} onClick={onImageClick}>
                <Icon name="plus-circle-large" />
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
        <Button type="button" size="large" variant="cta" disabled={isButtonDisabled} onClick={onClickSubmitButton}>
          <span className={buttonTextCss}>완료</span>
        </Button>
      </div>
      <BackDialog isOpen={isOpen} onClose={closeModal} />
    </main>
  );
}

function BackDialog(props: ModalProps) {
  const router = useRouter();

  const onClickModalConfirm = () => {
    eventLogger.logEvent(EVENT_LOG_NAME.CERTIFICATION.CLICK_CANCEL, EVENT_LOG_CATEGORY.CERTIFICATION);
    router.replace(ROUTER.HOME);
    // TODO: 미션 완료 인증 제거
    RECORD_API.deleteInProgressRecord();
  };

  return (
    <Dialog
      variant="default"
      title="잠깐! 정말 나가시겠습니까?"
      content="미션 완료 인증을 하지 않으면 지금까지 집중한 시간들이 사라집니다."
      cancelText="취소"
      confirmText="나가기"
      onConfirm={onClickModalConfirm}
      {...props}
    />
  );
}

const mainWrapperCss = css({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'bg.surface2',
  height: '100%',
  paddingBottom: '60px',
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
  textStyle: 'body4',
});

const imageUploadTitleTextIconCss = css({
  color: 'red.500',
});

const imageUploadInputAreaCss = css({
  // 임시 방편용
  maxWidth: 'calc(475px - 32px)',
  maxHeight: 'calc(475px - 32px)',
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
  objectFit: 'contain',
});

const imageWrapperCss = css({
  // 임시 방편용
  maxWidth: 'calc(475px - 32px)',
  maxHeight: 'calc(475px - 32px)',
  position: 'relative',

  _before: {
    position: 'absolute',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
    content: "''",
    borderRadius: '23.08px',
    background: 'rgba(0, 0, 0, 0.1)',
    pointerEvents: 'none',
  },

  '& img': {
    objectFit: 'cover',
  },
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
  textStyle: 'body4',
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
  textStyle: 'body6',
});

const remarkAreaCountLimitCss = css({
  color: 'text.secondary',
  textStyle: 'body6',
});

const hiddenInputCss = css({
  display: 'none',
});

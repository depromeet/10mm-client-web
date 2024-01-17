import Button from '@/components/Button/Button';
import { type DefaultDialogProps } from '@/components/Dialog/Dialog.types';
import Modal from '@/components/Modal/Modal';
import { css } from '@styled-system/css';

/**
 * @description DefaultDialog 컴포넌트
 * @param onCancel 취소 버튼 클릭 시 실행되는 함수
 * @param onConfirm 확인 버튼 클릭 시 실행되는 함수
 * @param cancelText 취소 버튼 텍스트 (없을시 버튼 노출 안함)
 * @param confirmText  확인 버튼 텍스트 (없을시 버튼 노출 안함)
 * @param content 다이얼로그 내용
 * @param title 다이얼로그 타이틀
 *
 * @param onClose 다이얼로그 닫기
 * @param isOpen 다이얼로그 오픈 여부
 * @constructor
 */
function DefaultDialog({
  onCancel,
  onConfirm,
  cancelText,
  confirmText,
  title,
  content,
  onClose,
  isOpen,
}: DefaultDialogProps) {
  const handleCancel = () => {
    onClose();
    onCancel && onCancel();
  };

  const handleConfirm = () => {
    onClose();
    onConfirm && onConfirm();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} padding={'32px 24px 20px 24px'}>
      <div className={dialogWrapperCss}>
        <div className={textWrapperCss}>
          {title && <p className={dialogTitleCss}>{title}</p>}
          {content && <p className={dialogContentCss}>{content}</p>}
        </div>
        <div>
          <div className={buttonWrapperCss}>
            {cancelText && (
              <Button size={'medium'} variant={'ghost'} onClick={handleCancel} className={dialogButtonTextCss}>
                {cancelText}
              </Button>
            )}
            <Button size={'medium'} variant={'ghost'} onClick={handleConfirm}>
              {confirmText}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default DefaultDialog;

const dialogTitleCss = css({
  textStyle: 'title3',
  color: 'text.primary',
});

const dialogContentCss = css({
  textStyle: 'body4',
  color: 'text.secondary',
});

const dialogButtonTextCss = css({
  color: 'text.tertiary',
});

const dialogWrapperCss = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

const textWrapperCss = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
});

const buttonWrapperCss = css({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '4px',
});

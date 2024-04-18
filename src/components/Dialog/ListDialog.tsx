import Modal from '@/components/Modal/Modal';
import { css } from '@styled-system/css';

import { type ListDialogProps } from './Dialog.types';

/**
 * @description ListDialog 컴포넌트
 * @param title 다이얼로그 타이틀
 *
 * @param list 다이얼로그 리스트
 * @param onClose 다이얼로그 닫기
 * @param isOpen 다이얼로그 오픈 여부
 * @constructor
 */
function ListDialog({ title, onClose, isOpen, list }: ListDialogProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} padding={'32px 24px'}>
      <div className={dialogWrapperCss}>
        <div className={textWrapperCss}>{title && <p className={dialogTitleCss}>{title}</p>}</div>
        <div>
          {list.map((item) => (
            <div key={item.value} className={listWrapperCss}>
              {item.text}
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}

export default ListDialog;

const dialogTitleCss = css({
  textStyle: 'title3',
  color: 'text.primary',
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

const listWrapperCss = css({
  textStyle: 'text.secondary',
  color: 'text.secondary',
  padding: '8px 0',
});

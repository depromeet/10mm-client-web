import { type TextButtonHeaderType } from '@/components/Header/Header.types';
import { css } from '@/styled-system/css';

import Button from '../Button/Button';
import Icon from '../Icon';

function RightComponentHeader({ rightButtonText = '완료', rightButtonProps }: TextButtonHeaderType) {
  return (
    <div className={headerCss}>
      <Icon name="arrow-back" color="icon.primary" width={20} height={20} />
      <h2 className={titleCss}>프로필 수정</h2>
      <Button variant="ghost" size="medium" {...rightButtonProps}>
        {rightButtonText}
      </Button>
    </div>
  );
}

export default RightComponentHeader;
const headerCss = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '12px 12px',
});
const titleCss = css({
  textStyle: 'subtitle3',
  color: 'text.primary',
  flex: 1,
  marginLeft: '4px',
});

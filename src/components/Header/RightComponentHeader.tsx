import { useRouter } from 'next/navigation';
import { type TextButtonHeaderType } from '@/components/Header/Header.types';
import { css } from '@/styled-system/css';

import Button from '../Button/Button';
import Icon from '../Icon';

// 이거 여기에 있는 이유가?
function RightComponentHeader({ rightButtonText = '완료', rightButtonProps, title }: TextButtonHeaderType) {
  const router = useRouter();
  const goBack = () => {
    router.replace('/mypage');
  };
  return (
    <div className={headerCss}>
      <Icon name="arrow-back" color="icon.primary" width={20} height={20} onClick={goBack} className={iconCss} />
      <h2 className={titleCss}>{title}</h2>
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
const iconCss = css({
  cursor: 'pointer',
});

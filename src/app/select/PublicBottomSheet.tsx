import React, { type ComponentProps } from 'react';
import BottomSheet from '@/components/BottomSheet/BottomSheet';
import Header from '@/components/Header';
import Icon from '@/components/Icon';
import { css } from '@/styled-system/css';

interface Props extends Omit<ComponentProps<typeof BottomSheet>, 'headerElement'> {
  select: string | null;
  onSelect: (name: string) => void;
}

const PUBLIC_LIST = [{ name: '팔로워에게 공개' }, { name: '전체 공개' }, { name: '비공개' }];

function PublicBottomSheet(props: Props) {
  const onClick = (name: string) => {
    props.onSelect(name);
  };

  return (
    <BottomSheet
      headerElement={
        <Header.TextButton title="카테고리" onButtonClick={props.onClickOutside} isBackgroundTransparent />
      }
      {...props}
    >
      <ul className={listCss}>
        {PUBLIC_LIST.map((item) => (
          <li key={item.name} className={itemCss} onClick={() => onClick(item.name)}>
            <div>{item.name}</div>
            <div>{props.select === item.name && <Icon name="check-circle" color="purple.purple700" />}</div>
          </li>
        ))}
      </ul>
    </BottomSheet>
  );
}

export default PublicBottomSheet;

const listCss = css({
  width: '100%',
});

const itemCss = css({
  position: 'relative',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '12px 16px',
  color: 'text.secondary',
  textStyle: 'subtitle3',
  height: '46px',
  cursor: 'pointer',

  '& div': {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
  },
});

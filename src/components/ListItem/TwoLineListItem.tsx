import { type ReactNode } from 'react';
import Image from 'next/image';
import { oneLineTextCss } from '@/components/ListItem/ListItem.styles';
import { css, cx } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

export interface TwoLineListItemType {
  imageUrl: string;
  subName: string;
  name: string;
  badgeElement?: ReactNode;

  isBackground?: boolean; // variant `background-on` `background-off` 대체
}

function TwoLineListItem({ isBackground = true, ...props }: TwoLineListItemType) {
  return (
    <li
      className={cx(
        containerCss,
        css({
          backgroundColor: isBackground ? 'bg.surface3' : 'transparent',
        }),
      )}
    >
      <Image src={props.imageUrl} alt="mission list item" width={36} height={36} />
      <div className={textWrapperCss}>
        <p className={cx(oneLineTextCss, subNameCss)}>{props.subName}</p>
        <p className={cx(oneLineTextCss, nameCss)}>{props.name}</p>
      </div>
      {Boolean(props.badgeElement) && props.badgeElement}
    </li>
  );
}

export default TwoLineListItem;

const containerCss = flex({
  gap: '10px',
  padding: '16px',
  alignItems: 'center',
  borderRadius: '22px',
  height: '74px',
  cursor: 'pointer',
});

const textWrapperCss = flex({ flex: 1, flexDirection: 'column', gap: '2px', minWidth: '0' });
const subNameCss = css({
  color: 'text.tertiary',
  textStyle: 'body3',
  width: '100%',
});

const nameCss = css({
  color: 'text.secondary',
  textStyle: 'body2',
});

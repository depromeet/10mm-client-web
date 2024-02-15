import { type ReactNode } from 'react';
import Image from 'next/image';
import { oneLineTextCss } from '@/constants/style/text';
import { css, cx } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

export interface TwoLineListItemType {
  imageUrl: string;
  subName: string;
  name: string;
  badgeElement?: ReactNode;

  isBackground?: boolean; // variant `background-on` `background-off` 대체
  children?: ReactNode;
}

function TwoLineListItem({ isBackground = true, ...props }: TwoLineListItemType) {
  return (
    <li className={cx(containerCss, isBackground ? bgExistContainerCss : bgNoExistContainerCss)}>
      <Image src={props.imageUrl} alt="mission list item" width={36} height={36} />
      <div className={textWrapperCss}>
        <p className={cx(oneLineTextCss, subNameCss)}>{props.subName}</p>
        <p className={cx(oneLineTextCss, nameCss)}>{props.name}</p>
        {props.children}
      </div>
      {Boolean(props.badgeElement) && props.badgeElement}
    </li>
  );
}

export default TwoLineListItem;

const containerCss = flex({
  gap: '10px',
  alignItems: 'center',
  borderRadius: '22px',
  // height: '74px',
  cursor: 'pointer',
  minHeight: '74px',
});

const textWrapperCss = flex({
  flex: 1,
  flexDirection: 'column',
  gap: '2px',
  minWidth: '0',
  '& > *': {
    minHeight: '21px',
  },
});

const subNameCss = css({
  color: 'text.tertiary',
  textStyle: 'body3',
  width: '100%',
});

const nameCss = css({
  color: 'text.secondary',
  textStyle: 'body2',
});

const bgExistContainerCss = css({
  border: '1px solid #22242F',
  background: 'linear-gradient(0deg, rgba(168, 180, 240, 0.02) 0%, rgba(168, 180, 240, 0.02) 100%), #18181D',
  boxShadow: '-10px 0px 100px 4px rgba(69, 85, 169, 0.05) inset',
  padding: '10px 16px',
});

const bgNoExistContainerCss = css({
  background: 'transparent',
  height: '56px !',
  // padding: '8px 0',
});

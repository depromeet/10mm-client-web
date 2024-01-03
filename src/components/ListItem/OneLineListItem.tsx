import { type ReactNode } from 'react';
import { oneLineTextCss } from '@/components/ListItem/ListItem.styles';
import { css, cx } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

interface Props {
  name: string;
  rightElement?: ReactNode;
  leftElement?: ReactNode;
  onClick?: () => void;
}

function OneLineListItem(props: Props) {
  return (
    <li className={containerCss} onClick={props.onClick}>
      {props.leftElement && <div className={leftWrapperCss}>{props.leftElement}</div>}
      <span className={cx(oneLineTextCss, nameCss)}>{props.name}</span>
      {props.rightElement && <div className={rightWrapperCss}>{props.rightElement}</div>}
    </li>
  );
}

export default OneLineListItem;

const containerCss = flex({
  alignItems: 'center',
  padding: '8px 16px',
});

const leftWrapperCss = css({
  marginRight: '12px',
});

const nameCss = css({
  color: 'text.secondary',
  textStyle: 'subtitle4',
});

const rightWrapperCss = css({
  marginLeft: '4px',
});

import React, { type ReactNode } from 'react';
import { type HeaderBaseType } from '@/components/Header/Header.types';
import Icon from '@/components/Icon';
import { css, cx } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';
import { type ColorToken } from '@styled-system/tokens';

export interface HeaderBaseProps {
  title?: string;
  onBackAction?: () => void;
  rightElement: ReactNode;
  headerBgColor?: ColorToken;
  iconColor?: ColorToken;
  textColor?: ColorToken;
}

/**
 * @description Header의 View를 담당하는 컴포넌트
 * @param title header title text
 * @param rightElement header 오른쪽에 들어가는 element
 * @param onBackAction back icon click action
 * @param headerBgColor
 */
function HeaderBase(
  props: HeaderBaseType & {
    rightElement: ReactNode;
  },
) {
  return (
    <>
      <header className={cx(wrapperCss, css({ background: props.headerBgColor ?? 'bg.surface2' }))}>
        <section className={leftSectionCss}>
          {props.onBackAction && (
            <button className={`${backButtonCss} back-button`} type="button" onClick={props.onBackAction}>
              <Icon name={'arrow-back'} color={props.iconColor || 'icon.secondary'} width={20} height={20} />
            </button>
          )}
          <h2
            className={cx(
              headingCss,
              css({
                color: props.textColor ?? 'text.secondary',
              }),
            )}
          >
            {props.title}
          </h2>
        </section>
        <section className={rightSectionCss}>{props.rightElement}</section>
      </header>
      <article className={css(positionCss)} />
    </>
  );
}

export default HeaderBase;

const positionCss = {
  height: '44px;',
  width: '100%',
  maxWidth: '475px',
};

const wrapperCss = flex({
  ...positionCss,
  padding: '12px 0 12px 12px',
  margin: '0 auto',
  left: 0,
  right: 0,
  top: 0,
  zIndex: 100,
  position: 'fixed',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const leftSectionCss = css({
  display: 'flex',
  gap: '12px',
  alignItems: 'center',
  flex: 1,
});

const rightSectionCss = css({});

const backButtonCss = css({
  cursor: 'pointer',
});

const headingCss = css({
  textStyle: 'subtitle3',
  color: 'text.secondary',
});

import { type ReactNode } from 'react';
import Icon from '@/components/Icon';
import { css, cx } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

import { type HeaderBaseType } from './Header.types';

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
      <header className={cx(wrapperCss, css({ background: props.headerBgColor ?? 'bg.surface2' }), props.className)}>
        <section className={leftSectionCss}>
          {props.onBackAction && (
            <button className={cx(backButtonCss, `back-button`)} type="button" onClick={props.onBackAction}>
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
  margin: '0 auto',
  left: 0,
  right: 0,
  top: 0,
  zIndex: 'appBar',
  position: 'fixed',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const leftSectionCss = css({
  display: 'flex',
  alignItems: 'center',
  flex: 1,
});

const rightSectionCss = css({});

const backButtonCss = css({
  cursor: 'pointer',
  padding: '12px',
});

const headingCss = css({
  textStyle: 'subtitle3',
  color: 'text.secondary',
});

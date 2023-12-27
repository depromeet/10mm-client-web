import React, { type ReactNode } from 'react';
import Icon from '@/components/Icon';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

/**
 * @description Header의 View를 담당하는 컴포넌트
 * @param title header title text
 * @param rightElement header 오른쪽에 들어가는 element
 * @param onBackAction back icon click action
 */
function HeaderBase(props: { title?: string; onBackAction?: () => void; rightElement: ReactNode }) {
  return (
    <>
      <header
        className={wrapperCss}
        style={{
          backgroundColor: 'colors.bg.surface1',
        }}
      >
        <section className={leftSectionCss}>
          {props.onBackAction && (
            <button className={`${backButtonCss} back-button`} type="button" onClick={props.onBackAction}>
              <Icon name={'arrow-back'} color={'icon.secondary'} width={20} height={20} />
            </button>
          )}
          <h2 className={headingCss}>{props.title}</h2>
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
  padding: '12px',
  background: 'bg.surface1',
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

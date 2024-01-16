'use client';

import Icon from '@/components/Icon';
import Portal from '@/components/portal/Portal';
import { css } from '@/styled-system/css';

function Loading() {
  return (
    <Portal>
      <article className={containerCss}>
        <Icon name="spinner" />
      </article>
    </Portal>
  );
}

export default Loading;

const containerCss = css({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  background: 'rgba(0, 0, 0, 0.50);',
  zIndex: 'loading',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

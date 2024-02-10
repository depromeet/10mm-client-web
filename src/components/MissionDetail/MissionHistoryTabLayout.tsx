import { type PropsWithChildren } from 'react';
import { css } from '@/styled-system/css';

function MissionHistoryTabLayout({ children }: PropsWithChildren) {
  return (
    <div className={scrollAreaCss}>
      <div className={missionHistoryTabCss}>{children} </div>
    </div>
  );
}

export default MissionHistoryTabLayout;

const scrollAreaCss = css({
  overflowY: 'scroll',
  height: 'calc(100vh - 24px - 44px)',
  _scrollbar: {
    display: 'none',
  },
});

const missionHistoryTabCss = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  padding: '24px 16px 192px 16px',
});

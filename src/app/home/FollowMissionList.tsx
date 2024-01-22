import { css } from '@styled-system/css';
import { flex } from '@styled-system/patterns';

import { MissionListInner } from './MissionList';

function FollowMissionList() {
  return (
    <div className={containerCss}>
      <h2 className={headingCss}>
        <span>미션 목록</span>
      </h2>
      <ul className={listCss}>
        <MissionListInner />
      </ul>
    </div>
  );
}

export default FollowMissionList;

const headingCss = flex({
  padding: '12px 4px',
  textStyle: 'body4',
  color: 'text.primary',
});

const containerCss = css({});

const listCss = flex({
  flexDirection: 'column',
  gap: '8px',
});

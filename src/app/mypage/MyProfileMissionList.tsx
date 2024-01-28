'use client';

import MissionListInner from '@/app/home/MissionInnerList';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

function MyProfileMissionList() {
  return (
    <div className={containerCss}>
      <ul className={listCss}>
        <MissionListInner />
      </ul>
    </div>
  );
}

export default MyProfileMissionList;

const containerCss = css({
  paddingBottom: '100px',
});

const listCss = flex({
  flexDirection: 'column',
  flex: 1,

  gap: '8px',
  height: '100%',
});

import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

import FollowMissionList from './FollowMissionList';
import MissionListInner from './MissionInnerList';

function ProfileMissionList({ id }: { id?: number }) {
  return (
    <div className={containerCss}>
      <ul className={listCss}>{id ? <FollowMissionList followId={id} /> : <MissionListInner />}</ul>
    </div>
  );
}

export default ProfileMissionList;

const containerCss = css({
  paddingBottom: '100px',
});

const listCss = flex({
  flexDirection: 'column',
  flex: 1,

  gap: '8px',
  height: '100%',
});

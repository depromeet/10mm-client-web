import FollowMissionList from '@/app/home/FollowMissionList';
import FollowSummary from '@/app/home/FollowSummary';
import MissionList from '@/app/home/MissionList';
import { flex } from '@styled-system/patterns';

import { useProfileId } from './ProfileIdProvider';

function ProfileContent() {
  const { profileId } = useProfileId();
  if (!profileId)
    return (
      <div className={containerCss}>
        <MissionList />
      </div>
    );
  return (
    <div className={containerCss}>
      <FollowSummary />
      <FollowMissionList />
    </div>
  );
}

export default ProfileContent;

const containerCss = flex({
  flexDirection: 'column',
  padding: '0 16px 30px',
  flex: 1,
  minWidth: '0',
  display: 'flex',
});

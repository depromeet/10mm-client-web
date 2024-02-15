import { useGetMissions } from '@/apis/mission';
import MissionList from '@/components/MissionList';
import { ROUTER } from '@/constants/router';
import { css } from '@styled-system/css';

// NOTE: mypage의 mission list에선 미션이 진행중인지 체크할 필요가 없습니다.
// 따라서, useMissions hook이나, progressMissionId를 사용하지 않습니다.
function MissionListInner() {
  const { data, isLoading } = useGetMissions();
  const missionList = data ?? [];

  if (isLoading) {
    return <MissionList.Skeleton />;
  }

  if (missionList.length === 0) {
    return (
      <div className={containerCss}>
        <MissionList.Empty />
      </div>
    );
  }

  return (
    <MissionList.Container>
      {missionList.map((item) => {
        const missionId = item.missionId.toString();
        const moveHref = ROUTER.MISSION.DETAIL(missionId);

        return <MissionList.LinkItem href={moveHref} key={item.missionId} {...item} />;
      })}
    </MissionList.Container>
  );
}

export default MissionListInner;

const containerCss = css({
  height: '100%',
  padding: '60px 0',
});

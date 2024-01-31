import { useSearchParams } from 'next/navigation';
import { useFollowMembers } from '@/apis/follow';
import FollowMissionList from '@/app/home/FollowMissionList';
import FollowSummary from '@/app/home/FollowSummary';
import MissionList from '@/app/home/MissionList';
import { flex } from '@styled-system/patterns';

function FollowContent() {
  const selectedFollowData = useGetSelectFollowData();

  if (!selectedFollowData)
    return (
      <div className={containerCss}>
        <MissionList />
      </div>
    );

  return (
    <div className={containerCss}>
      <FollowSummary followId={selectedFollowData.memberId} followNickname={selectedFollowData.nickname} />
      <FollowMissionList followId={selectedFollowData.memberId} />
    </div>
  );
}

export default FollowContent;

const useGetSelectFollowData = () => {
  const { data } = useFollowMembers();
  const searchParams = useSearchParams();

  if (!searchParams.get('id')) return null;

  const id = Number(searchParams.get('id'));
  const selectedFollowData = data?.find((profile) => profile.memberId === id);
  return selectedFollowData;
};

const containerCss = flex({
  flexDirection: 'column',
  padding: '0 16px 30px',
  flex: 1,
  minWidth: '0',
  display: 'flex',
});

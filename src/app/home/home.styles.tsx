import { css } from '@styled-system/css';

export function MissionListSkeleton() {
  return (
    <>
      <div className={missionItemSkeletonCss} />
      <div className={missionItemSkeletonCss} />
    </>
  );
}

const missionItemSkeletonCss = css({
  animation: 'skeleton',
  height: '74px',
  width: '100%',
  backgroundColor: 'bg.surface4',
  borderRadius: '22px',
});

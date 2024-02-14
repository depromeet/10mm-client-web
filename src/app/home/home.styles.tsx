import { flex } from '@/styled-system/patterns/flex';
import { css } from '@styled-system/css';

export function MissionListSkeleton() {
  return (
    <div className={listCss}>
      <div className={missionItemSkeletonCss} />
      <div className={missionItemSkeletonCss} />
    </div>
  );
}

const missionItemSkeletonCss = css({
  animation: 'skeleton',
  height: '74px',
  width: '100%',
  backgroundColor: 'bg.surface4',
  borderRadius: '22px',
});

const listCss = flex({
  flexDirection: 'column',
  flex: 1,

  gap: '8px',
  height: '100%',
});

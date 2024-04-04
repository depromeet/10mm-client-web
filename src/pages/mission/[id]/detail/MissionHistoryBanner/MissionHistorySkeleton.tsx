import { missionHistoryBannerCss } from '@/pages/mission/[id]/detail/MissionHistoryBanner/MissionHistoryBanner';
import { css, cx } from '@styled-system/css';

function MissionHistorySkeleton() {
  return (
    <div
      className={cx(
        missionHistoryBannerCss,
        css({
          height: '70px',
          animation: 'skeleton',
        }),
      )}
    />
  );
}

export default MissionHistorySkeleton;

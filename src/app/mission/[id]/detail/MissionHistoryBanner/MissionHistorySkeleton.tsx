import { missionHistoryBannerCss } from '@/app/mission/[id]/detail/MissionHistoryBanner/MissionHistoryBanner';
import { css, cx } from '@styled-system/css';

function MissionHistorySkeleton() {
  return (
    <div
      className={cx(
        missionHistoryBannerCss,
        css({
          height: '70px',
        }),
      )}
    />
  );
}

export default MissionHistorySkeleton;

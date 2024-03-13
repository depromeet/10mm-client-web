import Banner from '@/components/Banner/Banner';
import { CardBannerSkeleton } from '@/components/Banner/CardBanner';
import MotionDiv from '@/components/Motion/MotionDiv';
import { grid } from '@/styled-system/patterns';

interface Props {
  totalTime: string;
  totalMissionAttainRate: string;
}

function BannerSection(props: Props) {
  return (
    <MotionDiv className={bannerSectionCss}>
      <Banner
        type="card"
        description="전체 누적 시간"
        iconUrl="/assets/icons/graph/clock.png"
        title={props.totalTime}
      />
      <Banner
        type="card"
        description="총 미션 달성률"
        iconUrl="/assets/icons/graph/chart.png"
        title={props.totalMissionAttainRate}
      />
    </MotionDiv>
  );
}

export default BannerSection;

export function BannerSectionSkeleton() {
  return (
    <div className={bannerSectionCss}>
      <CardBannerSkeleton />
      <CardBannerSkeleton />
    </div>
  );
}

const bannerSectionCss = grid({
  gridTemplateColumns: '1fr 1fr',
  padding: '20px 16px',
  gap: '10px',
  margin: '0 auto',
});

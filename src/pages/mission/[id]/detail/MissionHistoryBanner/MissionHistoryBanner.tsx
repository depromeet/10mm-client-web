import Image from 'next/image';
import MotionDiv from '@/components/Motion/MotionDiv';
import { css } from '@styled-system/css';

// TODO : banner 컴포넌트 분리
function MissionHistoryBanner({
  title,
  description,
  imageUrl,
}: {
  title: string;
  description: string;
  imageUrl: string;
}) {
  return (
    <div className={missionHistoryBannerCss}>
      <MotionDiv className={bannerInnerCss}>
        <Image width={36} height={36} alt={title} src={imageUrl} />
        <div>
          <p className={bannerTitleCss}>{title}</p>
          <p className={bannerDescriptionCss}>{description}</p>
        </div>
      </MotionDiv>
    </div>
  );
}

export default MissionHistoryBanner;

export const missionHistoryBannerCss = css({
  borderRadius: '22px',
  background: 'linear-gradient(0deg, rgba(181, 184, 255, 0.02) 0%, rgba(181, 184, 255, 0.02) 100%), #18181D',
  boxShadow: '-10px 0px 100px 4px rgba(93, 96, 178, 0.10) inset',
  transition: 'all 0.3s ease',

  '& img': {
    width: '36px',
    height: '36px',
  },
});

const bannerInnerCss = css({
  display: 'flex',
  flexDirection: 'row',
  padding: '16px',
  gap: '8px',
});

const bannerTitleCss = css({
  textStyle: 'body1',
  color: 'text.primary',
});

const bannerDescriptionCss = css({
  textStyle: 'body4',
  color: 'text.tertiary',
});

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
  boxShadow: '0px 5px 50px 4px #5C4E7A80 inset, 0px 4px 20px 0px #100F1733',
  background: 'linear-gradient(92.59deg, rgba(25, 23, 27, 0.8) 0.82%, rgba(24, 25, 33, 0.8) 99.97%)',
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

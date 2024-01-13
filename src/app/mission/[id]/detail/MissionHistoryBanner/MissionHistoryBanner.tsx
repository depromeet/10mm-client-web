import Image from 'next/image';
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
      <Image width={30} height={30} alt={title} src={imageUrl} />
      <div>
        <p className={bannerTitleCss}>{title}</p>
        <p className={bannerDescriptionCss}>{description}</p>
      </div>
    </div>
  );
}

export default MissionHistoryBanner;

export const missionHistoryBannerCss = css({
  display: 'flex',
  flexDirection: 'row',
  padding: '16px',
  gap: '8px',
  borderRadius: '22px',
  background: 'linear-gradient(93deg, rgba(25, 23, 27, 0.80) 0.82%, rgba(24, 25, 33, 0.80) 99.97%)',
  boxShadow: '0px 5px 50px 4px rgba(92, 78, 122, 0.50) inset, 0px 4px 20px 0px rgba(16, 15, 23, 0.20)',
  backdropFilter: 'blur(20px)',
});

const bannerTitleCss = css({
  textStyle: 'body1',
  color: 'text.primary',
});

const bannerDescriptionCss = css({
  textStyle: 'body4',
  color: 'text.tertiary',
});

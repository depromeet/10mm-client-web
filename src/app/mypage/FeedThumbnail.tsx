import Image from 'next/image';
import MissionDuration from '@/app/record/[id]/detail/MissionDuration';
import { css } from '@styled-system/css';

function FeedThumbnail({ imageUrl, missionDuration }: { imageUrl: string; missionDuration: number }) {
  return (
    <div className={historyThumbnailWrapperCss}>
      <div className={dimmedCss} />
      <Image className={imageCss} width={365} height={365} src={imageUrl} alt={'피드 이미지'} />
      <div className={positionCss}>
        <MissionDuration duration={missionDuration} type={'profileFeed'} />
      </div>
    </div>
  );
}

export default FeedThumbnail;

const dimmedCss = css({
  position: 'absolute',
  width: '100%',
  height: '60px',
  background:
    'linear-gradient(0deg, rgba(27, 34, 51, 0.00) 0%, rgba(27, 34, 51, 0.01) 10%, rgba(27, 34, 51, 0.03) 19.79%, rgba(27, 34, 51, 0.07) 34.79%, rgba(27, 34, 51, 0.13) 56.25%, rgba(27, 34, 51, 0.20) 77.92%, rgba(27, 34, 51, 0.30) 100%)',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 1,
});

const historyThumbnailWrapperCss = css({
  width: '100%',
  aspectRatio: '1 / 1',
  position: 'relative',
  borderRadius: '16px',
  overflow: 'hidden',
  maxWidth: 'calc(475px - 32px)',
  maxHeight: 'calc(475px - 32px)',

  '@media (max-width: 475px)': {
    maxWidth: 'calc(100vw - 32px)',
    maxHeight: 'calc(100vw - 32px)',
  },
});

const positionCss = css({
  position: 'absolute',
  top: '9px',
  left: '8px',
  zIndex: 2,
});

const imageCss = css({
  width: '100%',
  borderRadius: '22px',
  objectFit: 'cover',
  height: '100%',
});

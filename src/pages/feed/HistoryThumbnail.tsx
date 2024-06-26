import Image from 'next/image';
import MissionDuration from '@/components/MissionDuration';
import { css } from '@styled-system/css';

function HistoryThumbnail({ imageUrl, missionDuration }: { imageUrl: string; missionDuration: number }) {
  return (
    <div className={historyThumbnailWrapperCss}>
      <Image className={imageCss} width={365} height={365} src={imageUrl} alt={'미션 내역 이미지'} />
      <div className={positionCss}>
        <MissionDuration duration={missionDuration} />
      </div>
    </div>
  );
}

export default HistoryThumbnail;

const historyThumbnailWrapperCss = css({
  width: '100%',
  aspectRatio: '1 / 1',
  position: 'relative',
  borderRadius: '22px',
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
  top: '16px',
  right: '20px',
});

const imageCss = css({
  width: '100%',
  borderRadius: '22px',
  objectFit: 'cover',
  height: '100%',
});

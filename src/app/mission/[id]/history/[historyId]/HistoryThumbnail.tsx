import Image from 'next/image';
import MissionDuration from '@/app/mission/[id]/history/[historyId]/MissionDuration';
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
});

const positionCss = css({
  position: 'absolute',
  top: 0,
  right: '10px',
});

const imageCss = css({
  width: '100%',
  borderRadius: '22px',
});

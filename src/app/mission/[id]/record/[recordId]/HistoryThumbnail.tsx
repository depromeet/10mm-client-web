import MissionDuration from '@/app/mission/[id]/record/[recordId]/MissionDuration';
import { css } from '@styled-system/css';
//TODO : s3 오리진이 정해지면 next/image로 변경
function HistoryThumbnail({ imageUrl, missionDuration }: { imageUrl: string; missionDuration: number }) {
  return (
    <div className={historyThumbnailWrapperCss}>
      <img className={imageCss} width={365} height={365} src={imageUrl} alt={'미션 내역 이미지'} />
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

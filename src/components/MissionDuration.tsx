import Icon from '@/components/Icon';
import { css } from '@styled-system/css';

// TODO : 컴포넌트 분리
function MissionDuration({ type = 'record', duration }: { type?: 'profileFeed' | 'record'; duration: number }) {
  if (type === 'profileFeed') {
    return (
      <div className={missionDurationCss}>
        <Icon name={'10mm-symbol'} size={20} color={'basicColor.white'} />
        <p className={missionDurationFeedTextCss}>{duration}m</p>
      </div>
    );
  }

  return (
    <div className={missionDurationCss}>
      <Icon name={'10mm-symbol'} size={24} color={'basicColor.white'} />
      <p className={missionDurationTextCss}>{duration}m</p>
    </div>
  );
}

export default MissionDuration;

const missionDurationCss = css({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
});

const missionDurationTextCss = css({
  color: 'basicColor.white',
  textStyle: 'subtitle2',
  textShadow: '0px 0px 8px rgba(23, 25, 45, 0.25)',
});

const missionDurationFeedTextCss = css({
  color: 'basicColor.white',
  textStyle: 'subtitle5',
  textShadow: '0px 0px 8px rgba(23, 25, 45, 0.25)',
});

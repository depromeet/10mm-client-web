import Icon from '@/components/Icon';
import { css } from '@styled-system/css';

function MissionDuration({ duration }: { duration: number }) {
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

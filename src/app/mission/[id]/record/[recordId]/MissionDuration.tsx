import Icon from '@/components/Icon';
import { css } from '@styled-system/css';

function MissionDuration({ duration }: { duration: number }) {
  return (
    <div className={missionDurationCss}>
      <Icon name={'10mm-symbol'} size={110} className={missionDurationIconCss} />
      <p className={missionDurationTextCss}>{duration}M</p>
    </div>
  );
}

export default MissionDuration;

const missionDurationIconCss = css({
  color: 'rgba(255, 255, 255, 0.20)',
  backdropFilter: 'blur(2.5px)',
});

const missionDurationCss = css({
  position: 'relative',
  width: '110px',
  height: '110px',
});

const missionDurationTextCss = css({
  textShadow: '0px 0px 5px rgba(23, 25, 45, 0.30)',
  fontSize: '18px',
  fontWeight: 200,
  lineHeight: '20px',
  color: 'basicColor.white',
  position: 'absolute',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  top: '50%',
});

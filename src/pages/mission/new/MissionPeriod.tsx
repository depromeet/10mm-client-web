import { MissionPeriod } from '@/apis/schema/mission';
import Chip from '@/components/Chip/Chip';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

const PERIOD: { value: MissionPeriod; label: string }[] = [
  {
    value: MissionPeriod.TWO_WEEKS,
    label: '2주',
  },
  {
    value: MissionPeriod.ONE_MONTH,
    label: '1개월',
  },
  {
    value: MissionPeriod.TWO_MONTHS,
    label: '2개월',
  },
  {
    value: MissionPeriod.THREE_MONTHS,
    label: '3개월',
  },
  {
    value: MissionPeriod.FOUR_MONTHS,
    label: '4개월',
  },
];

interface Props {
  missionPeriod: MissionPeriod;
  setMissionPeriod: (value: MissionPeriod) => void;
}

function MissionPeriodSelect(props: Props) {
  return (
    <div>
      <h3 className={headingCss}>기간 설정</h3>
      <p className={descCss}>미션의 수행 기간을 선택해 주세요.</p>
      <div className={chipCss}>
        {PERIOD.map((period) => (
          <Chip
            key={period.value}
            onClick={() => props.setMissionPeriod(period.value)}
            selected={props.missionPeriod === period.value}
          >
            {period.label}
          </Chip>
        ))}
      </div>
    </div>
  );
}

export default MissionPeriodSelect;

const headingCss = css({
  textStyle: 'body2',
  color: 'text.primary',
});

const descCss = css({
  textStyle: 'body3',
  color: 'gray.gray600',
  marginTop: '2px',
});

const chipCss = flex({ gap: '6px', marginTop: '16px' });

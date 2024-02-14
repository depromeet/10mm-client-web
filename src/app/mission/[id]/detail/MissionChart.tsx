import { type StatisticTimeTable } from '@/apis';
import { getDateArray } from '@/app/mission/[id]/detail/missionChart.utils';
import Icon from '@/components/Icon';
import { css } from '@styled-system/css';
import type dayjs from 'dayjs';

function MissionChart({
  startAt,
  finishAt,
  timeTable,
}: {
  startAt: string;
  finishAt: string;
  timeTable: StatisticTimeTable[];
}) {
  const dateArray = getDateArray(startAt, finishAt, timeTable);
  return (
    <div className={relavtiveCss}>
      <div className={leftDimmedCss} />
      <div className={rightDimmedCss} />
      <div className={missionChartWrapperCss}>
        <div className={missionChartListCss}>
          {dateArray.map((time, index) => (
            <MissionChartItem key={index} {...time} />
          ))}
        </div>
      </div>
    </div>
  );
}

function MissionChartItem({
  symbolStack,
  date,
  durationMinute,
}: {
  symbolStack: number;
  date: dayjs.Dayjs;
  durationMinute: number;
}) {
  return (
    <div className={chartItemCss}>
      <div className={chartDayTextCss}>{date.format('D일')}</div>
      <div>
        {Boolean(symbolStack) && (
          <div className={missionStackWrapperCss}>
            {Array.from({ length: symbolStack }, (_, index) => {
              if (index === 0) {
                return <Icon name={'10mm-symbol'} size={14} color={'gradients.primary'} key={index} />;
              }
              return <Icon name={'10mm-symbol'} size={14} color={'purple.purple100'} key={index} />;
            })}
          </div>
        )}
        <div className={chartMinuteTextCss}>{durationMinute}분</div>
      </div>
    </div>
  );
}

export default MissionChart;

const relavtiveCss = css({
  position: 'relative',
});

const leftDimmedCss = css({
  position: 'absolute',
  height: 'calc(100% - 40px)',
  zIndex: 100,
  top: '50%',
  transform: 'translateY(-50%)',
  bottom: 0,
  width: '48px',
  background:
    'linear-gradient(90deg, #141417 0%, rgba(20, 20, 23, 0.97) 10%, rgba(20, 20, 23, 0.94) 20.62%, rgba(20, 20, 23, 0.83) 31.25%, rgba(20, 20, 23, 0.62) 47.34%, rgba(20, 20, 23, 0.00) 100%)',
});

const rightDimmedCss = css({
  position: 'absolute',
  height: 'calc(100% - 40px)',
  zIndex: 100,
  top: '50%',
  transform: 'translateY(-50%)',
  bottom: 0,
  right: 0,
  width: '48px',
  background:
    'linear-gradient(270deg, #141417 0%, rgba(20, 20, 23, 0.97) 10%, rgba(20, 20, 23, 0.94) 20.62%, rgba(20, 20, 23, 0.83) 31.25%, rgba(20, 20, 23, 0.62) 47.34%, rgba(20, 20, 23, 0.00) 100%)',
});

const missionChartListCss = css({
  display: 'flex',
  height: '100%',
  padding: '0 30px',
});

const missionChartWrapperCss = css({
  padding: '20px 0',
  borderRadius: '22px',
  background: 'bg.surface1',
  height: '238px',
  overflowX: 'scroll',
  display: 'flex',
  alignItems: 'center',

  _scrollbar: {
    display: 'none',
  },
});

const chartItemCss = css({
  display: 'flex',
  minWidth: '48px',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '100%',
});

const chartMinuteTextCss = css({
  color: 'text.secondary',
  textStyle: 'body6',
});

const chartDayTextCss = css({
  color: 'text.quaternary',
  textStyle: 'subtitle5',
});

const missionStackWrapperCss = css({
  padding: '8px 3px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '2px',
  borderRadius: '8px',
  background: '#1D1C28',
  marginBottom: '10px',
});

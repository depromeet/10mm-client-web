import { useGetRecordsStatistics } from '@/apis';
import Banner from '@/components/Banner/Banner';
import Icon from '@/components/Icon';
import { gradientTextCss } from '@/constants/style/gradient';
import MissionChart from '@/pages/mission/[id]/detail/MissionChart';
import { css, cx } from '@styled-system/css';
import dayjs from 'dayjs';

// TODO : component 폴더로 이동
function MissionStatistics({ missionId }: { missionId: string }) {
  const { data } = useGetRecordsStatistics(Number(missionId));
  return (
    <div>
      <div className={totalMissionTimeWrapperCss}>
        <div className={cx(timeTextCss, gradientTextCss)}>
          <span>{data?.totalMissionHour || 0}h</span>
          <span>{data?.totalMissionMinute || 0}m</span>
        </div>
        <div className={totalMissionTimeCss}>
          <span>총 미션 누적 시간</span>
          <Icon name={'10mm-symbol-circle-normal'} size={14} color={'icon.tertiary'} />
          <span>{data?.totalSymbolStack || 0}</span>
        </div>
      </div>
      <div className={bannerWrapperCss}>
        <Banner
          type={'card'}
          description={'연속 성공'}
          title={`${data?.continuousSuccessDay || 0}d`}
          iconUrl={'/assets/icons/graph/fire.png'}
        />
        <Banner
          type={'card'}
          description={'총 성공'}
          title={`${data?.totalSuccessDay || 0}d`}
          iconUrl={'/assets/icons/graph/voltage.png'}
        />
        <Banner
          type={'card'}
          description={'달성률'}
          title={`${data?.totalMissionAttainRate || 0}%`}
          iconUrl={'/assets/icons/graph/chart.png'}
        />
      </div>
      <div className={missionChartTitleCss}>
        <div className={titleCss}>
          <Icon name={'clock'} color={'icon.tertiary'} size={18} /> 집중한 시간
        </div>
        <div className={durationCss}>
          {dayjs(data?.startedAt).format('YYYY.M.D')} ~ {dayjs(data?.finishedAt).format('YYYY.M.D')}
        </div>
      </div>
      <MissionChart
        startAt={data?.startedAt || ''}
        finishAt={data?.finishedAt || ''}
        timeTable={data?.timeTable || []}
      />
    </div>
  );
}

export default MissionStatistics;

const missionChartTitleCss = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '12px',
});

const durationCss = css({
  textStyle: 'caption',
  color: 'text.quaternary',
});
const titleCss = css({
  textStyle: 'body3',
  color: 'gray.gray600',
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
});

const bannerWrapperCss = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '10px',
  paddingBottom: '40px',
});

const totalMissionTimeWrapperCss = css({
  padding: '48px 0',
});

const totalMissionTimeCss = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textStyle: 'body5',
  color: 'text.tertiary',
  gap: '2px',
  '& > span': {
    marginRight: '4px',
  },
});

const timeTextCss = css({
  fontSize: '60px',
  fontWeight: '100',
  background: 'gradients.primary',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '12px',
});

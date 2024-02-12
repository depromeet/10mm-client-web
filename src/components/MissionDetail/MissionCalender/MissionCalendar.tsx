import Link from 'next/link';
import { useGetRecord } from '@/apis';
import Icon from '@/components/Icon';
import { WEEK_DAYS } from '@/components/MissionDetail/MissionCalender/MissionCalendar.constants';
import {
  getMissionCalendarItemProps,
  getYearMonth,
} from '@/components/MissionDetail/MissionCalender/MissionCalendar.utils';
import MissionCalendarItem from '@/components/MissionDetail/MissionCalender/MissionCalendarItem';
import UrgingButton from '@/components/MissionDetail/MissionCalender/UrgingButton/UrgingButton';
import { EVENT_LOG_CATEGORY, EVENT_LOG_NAME } from '@/constants/eventLog';
import useCalendar from '@/hooks/useCalendar';
import { eventLogger } from '@/utils';
import { css } from '@styled-system/css';
import dayjs, { type Dayjs } from 'dayjs';

interface Props {
  currentData: Dayjs;
  missionId: number;
  isFollow?: boolean;
}

// NOTE: currentData를 꼭 props로 받아와야할 까?
function MissionCalendar({ currentData, missionId, isFollow }: Props) {
  const { date, monthCalendarData, onPrevMonth, onNextMonth, isCurrentMonth } = useCalendar({
    currentData,
    isQueryParams: true,
  });

  const currentYear = date.year();
  const currentMonth = date.month() + 1;

  const { data } = useGetRecord({
    missionId,
    yearMonth: getYearMonth(date),
  });

  const missionStartedAt = data?.missionStartedAt || '';

  const handlePrevMonth = () => {
    eventLogger.logEvent(EVENT_LOG_CATEGORY.MISSION_DETAIL, EVENT_LOG_NAME.MISSION_DETAIL.CLICK_CALENDER_ARROW, {
      direction: 'prev',
      isFollow: isFollow || false,
    });
    onPrevMonth();
  };

  const handleNextMonth = () => {
    eventLogger.logEvent(EVENT_LOG_CATEGORY.MISSION_DETAIL, EVENT_LOG_NAME.MISSION_DETAIL.CLICK_CALENDER_ARROW, {
      direction: 'next',
      isFollow: isFollow || false,
    });
    onNextMonth();
  };

  const handleClickCalendarItem = (isToday: boolean) => {
    eventLogger.logEvent(EVENT_LOG_CATEGORY.MISSION_DETAIL, EVENT_LOG_NAME.MISSION_DETAIL.CLICK_CALENDER, {
      isToday,
      isFollow: isFollow || false,
    });
  };

  return (
    <>
      <section>
        <div className={dateLabeWrapperCss}>
          <button type={'button'} className={buttonCss} onClick={handlePrevMonth}>
            <Icon name="arrow-back" size={12} />
          </button>
          <div className={missionHistoryCalendarCss}>
            {currentYear}년 {currentMonth}월
          </div>
          {!isCurrentMonth && (
            <button type={'button'} className={buttonCss} onClick={handleNextMonth}>
              <Icon name="arrow-forward" size={12} />
            </button>
          )}
        </div>
        <table className={tableCss}>
          <thead>
            <tr className={calendarHeaderCss}>
              {WEEK_DAYS.map((day) => (
                <th key={day}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody className={calendarBodyCss}>
            {monthCalendarData.map((week, i) => (
              <tr key={i}>
                {week.map((day, index) => {
                  if (!day) return <td key={'calender-null-' + index} className={missionCalendarTdCss} />;
                  const { routerLink, ...restProps } = getMissionCalendarItemProps(
                    missionStartedAt,
                    day,
                    data?.missionRecords || [],
                    isFollow,
                  );

                  const isToday = dayjs().isSame(`${day.year}-${day.month}-${day.date}`, 'day');

                  return (
                    <td key={`${day.year}-${day.month}-${day.date}`} className={missionCalendarTdCss}>
                      {routerLink ? (
                        <Link href={routerLink} onClick={() => handleClickCalendarItem(isToday)}>
                          <MissionCalendarItem date={day.date} {...restProps} isActive={isToday} />
                        </Link>
                      ) : (
                        <MissionCalendarItem date={day.date} {...restProps} isActive={isToday} />
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      {/* TODO: 임시로 값 넣어줌 */}
      {data?.urgingStatus && <UrgingButton missionId={missionId} urgingStatus={data.urgingStatus} />}
    </>
  );
}

export default MissionCalendar;

const dateLabeWrapperCss = css({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
});

const buttonCss = css({
  padding: '8px',
});

const tableCss = css({
  width: '100%',
  textAlign: 'center',
});

const missionHistoryCalendarCss = css({
  textStyle: 'body5',
  color: 'text.secondary',
  padding: '20px 4px',
});

const missionCalendarTdCss = css({
  padding: ' 12px 0',
});

const calendarHeaderCss = css({
  width: '100%',
  textStyle: 'body6',
  color: 'text.tertiary',
  justifyContent: 'space-between',
});

const calendarBodyCss = css({
  textStyle: 'body6',
  color: 'text.tertiary',
});

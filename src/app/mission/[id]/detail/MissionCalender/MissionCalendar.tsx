import Link from 'next/link';
import { useGetRecord } from '@/apis';
import { WEEK_DAYS } from '@/app/mission/[id]/detail/MissionCalender/MissionCalendar.constants';
import {
  getMissionCalendarItemProps,
  getYearMonth,
} from '@/app/mission/[id]/detail/MissionCalender/MissionCalendar.utils';
import MissionCalendarItem from '@/app/mission/[id]/detail/MissionCalender/MissionCalendarItem';
import Icon from '@/components/Icon';
import useCalendar from '@/hooks/useCalendar';
import { css } from '@styled-system/css';
import dayjs, { type Dayjs } from 'dayjs';

function MissionCalendar({
  currentData,
  missionId,
  isFollow,
}: {
  currentData: Dayjs;
  missionId: number;
  isFollow?: boolean;
}) {
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

  return (
    <section>
      <div
        className={css({
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
        })}
      >
        <button type={'button'} className={buttonCss} onClick={onPrevMonth}>
          <Icon name="arrow-back" size={12} />
        </button>
        <div className={missionHistoryCalendarCss}>
          {currentYear}년 {currentMonth}월
        </div>
        {!isCurrentMonth && (
          <button type={'button'} className={buttonCss} onClick={onNextMonth}>
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
                      <Link href={routerLink}>
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
  );
}

export default MissionCalendar;

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

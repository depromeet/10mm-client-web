import { WEEK_DAYS } from '@/app/mission/[id]/MissionHistoryCalender/MissionCalendar.constants';
import { getCalenderInfo } from '@/app/mission/[id]/MissionHistoryCalender/MissionHistoryCalendar.utils';
import { css } from '@styled-system/css';

function MissionHistoryCalendar() {
  const { monthCalendarData } = getCalenderInfo(1, 2024);

  return (
    <section>
      <div className={missionHistoryCalendarCss}>2023년 12월</div>
      <table
        className={css({
          width: '100%',
          textAlign: 'center',
        })}
      >
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
                if (!day) return <td key={'calender-null-' + index} />;
                return <td key={`${day.year}-${day.month}-${day.date}`}>{day.date}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default MissionHistoryCalendar;

const missionHistoryCalendarCss = css({
  textStyle: 'body4',
  color: 'text.secondary',
  padding: '20px 4px',
});

const calendarHeaderCss = css({
  width: '100%',
  textStyle: 'body5',
  color: 'text.tertiary',
  justifyContent: 'space-between',

  '& th': {
    maxWidth: '36px',
  },
});

const calendarBodyCss = css({
  textStyle: 'body5',
  color: 'text.tertiary',
});

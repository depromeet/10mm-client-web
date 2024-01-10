import { useGetRecord } from '@/apis';
import { type RecordType } from '@/apis/schema/record';
import { WEEK_DAYS } from '@/app/mission/[id]/detail/MissionCalender/MissionCalendar.constants';
import { getCalenderInfo } from '@/app/mission/[id]/detail/MissionCalender/MissionCalendar.utils';
import MissionCalendarItem from '@/app/mission/[id]/detail/MissionCalender/MissionCalendarItem';
import { css } from '@styled-system/css';

const getMissionCalendarItemProps = (date: number, records: RecordType[]) => {
  const filterRecord = records.filter((record) => record.missionDay === date);
  if (filterRecord.length > 0) {
    return {
      imageUrl: filterRecord[0].imageUrl,
    };
  }
  return {
    imageUrl: undefined,
  };
};

const getYearMonth = (currentDate: Date) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const monthString = month < 10 ? `0${month}` : `${month}`;
  return `${year}-${monthString}`;
};

function MissionCalendar({ currentDate, missionId }: { currentDate: Date; missionId: number }) {
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const selectedDate = currentDate.getDate();

  const { monthCalendarData } = getCalenderInfo(currentMonth, currentYear);
  const { data } = useGetRecord({
    missionId,
    yearMonth: getYearMonth(currentDate),
  });

  return (
    <section>
      <div className={missionHistoryCalendarCss}>
        {currentYear}년 {currentMonth}월
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
                return (
                  <td key={`${day.year}-${day.month}-${day.date}`} className={missionCalendarTdCss}>
                    <MissionCalendarItem
                      date={day.date}
                      imageUrl={getMissionCalendarItemProps(day.date, data).imageUrl}
                      isActive={day.date === selectedDate}
                    />
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

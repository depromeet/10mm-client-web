import CalendarItem from '@/app/result/OverallStatus/CalendarItem';
import Icon from '@/components/Icon';
import { WEEK_DAYS } from '@/components/MissionDetail/MissionCalender/MissionCalendar.constants';
import { EVENT_LOG_CATEGORY, EVENT_LOG_NAME } from '@/constants/eventLog';
import useCalendar from '@/hooks/useCalendar';
import { eventLogger } from '@/utils';
import { css, cx } from '@styled-system/css';
import dayjs, { type Dayjs } from 'dayjs';

interface Props {
  selectDate: Dayjs;
  setSelectDate: (date: Dayjs) => void;
}

function MissionCalendar({ selectDate, setSelectDate }: Props) {
  const currentData = dayjs();

  const { date, monthCalendarData, onPrevMonth, onNextMonth, isCurrentMonth } = useCalendar({
    currentData,
    isQueryParams: true,
  });

  const currentYear = date.year();
  const currentMonth = date.month() + 1;

  const handlePrevMonth = () => {
    eventLogger.logEvent(EVENT_LOG_CATEGORY.RESULT, EVENT_LOG_NAME.RESULT.CLICK_CALENDER_ARROW, {
      direction: 'prev',
    });
    onPrevMonth();
  };

  const handleNextMonth = () => {
    eventLogger.logEvent(EVENT_LOG_CATEGORY.RESULT, EVENT_LOG_NAME.RESULT.CLICK_CALENDER_ARROW, {
      direction: 'next',
    });
    onNextMonth();
  };

  return (
    <div>
      <section>
        <div className={dateLabeWrapperCss}>
          <button type={'button'} className={buttonCss} onClick={handlePrevMonth}>
            <Icon name="arrow-back" size={14} />
          </button>
          <div className={dateLabelTextCss}>
            <span>
              {currentYear}년 {currentMonth}월
            </span>
            {/* TODO : 나중에 넣어도 되려나 */}
            {/* <Icon name={'normal-calender'} size={16} /> */}
          </div>
          <button
            type={'button'}
            className={cx(buttonCss, css({ visibility: isCurrentMonth ? 'hidden' : '' }))}
            onClick={handleNextMonth}
          >
            <Icon name="arrow-forward" size={14} />
          </button>
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

                  // const isToday = dayjs().isSame(`${day.year}-${day.month}-${day.date}`, 'day');
                  const isSelected = selectDate.isSame(`${day.year}-${day.month}-${day.date}`, 'day');
                  const thisDay = `${day.year}-${day.month}-${day.date}`;

                  return (
                    <CalendarItem
                      key={thisDay}
                      isSelected={isSelected}
                      onClick={() => {
                        setSelectDate(dayjs(thisDay));
                      }}
                    >
                      {day.date}
                    </CalendarItem>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section></section>
    </div>
  );
}

export default MissionCalendar;

const dateLabeWrapperCss = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '12px',
  height: '36px',
});

const buttonCss = css({
  padding: '8px',
});

const tableCss = css({
  width: '100%',
  textAlign: 'center',
  borderSpacing: '0 8px',
});

const dateLabelTextCss = css({
  textStyle: 'subtitle2',
  color: 'text.secondary',
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
});

const missionCalendarTdCss = css({
  padding: ' 12px 0',
});

const calendarHeaderCss = css({
  width: '100%',
  fontSize: '12px',
  fontWeight: '400',
  lineHeight: '18px',
  color: 'text.secondary',
  justifyContent: 'space-between',
  height: '40px',
});

const calendarBodyCss = css({
  textStyle: 'body6',
  color: 'text.tertiary',
});

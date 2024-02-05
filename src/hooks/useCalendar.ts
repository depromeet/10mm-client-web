import { useState } from 'react';
import useSearchParamState from '@/hooks/useSearchParamState';
import dayjs, { type Dayjs } from 'dayjs';

/**
 * useCalendar hook - 달력 정보를 다루기 위한 hook
 *
 * @param date 초기 랜더링 시 달력의 기준이 되는 날짜
 * @param isQueryParams 년과 월의 정보를 query params로 관리할지 여부
 */
const useCalendar = ({ currentData, isQueryParams }: { currentData: Dayjs; isQueryParams?: boolean }) => {
  const { queryParams, setQueryParams } = useSearchParamState({ queryKey: 'date' });
  const [date, setDate] = useState(queryParams ? dayjs(queryParams) : currentData);
  const { monthCalendarData } = getCalenderInfo(date.month() + 1, date.year());

  const onNextMonth = () => {
    const nextMonth = date.add(1, 'month');
    setDate(nextMonth);
    if (isQueryParams) {
      setQueryParams({ date: nextMonth.format('YYYY-MM') });
    }
  };

  const onPrevMonth = () => {
    const prevMonth = date.subtract(1, 'month');
    setDate(prevMonth);
    if (isQueryParams) {
      setQueryParams({ date: prevMonth.format('YYYY-MM') });
    }
  };

  const isCurrentMonth = currentData.month() === date.month() && currentData.year() === date.year();

  return { date, monthCalendarData, onNextMonth, onPrevMonth, isCurrentMonth };
};

export default useCalendar;

const getCalenderInfo = (currentMonth: number, currentYear: number) => {
  // 이번달 1일
  const firstDate = new Date(currentYear, currentMonth - 1, 1);

  // 이번달 마지막날
  const lastDate = new Date(currentYear, currentMonth, 0);

  // getDay() : 일요일 0 ~ 토요일 6
  const prevBlankCount = firstDate.getDay();
  const totalDate = lastDate.getDate();

  const monthCalendarData = getMonthArray(prevBlankCount, totalDate).map((week) =>
    week.map((date) => {
      if (date === 0) {
        return null;
      }

      return {
        year: currentYear,
        month: currentMonth,
        date,
      };
    }),
  );

  return { monthCalendarData };
};

const getMonthArray = (prevBlankCount: number, totalDate: number) => {
  const weekNumber = Math.ceil((prevBlankCount + totalDate) / 7);

  return Array.from({ length: weekNumber }, (_, weekIndex) => {
    const offsetDate = weekIndex * 7 - prevBlankCount + 1;

    return getWeekArray(totalDate, offsetDate);
  });
};

const getWeekArray = (totalDate: number, offsetDate: number) => {
  return Array.from({ length: 7 }, (_, i) => {
    const currentDate = offsetDate + i;
    if (currentDate < 0) {
      return 0;
    }

    if (currentDate > totalDate) {
      return 0;
    }
    return currentDate;
  });
};

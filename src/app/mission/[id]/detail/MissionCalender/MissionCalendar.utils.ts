import { type RecordType } from '@/apis/schema/record';
import { ROUTER } from '@/constants/router';
import dayjs, { type Dayjs } from 'dayjs';

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

const getMonthArray = (prevBlankCount: number, totalDate: number) => {
  const weekNumber = Math.ceil((prevBlankCount + totalDate) / 7);

  return Array.from({ length: weekNumber }, (_, weekIndex) => {
    const offsetDate = weekIndex * 7 - prevBlankCount + 1;

    return getWeekArray(totalDate, offsetDate);
  });
};

export const getCalenderInfo = (currentMonth: number, currentYear: number) => {
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

export const getMissionCalendarItemProps = (
  missionStartAt: string,
  day: {
    year: number;
    month: number;
    date: number;
  },
  records: RecordType[],
  isFollow?: boolean,
) => {
  const isMissionStarted =
    dayjs(missionStartAt).isBefore(dayjs(`${day.year}-${day.month}-${day.date}`), 'day') ||
    dayjs(missionStartAt).isSame(dayjs(`${day.year}-${day.month}-${day.date}`), 'day');

  const filterRecord = records.filter((record) => record.missionDay === day.date);

  const isDayBeforeToday =
    dayjs(`${day.year}-${day.month}-${day.date}`).isBefore(dayjs(), 'day') ||
    dayjs().isSame(dayjs(`${day.year}-${day.month}-${day.date}`), 'day');

  if (!isMissionStarted || !isDayBeforeToday) {
    return {
      routerLink: '',
      imageUrl: undefined,
    };
  }

  if (filterRecord.length > 0) {
    return {
      routerLink: isFollow
        ? ROUTER.RECORD.DETAIL.FOLLOW(filterRecord[0].recordId.toString())
        : ROUTER.RECORD.DETAIL.HOME(filterRecord[0].recordId.toString()),
      imageUrl: filterRecord[0].imageUrl,
    };
  }
  return {
    routerLink: ROUTER.RECORD.DETAIL.EMPTY,
    imageUrl: undefined,
  };
};

export const getYearMonth = (currentDate: Dayjs) => {
  const year = currentDate.year();
  const month = currentDate.month() + 1;
  const monthString = month < 10 ? `0${month}` : `${month}`;
  return `${year}-${monthString}`;
};

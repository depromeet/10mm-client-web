import { type RecordType } from '@/apis/schema/record';
import { ROUTER } from '@/constants/router';
import dayjs, { type Dayjs } from 'dayjs';

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

export const getNotificationDateFormat = (currentDate: Dayjs) => {
  return currentDate.format('h:m A');
};

import { type StatisticTimeTable } from '@/apis';
import dayjs from 'dayjs';

export const getDateArray = (startAt: string, finishAt: string, timeTable: StatisticTimeTable[]) => {
  const now = dayjs();
  const finishAtDate = dayjs(finishAt);
  const startDate = dayjs(startAt);
  if (now.isBefore(finishAtDate)) {
    return generateDateArray(now, startDate, timeTable);
  }
  return generateDateArray(finishAtDate, startDate, timeTable);
};

const generateDateArray = (finishedAt: dayjs.Dayjs, startAt: dayjs.Dayjs, timeTable: StatisticTimeTable[]) => {
  return Array.from({ length: finishedAt.diff(startAt, 'day') + 1 }, (_, index) => {
    const date = startAt.add(index, 'day');

    return {
      date,
      symbolStack: timeTable.find((time) => dayjs(time.startedAt).isSame(date, 'date'))?.symbolStack || 0,
      durationMinute: timeTable.find((time) => dayjs(time.startedAt).isSame(date, 'date'))?.durationMinute || 0,
    };
  });
};

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

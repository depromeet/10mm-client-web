type DateType = Date | string | number;

/**
 * @description 날짜 포맷팅해주는 함수입니다.
 * @example getDateFormat('yyyy-mm-dd', new Date()) // 2021-09-01
 * @param format
 * @param date
 */
export const getDateFormat = (format: string, date: DateType = Date.now()): string => {
  const _date = new Date(date);

  return format.replace(/(yyyy|mm|dd|MM|DD|H|i|s)/g, (t: string): string => {
    switch (t) {
      case 'yyyy':
        return _date.getFullYear().toString();
      case 'mm':
        return (_date.getMonth() + 1).toString().padStart(2, '0');
      case 'dd':
        return _date.getDate().toString().padStart(2, '0');
      case 'MM':
        return (_date.getMonth() + 1).toString();
      case 'DD':
        return _date.getDate().toString();
      case 'H':
        return _date.getHours().toString();
      case 'i':
        return _date.getMinutes().toString().padStart(2, '0');
      case 's':
        return _date.getSeconds().toString().padStart(2, '0');
      default:
        return '';
    }
  });
};

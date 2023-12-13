type QueryString = Record<string, string | number | boolean | string[]>;

export const getQueryString = (params?: QueryString) => {
  // 인자가 없을 경우 null반환
  if (!params) return null;

  const queryStringArray: string[] = [];

  Object.entries(params).forEach(([key, initialValue]) => {
    const value =
      typeof initialValue === 'boolean' || typeof initialValue === 'number'
        ? JSON.stringify(initialValue)
        : initialValue;
    // 객체 여부 확인
    const isObject = initialValue?.constructor === Object;

    if (!value) return;
    // 객체일 경우 에러
    if (isObject) throw new Error(`객체는 올 수 없습니다.`);
    // 배열값이 들어올 경우 중복 제거 후 변환
    if (Array.isArray(value)) {
      const uniqueValue = Array.from(new Set(value));
      queryStringArray.push(`${key}=${uniqueValue.join(`&${key}=`)}`);
      return;
    }
    queryStringArray.push(`${key}=${value}`);
  });
  // 쿼리스트링 형태로 변환
  return queryStringArray.join('&');
};

export const withQueryString = (url: string, params?: QueryString) => {
  const queryString = getQueryString(params);
  if (!queryString) return url;
  return `${url}?${queryString}`;
};

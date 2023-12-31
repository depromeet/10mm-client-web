type QueryList = {
  //
};

/**
 * @description
 * 키타입을 추론하기 위한 함수입니다.
 *  아래와 같이 사용하면 됩니다.
 *
 *  useQuery(getQueryKey('key', params), () => {
 *      return fetch('url');
 *      );
 *
 */
const getQueryKey = <T extends keyof QueryList>(
  ...[key, params]: undefined extends QueryList[T] ? [T] : [T, QueryList[T]]
) => {
  return params ? [key, params] : [key];
};

export default getQueryKey;

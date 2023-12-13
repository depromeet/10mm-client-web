export type ObjectKeys<T extends Record<PropertyKey, unknown>> = `${Exclude<keyof T, symbol>}`;

export const getObjectValues = <Type extends Record<PropertyKey, unknown>>(
  obj: Type,
): Array<Type[ObjectKeys<Type>]> => {
  if (typeof obj !== 'object') throw new Error('객체가 아닙니다.');
  // 타입 단언을 사용하여 값의 타입을 추론합니다.
  return Object.values(obj) as Array<Type[ObjectKeys<Type>]>;
};

export const getObjectKeys = <Type extends Record<PropertyKey, unknown>>(obj: Type): Array<ObjectKeys<Type>> => {
  if (typeof obj !== 'object') throw new Error('객체가 아닙니다.');

  return Object.keys(obj) as Array<ObjectKeys<Type>>;
};

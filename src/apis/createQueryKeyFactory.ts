export const createQueryKeyFactory = <T extends Record<string, unknown>>(queryKey: string) => {
  return (params: T) => {
    return [queryKey, ...Object.values(params)];
  };
};

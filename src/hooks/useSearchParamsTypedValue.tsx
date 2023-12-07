import { useSearchParams } from 'next/navigation';

const useSearchParamsTypedValue = <T extends string>(key: string) => {
  const searchParams = useSearchParams();
  if (!searchParams) return { searchParams: null };
  if (!searchParams.has(key)) return { searchParams: null };

  return { searchParams: searchParams.get(key) as T };
};

export default useSearchParamsTypedValue;

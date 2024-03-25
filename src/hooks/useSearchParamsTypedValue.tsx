import { useRouter } from 'next/router';

interface UseSearchParamsTypedValueReturn<T> {
  searchParams: T | null;
}

const useSearchParamsTypedValue = <T extends string>(key: string): UseSearchParamsTypedValueReturn<T> => {
  const router = useRouter();

  if (!router.query) return { searchParams: null };
  if (!router.query[key]) return { searchParams: null };

  return { searchParams: router.query[key] as T };
};

export default useSearchParamsTypedValue;

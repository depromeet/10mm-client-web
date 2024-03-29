import { usePathname, useRouter, useSearchParams } from 'next/navigation';

/**
 * useSearchParamState hook - query params를 다루기 위한 hook
 * UI 상태를 query params로 관리하기 위한 hook
 * @param queryKey
 */
const useSearchParamState = <T extends string>({ queryKey }: { queryKey: T }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const queryParams = searchParams.get(queryKey) as string | undefined;

  const setQueryParamsHandler = (newQueryParams: Record<T, string>) => {
    router.replace(pathname + '?' + new URLSearchParams(newQueryParams).toString());
  };

  return { queryParams, setQueryParams: setQueryParamsHandler };
};

export default useSearchParamState;

import { isSeverError } from '@/apis/instance.api';
import { useSnackBar } from '@/components/SnackBar/SnackBarProvider';
import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

function useMutationHandleError<T, _unknown, V>(options?: UseMutationOptions<T, unknown, V>) {
  const { triggerSnackBar } = useSnackBar();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const triggerServerErrorSnackBar = (error: any) => {
    if (isSeverError(error)) {
      triggerSnackBar({
        message: error.response.data.data.message,
        offset: 'cta',
      });
      return;
    }
  };

  return useMutation({
    ...options,
    onError: (error, variables, context) => {
      triggerServerErrorSnackBar(error);
      options?.onError?.(error, variables, context);
    },
  });
}

export default useMutationHandleError;

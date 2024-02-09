import { isSeverError } from '@/apis/instance.api';
import { type SnackBarBaseType } from '@/components/SnackBar/SnackBar.types';
import { useSnackBar } from '@/components/SnackBar/SnackBarProvider';
import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

type SnackBarOptions = Pick<SnackBarBaseType, 'offset' | 'position'>;

function useMutationHandleError<T, _unknown, V>(
  options?: UseMutationOptions<T, unknown, V>,
  snackBarOptions?: SnackBarOptions,
) {
  const { triggerSnackBar } = useSnackBar();

  const triggerServerErrorSnackBar = (error: unknown) => {
    if (isSeverError(error)) {
      triggerSnackBar({
        message: error.response.data.data.message,
        offset: 'cta',
        ...snackBarOptions,
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

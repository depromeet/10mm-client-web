import { isSeverError } from '@/apis/instance.api';
import { useSnackBar } from '@/components/SnackBar/SnackBarProvider';

// mutation을 통해 서버에 요청을 보낼 때 발생하는 에러를 처리하는 hook
// mutation을 래핑하기로 결정
// option에 추가할지 useMutationWithSanckBar 등 새로운 hook을 만들지 고민
function useServerErrorSnackBar() {
  const { triggerSnackBar } = useSnackBar();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const triggerServerErrorSnackBar = (error: any) => {
    if (isSeverError(error)) {
      triggerSnackBar({
        message: error.response.data.data.message,
      });
      return;
    }
  };

  return triggerServerErrorSnackBar;
}

export default useServerErrorSnackBar;

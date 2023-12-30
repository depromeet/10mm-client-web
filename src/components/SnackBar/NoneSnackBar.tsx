import { snackBarWrapperCss } from '@/components/SnackBar/SnackBar.styles';
import { type SnackBarNoneType } from '@/components/SnackBar/SnackBar.types';

/**
 * NoneSnackBar
 * @param message - 스낵바 메시지
 */
function NoneSnackBar({ message }: SnackBarNoneType) {
  return <div className={snackBarWrapperCss()}>{message}</div>;
}

export default NoneSnackBar;

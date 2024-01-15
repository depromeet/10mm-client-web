import Icon from '@/components/Icon';
import { snackBarWrapperCss } from '@/components/SnackBar/SnackBar.styles';
import { type SnackBarIconType } from '@/components/SnackBar/SnackBar.types';
import { useSnackBar } from '@/components/SnackBar/SnackBarProvider';

/**
 * IconSnackBar
 * @param message - 스낵바 메시지
 * @param iconName - 나타낼 아이콘 이름
 * @param onClick - 스낵바 클릭시 실행할 함수
 * @param id - 스낵바 아이디
 * @constructor
 */
function IconSnackBar({ id, message, iconName, onClick }: SnackBarIconType) {
  const { removeSnackBar } = useSnackBar();
  const handleIconClick = () => {
    onClick();
    removeSnackBar(id);
  };

  return (
    <div
      className={snackBarWrapperCss({
        cursor: 'pointer',
      })}
      onClick={handleIconClick}
    >
      {message}
      <Icon name={iconName} color={'text.secondary'} size={16} />
    </div>
  );
}

export default IconSnackBar;

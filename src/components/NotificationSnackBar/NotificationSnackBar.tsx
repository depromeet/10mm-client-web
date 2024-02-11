import Icon from '@/components/Icon';
import dayjs from 'dayjs';

import { css } from '../../../styled-system/css';
import { getNotificationDateFormat } from '../MissionDetail/MissionCalender/MissionCalendar.utils';
import { notificationSnackBarWrapperCss } from './NotificationSnackBar.styles';
import { useNotificationSnackBar } from './NotificationSnackBarProvider';

interface Props {
  id: string;
  message: string;
  onClick: () => void;
}
/**
 * IconSnackBar
 * @param message - 스낵바 메시지
 * @param iconName - 나타낼 아이콘 이름
 * @param onClick - 스낵바 클릭시 실행할 함수
 * @param id - 스낵바 아이디
 * @constructor
 */
function NotificationSnackBar({ id, message, onClick }: Props) {
  const { removeNotificationSnackBar } = useNotificationSnackBar();
  const handleIconClick = () => {
    onClick();
    removeNotificationSnackBar(id);
  };

  return (
    <div
      className={notificationSnackBarWrapperCss({
        cursor: 'pointer',
      })}
      onClick={handleIconClick}
    >
      <Icon name={'notification'} width={38} height={38} />
      <div className={notificationSnackBarContentsWrapper}>
        <div className={noitificationSnackBarInfoRow}>
          <span
            className={css({
              textStyle: 'body4',
              color: 'text.primary',
            })}
          >
            10MM
          </span>
          <span
            className={css({
              textStyle: 'body5',
              color: 'gray.gray500',
            })}
          >
            {getNotificationDateFormat(dayjs())}
          </span>
        </div>
        <p
          className={css({
            textStyle: 'body4',
            color: 'text.primary',
          })}
        >
          {message}
        </p>
      </div>
    </div>
  );
}

export default NotificationSnackBar;

const notificationSnackBarContentsWrapper = css({
  width: '100%',
});

const noitificationSnackBarInfoRow = css({
  display: 'flex',
  justifyContent: 'space-between',
});

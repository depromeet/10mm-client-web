import Link from 'next/link';
import { useGetMembersMe } from '@/apis/member';
import Icon from '@/components/Icon';
import { useSnackBar } from '@/components/SnackBar/SnackBarProvider';
import { EVENT_LOG_CATEGORY, EVENT_LOG_NAME } from '@/constants/eventLog';
import { ROUTER } from '@/constants/router';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';
import { copyClipBoard, eventLogger } from '@/utils';

function MypageHeader() {
  const { triggerSnackBar } = useSnackBar();
  const { data } = useGetMembersMe();

  const handleClickSetting = () => {
    eventLogger.logEvent(EVENT_LOG_CATEGORY.MY_PAGE, EVENT_LOG_NAME.MY_PAGE.CLICK_SETTING);
  };
  const handleClickShare = async () => {
    if (!data) return;

    eventLogger.logEvent(EVENT_LOG_CATEGORY.MY_PAGE, EVENT_LOG_NAME.MY_PAGE.CLICK_SHARE);

    const shareText = `10mm - ${data.nickname}님을\n팔로우하고 습관을 만들어보아요!\n\n`;
    const shareUrl = window.location.origin + ROUTER.PROFILE.DETAIL(data.memberId) + '?urlShare=true';

    try {
      window.navigator.share({
        title: '10mm - 내 프로필 링크 공유하기',
        text: shareText,
        url: shareUrl,
      });
    } catch (e) {
      await copyClipBoard(shareText + shareUrl);
      triggerSnackBar({
        message: '링크가 복사되었습니다.',
        offset: 'appBar',
      });
    }
  };

  return (
    <h2 className={headingCss}>
      <button type={'button'} className={iconWrapperCss} onClick={handleClickShare}>
        <Icon name="normal-link" size={20} color="icon.primary" />
      </button>
      <Link className={iconWrapperCss} onClick={handleClickSetting} href={ROUTER.MYPAGE.SETTING}>
        <Icon name="normal-setting" size={20} color="icon.primary" />
      </Link>
    </h2>
  );
}

export default MypageHeader;

const headingCss = flex({
  justifyContent: 'flex-end',
  textStyle: 'body4',
  color: 'text.primary',
  padding: '2px 8px 2px 0',
  userSelect: 'none',
  zIndex: 3,
});
const iconWrapperCss = css({
  padding: '10px',
});

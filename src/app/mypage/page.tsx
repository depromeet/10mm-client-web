'use client';
import Link from 'next/link';
import { useGetMembersMe } from '@/apis/member';
import AppBarBottom from '@/components/AppBarBottom/AppBarBottom';
import BottomDim from '@/components/BottomDim/BottomDim';
import Icon from '@/components/Icon';
import { useSnackBar } from '@/components/SnackBar/SnackBarProvider';
import { EVENT_LOG_CATEGORY, EVENT_LOG_NAME } from '@/constants/eventLog';
import { ROUTER } from '@/constants/router';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';
import { copyClipBoard, eventLogger } from '@/utils';

import MyProfile from './MyProfile';

function Header() {
  const { triggerSnackBar } = useSnackBar();
  const { data } = useGetMembersMe();

  const handleClickSetting = () => {
    eventLogger.logEvent(EVENT_LOG_CATEGORY.MY_PAGE, EVENT_LOG_NAME.MY_PAGE.CLICK_SETTING);
  };
  const handleClickShare = async () => {
    if (!data) return;
    try {
      window.navigator.share({
        title: '10mm - 내 프로필 링크 공유하기',
        text: window.location.origin + ROUTER.PROFILE.DETAIL(data.memberId),
      });
    } catch (e) {
      await copyClipBoard(window.location.origin + ROUTER.PROFILE.DETAIL(data.memberId));
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

function Mypage() {
  return (
    <main className={backgroundCss}>
      <Header />
      <MyProfile />
      <AppBarBottom />
      <div className={profileBackgroundDimCss} />
      <BottomDim type={'bottomDim2'} />
    </main>
  );
}
const backgroundCss = css({
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  background: 'gradients.primary',
});

const profileBackgroundDimCss = css({
  position: 'absolute',
  width: '100%',
  height: '100%',
  background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.34) 0%, rgba(0, 0, 0, 0.15) 100%)',
  top: 0,
  zIndex: 1,
});

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
export default Mypage;

import AppBarBottom from '@/components/AppBarBottom/AppBarBottom';
import BottomDim from '@/components/BottomDim/BottomDim';
import MypageHeader from '@/pages/mypage/Header';
import MyProfile from '@/pages/mypage/MyProfile';
import { css } from '@/styled-system/css';

function Mypage() {
  return (
    <main className={backgroundCss}>
      <MypageHeader />
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

export default Mypage;

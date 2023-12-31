import Profile from '@/app/mypage/Profile';
import Header from '@/components/Header/Header';

function Mypage() {
  const nickname = '수미칩';
  return (
    <div>
      <Header isBackIcon={false} title="마이페이지" rightAction="none" />
    </div>
  );
}

export default Mypage;

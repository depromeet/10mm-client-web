import Header from '@/components/Layout/Header';
import { css } from '@styled-system/css';

export default function SelectPage() {
  return (
    <main className={MainWrapperCss}>
      <Header title={'미션 타이머'} />
    </main>
  );
}

const MainWrapperCss = css({
  width: '100%',
  height: '100vh',
});

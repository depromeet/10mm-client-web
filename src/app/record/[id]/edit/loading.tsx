import Header from '@/components/Header/Header';
import TextArea from '@/components/TextArea/TextArea';
import { css } from '@styled-system/css';

export default function LoadingPage() {
  return (
    <main className={mainWrapperCss}>
      <Header rightAction="text-button" title={'일지 수정'} rightButtonText={'저장'} />
      <TextArea count placeholder={'일지를 입력해주세요'} />
    </main>
  );
}

const mainWrapperCss = css({
  width: '100%',
  padding: '32px 16px 0 16px',
});

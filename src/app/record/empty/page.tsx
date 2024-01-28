import Empty from '@/components/Empty/Empty';
import Header from '@/components/Header/Header';
import { css } from '@styled-system/css';
import { stack } from '@styled-system/patterns';

function MissionRecordEmptyPage() {
  return (
    <main className={mainWrapperCss}>
      <Header rightAction="text-button" title={'미션 내역'} />

      <div className={containerCss}>
        <Empty type={'notice'} title={'미션 인증 내역이 없어요.'} image={'docs'} description={''} />
      </div>
    </main>
  );
}

export default MissionRecordEmptyPage;

const mainWrapperCss = css({
  width: '100%',
});

const containerCss = stack({
  height: 'calc(100vh - 56px)',
  alignItems: 'center',
  justifyContent: 'center',
});

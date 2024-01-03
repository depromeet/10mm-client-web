import { css } from '@styled-system/css';

import HistoryEditForm from './HistoryEditForm';

function MissionHistoryEditPage() {
  return (
    <main className={mainWrapperCss}>
      <HistoryEditForm />
    </main>
  );
}
export default MissionHistoryEditPage;

const mainWrapperCss = css({
  width: '100%',
  padding: '0 16px 0 16px',
  display: 'flex',

  flexDirection: 'column',

  gap: '32px',
});

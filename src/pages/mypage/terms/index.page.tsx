import Header from '@/components/Header/Header';
import { flex } from '@/styled-system/patterns';

import { TERMS } from './terms.constants';

function TermPage() {
  return (
    <>
      <Header rightAction="none" title="이용약관" />
      <main className={containerCss}>
        {TERMS.split('\n').map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </main>
    </>
  );
}

export default TermPage;

const containerCss = flex({
  flexDirection: 'column',
  gap: '8px',
  color: 'text.primary',
  padding: '30px 20px',

  textStyle: 'body1',
});

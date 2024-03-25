import Header from '@/components/Header/Header';
import { PRIVACY } from '@/pages/privacy/privacy.constants';
import { flex } from '@/styled-system/patterns';

function PrivacyPage() {
  return (
    <>
      <Header rightAction="none" title="개인정보 보호 정책" />
      <main className={containerCss}>
        {PRIVACY.split('\n').map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </main>
    </>
  );
}

export default PrivacyPage;

const containerCss = flex({
  flexDirection: 'column',
  gap: '8px',
  color: 'text.primary',
  padding: '30px 20px',

  textStyle: 'body1',
});

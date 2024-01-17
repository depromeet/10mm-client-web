import React from 'react';
import { PRIVACY } from '@/app/privacy/privacy.contants';
import { flex } from '@/styled-system/patterns';

function PrivacyPage() {
  return (
    <div className={containerCss}>
      {PRIVACY.split('\n').map((line, index) => (
        <p key={index}>{line}</p>
      ))}
    </div>
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

import React from 'react';
import { TERMS } from '@/app/mypage/terms/terms.constants';
import { flex } from '@/styled-system/patterns';

function TermPage() {
  return (
    <div className={containerCss}>
      {TERMS.split('\n').map((line, index) => (
        <p key={index}>{line}</p>
      ))}
    </div>
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

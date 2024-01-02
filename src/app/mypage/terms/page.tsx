import React from 'react';
import { flex } from '@/styled-system/patterns';

function TermPage() {
  return <div className={containerCss}>추후 추가될예정</div>;
}

export default TermPage;

const containerCss = flex({
  justifyContent: 'center',
  alignItems: 'center',
  color: 'text.primary',
  fontSize: '30px',
  marginTop: '50px',
});

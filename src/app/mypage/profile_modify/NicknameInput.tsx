'use client';

import { useState } from 'react';
import Input from '@/components/Input/Input';

interface Props {
  initValue: string;
}

function NicknameInput(props: Props) {
  const [value, setValue] = useState(props.initValue);

  return <Input value={value} onChange={setValue} />;
}

export default NicknameInput;

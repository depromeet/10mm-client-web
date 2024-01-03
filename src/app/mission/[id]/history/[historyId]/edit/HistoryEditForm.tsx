'use client';

import Header from '@/components/Header/Header';
import { useInput } from '@/components/Input/Input.hooks';
import TextArea from '@/components/TextArea/TextArea';

function HistoryEditForm() {
  const { value, onInputChange } = useInput('');

  return (
    <>
      <Header rightAction="text-button" title={'일지수정'} rightButtonText={'저장'} />
      <TextArea count value={value} onChange={onInputChange} />
    </>
  );
}
export default HistoryEditForm;

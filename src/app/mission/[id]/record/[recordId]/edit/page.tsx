'use client';
import { type ChangeEventHandler, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGetRecordDetail } from '@/apis';
import Header from '@/components/Header/Header';
import { useSnackBar } from '@/components/SnackBar/SnackBarProvider';
import TextArea from '@/components/TextArea/TextArea';
import { ROUTER } from '@/constants/router';
import { css } from '@styled-system/css';

function MissionRecordEditPage({ params }: { params: { recordId: string; id: string } }) {
  const { data } = useGetRecordDetail(params.recordId as string);
  const { triggerSnackBar } = useSnackBar();
  const router = useRouter();
  const [value, setValue] = useState(data.remark);

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setValue(event.target.value);
  };

  const handleSaveButtonClick = () => {
    triggerSnackBar({ message: '저장되었습니다.' });
    router.push(
      ROUTER.MISSION.RECORD_DETAIL({
        missionId: params.id,
        recordId: params.recordId,
      }),
    );
  };
  return (
    <main className={mainWrapperCss}>
      <Header
        rightAction="text-button"
        title={'일지 수정'}
        rightButtonText={'저장'}
        onButtonClick={handleSaveButtonClick}
      />
      <TextArea count placeholder={'일지를 입력해주세요'} onChange={handleChange} value={value} />
    </main>
  );
}

export default MissionRecordEditPage;

const mainWrapperCss = css({
  width: '100%',
  padding: '32px 16px 0 16px',
});

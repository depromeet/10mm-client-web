import { type ChangeEventHandler, useState } from 'react';
import { type GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { useGetRecordDetail, useUpdateRemarkMutation } from '@/apis';
import Header from '@/components/Header/Header';
import { useSnackBar } from '@/components/SnackBar/SnackBarProvider';
import TextArea from '@/components/TextArea/TextArea';
import { ROUTER } from '@/constants/router';
import { css } from '@styled-system/css';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      params: { id: context.query.id },
    },
  };
}

function MissionRecordEditPage({ params }: { params: { id: string } }) {
  const { data } = useGetRecordDetail(params.id as string);
  const { triggerSnackBar } = useSnackBar();
  const router = useRouter();

  const { mutate } = useUpdateRemarkMutation(params.id, {
    onSuccess: () => {
      triggerSnackBar({ message: '저장되었습니다.' });

      router.replace(ROUTER.RECORD.DETAIL.HOME(params.id));
    },
    onError: () => {
      triggerSnackBar({ message: '저장에 실패했습니다. 다시 시도해주세요.' });
    },
  });
  const [value, setValue] = useState(data.remark);

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setValue(event.target.value);
  };

  const handleSaveButtonClick = () => {
    mutate({ remark: value });
  };

  return (
    <main className={mainWrapperCss}>
      <Header
        rightAction="text-button"
        title={'일지 수정'}
        rightButtonText={'저장'}
        rightButtonProps={{
          onClick: handleSaveButtonClick,
        }}
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

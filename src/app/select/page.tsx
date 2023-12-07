import SelectMissionForm from '@/app/select/SelectMissionForm';
import Header from '@/components/Layout/Header';
import { css } from '@styled-system/css';

export default function SelectPage() {
  return (
    <main className={mainWrapperCss}>
      <Header title={'미션 등록'} />
      <div className={containerCss}>
        <h1 className={mainTitleCss}>
          하루 <strong>10분</strong>을 <br />
          어떤 일에 투자하고 싶은가요?
        </h1>
        <SelectMissionForm />
      </div>
    </main>
  );
}

const grey800 = '#333D4B';
const purple = '#8D96F0';

const mainWrapperCss = css({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',

  width: '100%',
});

const containerCss = css({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,

  padding: '24px 16px',
});

const mainTitleCss = css({
  marginTop: '2px',

  textStyle: 'title2',

  color: grey800,
  '& strong': {
    color: purple,
    textStyle: 'title2',
  },
});

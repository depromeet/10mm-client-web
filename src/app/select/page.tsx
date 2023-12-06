import RadioInputWithEmoji from '@/app/select/RadioInputWithEmoji';
import Header from '@/components/Layout/Header';
import { css } from '@styled-system/css';

export default function SelectPage() {
  return (
    <main className={MainWrapperCss}>
      <Header title={'미션 등록'} />
      <div className={containerCss}>
        <h1 className={MainTitleCss}>
          하루 <strong>10분</strong>을 <br />
          어떤 일에 투자하고 싶은가요?
        </h1>
        <form>
          <RadioInputWithEmoji imgSrc={'/images/emoji-book.png'} label={'독서'} name={'category'} value={'read'} />
          <RadioInputWithEmoji imgSrc={'/images/emoji-book.png'} label={'독서'} name={'category'} value={'dddd'} />
          <RadioInputWithEmoji imgSrc={'/images/emoji-book.png'} label={'독서'} name={'category'} value={'cccc'} />
        </form>
      </div>
    </main>
  );
}

const grey800 = '#333D4B';
const purple = '#8D96F0';

const MainWrapperCss = css({
  width: '100%',
  height: '100vh',
});

const containerCss = css({
  padding: '24px 16px',
});

const MainTitleCss = css({
  marginTop: '2px',
  fontSize: '24px',
  fontWeight: 700,
  lineHeight: '30px',

  color: grey800,
  '& strong': {
    color: purple,
    fontWeight: 700,
  },
});

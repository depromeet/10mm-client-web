import { type ReactNode } from 'react';
import Image from 'next/image';
import Button from '@/components/Button/Button';
import Icon from '@/components/Icon';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

interface Props {
  title: string;
  description: string;
  icon: 'docs' | 'celebratory';
  buttonElement?: ReactNode;
}

function DefaultEmpty(props: Props) {
  return (
    <article className={containerCss}>
      <div className={imageCss}>
        <Image src={`/images/empty-${props.icon}.png`} alt="empty image" width={200} height={120} />
      </div>
      <h2 className={titleCss}>{props.title}</h2>
      <p className={descriptionCss}>{props.description}</p>
      {props.buttonElement && <div className={buttonWrapperCss}>{props.buttonElement}</div>}
    </article>
  );
}

function SuggestEmpty({
  buttonText,
  buttonAction,
  ...props
}: Omit<Props, 'buttonElement'> & {
  buttonText: string;
  buttonAction: () => void;
}) {
  return (
    <DefaultEmpty
      {...props}
      buttonElement={
        <Button size="small" variant="secondary" onClick={buttonAction}>
          {buttonText}
        </Button>
      }
    />
  );
}

function NoticeEmpty(props: Omit<Props, 'buttonElement'>) {
  return <DefaultEmpty {...props} />;
}

function RefreshEmpty() {
  return (
    <article className={flex({ textAlign: 'center', flexDirection: 'column', alignItems: 'center', gap: '16px' })}>
      <div>
        <Icon name="refresh" color="icon.secondary" />
      </div>
      <div className={css({ textStyle: 'body1', color: 'gray.gray600' })}>
        <p>네트워크 연결 상태가 좋지 않습니다.</p>
        <p>잠시 후 다시 시도해 주세요.</p>
      </div>
    </article>
  );
}

export default Object.assign(DefaultEmpty, {
  Suggest: SuggestEmpty,
  Notice: NoticeEmpty,
  Refresh: RefreshEmpty,
});

const containerCss = css({ textAlign: 'center' });
const imageCss = css({});
const titleCss = css({ color: 'text.primary', textStyle: 'subtitle2', marginTop: '8px' });
const descriptionCss = css({ color: 'gray.gray600', textStyle: 'body4', marginTop: '6px' });
const buttonWrapperCss = css({
  marginTop: '20px',
});

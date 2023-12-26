import { type PropsWithChildren } from 'react';
import Image from 'next/image';
import Button from '@/components/Button/Button';
import {
  type EmptyProps,
  type NoticesEmptyProps,
  type RefreshEmptyProps,
  type SuggestEmptyProps,
} from '@/components/Empty/Empty.types';
import Icon from '@/components/Icon';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

function DefaultEmptyView({ children, ...props }: PropsWithChildren<DefaultEmptyProps>) {
  return (
    <article className={containerCss}>
      <div className={imageCss}>
        <Image src={`/images/empty-${props.image}.png`} alt="empty image" width={200} height={120} />
      </div>
      <h2 className={titleCss}>{props.title}</h2>
      <p className={descriptionCss}>{props.description}</p>
      {children}
    </article>
  );
}

function SuggestEmpty({ buttonText, buttonAction, ...props }: SuggestEmptyProps) {
  return (
    <DefaultEmptyView {...props}>
      <div className={buttonWrapperCss}>
        <Button size="small" variant="secondary" onClick={buttonAction}>
          {buttonText}
        </Button>
      </div>
    </DefaultEmptyView>
  );
}

function NoticeEmpty(props: NoticesEmptyProps) {
  return <DefaultEmptyView {...props} />;
}

function RefreshEmpty(props: RefreshEmptyProps) {
  return (
    <article
      className={flex({ textAlign: 'center', flexDirection: 'column', alignItems: 'center', gap: '16px' })}
      {...props}
    >
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

function Empty({ ...props }: EmptyProps) {
  switch (props.type) {
    case 'suggest':
      return <SuggestEmpty {...props} />;
    case 'notice':
      return <NoticeEmpty {...props} />;
    case 'refresh':
      return <RefreshEmpty {...props} />;
  }
}
export default Empty;

const containerCss = css({ textAlign: 'center' });
const imageCss = css({});
const titleCss = css({ color: 'text.primary', textStyle: 'subtitle2', marginTop: '8px' });
const descriptionCss = css({ color: 'gray.gray600', textStyle: 'body4', marginTop: '6px' });
const buttonWrapperCss = css({
  marginTop: '20px',
});

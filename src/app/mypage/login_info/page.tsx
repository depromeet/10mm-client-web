'use client';
import { AUTH_PROVIDER_LABEL, useGetSocialLoginInfo } from '@/apis/member';
import Icon from '@/components/Icon';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

function LoginInfoPage() {
  const { data } = useGetSocialLoginInfo();
  if (!data) return null;
  return (
    <div className={containerCss}>
      <Icon name="log-in-information" color="icon.secondary" width={20} height={20} />
      <div className={textWrapperCss}>
        <p className={titleCss}>{AUTH_PROVIDER_LABEL[data.provider]}</p>
        <p className={contentCss}>{data.email}</p>
      </div>
    </div>
  );
}

export default LoginInfoPage;

const containerCss = flex({
  gap: '10px',
  padding: '16px',
  alignItems: 'center',
  backgroundColor: 'bg.surface3',
  borderRadius: '22px',
  height: '74px',
  cursor: 'pointer',
});

const textWrapperCss = flex({ flex: 1, flexDirection: 'column', gap: '2px', minWidth: '0' });
const titleCss = css({
  color: 'text.tertiary',
  textStyle: 'body4',
  width: '100%',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
});
const contentCss = css({
  color: 'text.secondary',
  textStyle: 'body3',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

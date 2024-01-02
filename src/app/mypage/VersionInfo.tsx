import { css } from '@/styled-system/css';

const VERSION = '1.0';
function VersionInfo() {
  return <article className={containerCss}>버전 정보 {VERSION}</article>;
}

export default VersionInfo;

const containerCss = css({
  position: 'fixed',
  bottom: '130px',
  left: 0,
  right: 0,
  margin: '0 auto',
  width: 'fit-content',
  textStyle: 'body4',
  color: 'text.tertiary',
});

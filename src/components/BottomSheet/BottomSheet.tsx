import { type ComponentProps, type ReactNode } from 'react';
import type AnimatePortal from '@/components/portal/AnimationPortal';
import { css } from '@/styled-system/css';
import { BottomSheet as SpringBottomSheet } from 'react-spring-bottom-sheet';

import 'react-spring-bottom-sheet/dist/style.css';

/**
 * @description
 * 화면 하단에서 올라오며 연관된 컨텐츠를 제공하기 위해 사용하는 컴포넌트 입니다.
 * 기존의 컨텍스트에서 벗어나지 않고 연관된 작업을 빠르게 프로세스하는 느낌을 유저에게 전달합니다.
 * @param headerElement BottomSheet header element, Header element를 넣습니다.
 * @param onClickOutside  scrim을 클릭했을 때 실행되는 함수이며, 기본적으로 target을 확인한 후 실행됩니다
 */
interface Props extends ComponentProps<typeof AnimatePortal> {
  headerElement: ReactNode;
  onClickOutside?: VoidFunction;
}

function BottomSheet({ children, onClickOutside, isShowing, headerElement }: Props) {
  return (
    <SpringBottomSheet open={isShowing} className={css(bottomSheetCss)} onDismiss={onClickOutside}>
      <div className={headerWrapperCss}>{headerElement}</div>
      <div className={contentCss}>{children}</div>
      <div className={safeAreaCss} />
      <div className={indicatorAreaCss} />
    </SpringBottomSheet>
  );
}

export default BottomSheet;

const contentCss = css({
  padding: '0 16px',
});

const headerWrapperCss = css({
  width: '100%',
  paddingTop: '16px',
  paddingBottom: '12px',
  '& header': {
    position: 'relative',
    background: 'transparent',
    '& .back-button': {
      // TODO : 수정 필요, 중간 발표를 위한 임시방편
      display: 'none',
    },
  },
  '& section': {
    gap: '0px',
  },
  '& h2': {
    position: 'absolute',
    left: 0,
    right: 0,
    margin: '0 auto',
    width: 'fit-content',
    textStyle: 'subtitle1',
    color: 'text.primary',
  },
  '& article': {
    display: 'none',
  },
});
// TODO : 토큰이 입력 안되는 이슈
const bottomSheetCss = {
  '--rsbs-backdrop-bg': 'rgba(0, 0, 0, 0.60)',
  '--rsbs-max-w': '475px',
  '--rsbs-ml': 'auto',
  '--rsbs-mr': 'auto',
  '--rsbs-bg': '#212129',
  '--rsbs-overlay-rounded': '28px',

  '--rsbs-handle-bg': '#3C3D47',
};

const safeAreaCss = css({
  height: '16px',
  width: '100%',
});
const indicatorAreaCss = css({
  height: '34px',
  width: '100%',
});

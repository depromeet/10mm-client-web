import { type ComponentProps, type MouseEventHandler, type ReactNode } from 'react';
import AnimatePortal from '@/components/portal/AnimationPortal';
import { css } from '@/styled-system/css';
import { motion } from 'framer-motion';

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

function BottomSheet({ children, onClickOutside, isShowing, mode, headerElement }: Props) {
  const onClickOutsideDefault: MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target !== e.currentTarget) return;
    if (onClickOutside) onClickOutside();
  };

  return (
    <AnimatePortal isShowing={isShowing} mode={mode}>
      <motion.div onClick={onClickOutsideDefault} className={css(overlayCss, { zIndex: 9999 })}>
        <motion.div
          key="bottom-sheet"
          className={css(contentCss)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.03 }}
          exit={{ opacity: 0 }}
        >
          <div className={headerWrapperCss}>{headerElement}</div>
          {children}
          <div className={safeAreaCss} />
          <div className={indicatorAreaCss} />
        </motion.div>
      </motion.div>
    </AnimatePortal>
  );
}

export default BottomSheet;

const headerWrapperCss = css({
  width: '100%',
  paddingTop: '16px',
  paddingBottom: '12px',
  '& header': {
    position: 'relative',
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

const overlayCss = {
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  background: 'scrim.screen',
};

const contentCss = {
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  width: '100%',
  maxWidth: '475px', // TODO: mobile max size에 따라 변경
  margin: '0 auto',
  background: 'bg.surface3',
  // minHeight: '300px',
  borderRadius: '28px 28px 0px 0px',
};

const safeAreaCss = css({
  height: '16px',
  width: '100%',
});
const indicatorAreaCss = css({
  height: '34px',
  width: '100%',
});

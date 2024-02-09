import { type PropsWithChildren } from 'react';
import { css, cx } from '@/styled-system/css';

interface Props {
  isSelected?: boolean;
  onClick: () => void;
}

function CalendarItem(props: PropsWithChildren<Props>) {
  return (
    <td className={cx(itemCss, props.isSelected && selectedCss)} {...props}>
      <span
        className={cx(
          textCss,
          css({
            color: props.isSelected ? 'purple.purple700' : 'gray.gray600',
          }),
        )}
      >
        {props.children}
      </span>
    </td>
  );
}

export default CalendarItem;

const itemCss = css({
  position: 'relative',
  textStyle: 'subtitle3',
  width: '40px',
  height: '40px',
  cursor: 'pointer',

  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    border: '1px solid',
    borderColor: 'purple.purple700 !',
    transform: 'translate(-50%, -50%)',
    pointerEvents: 'none',
    background:
      'linear-gradient(0deg, rgba(0, 0, 0, 0.87), rgba(0, 0, 0, 0.87)), linear-gradient(0deg, #FFFFFF, #FFFFFF)',
    zIndex: 0,

    opacity: 0,
    transition: 'opacity 0.3s',
  },
});

const selectedCss = css({
  '&::before': {
    opacity: 1,
  },
});

const textCss = css({
  position: 'relative',
  zIndex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  transition: 'color 0.3s',
});

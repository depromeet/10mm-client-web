import Image from 'next/image';
import { css, cx } from '@/styled-system/css';

interface Props {
  isLocked?: boolean;
  width: number;
  height: number;
  level: number;
}

function Character(props: Props) {
  return (
    <div
      className={cx(
        imageWrapperCss,
        css({
          width: props.width,
          height: props.height,
        }),
      )}
    >
      {props.isLocked ? (
        <>
          <Image src={`/assets/character-by-level/locked/${props.level}.svg`} alt="locked" fill />
          <Image src={`/assets/character-by-level/locked/lock.svg`} alt="locked" fill />
        </>
      ) : (
        <Image src={`/assets/character-by-level/default/${props.level}.png`} fill alt="10mm character image" />
      )}
    </div>
  );
}

export default Character;

const imageWrapperCss = css({
  position: 'relative',

  '& img': {
    position: 'absolute',
    top: 0,
    bottom: 0,
    margin: 'auto',
  },
});

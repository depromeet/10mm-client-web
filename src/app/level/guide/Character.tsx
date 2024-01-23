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
      key={props.level}
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
          <Image
            src={`/assets/character-by-level/locked/${props.level}.svg`}
            alt="locked"
            width={props.width}
            height={props.height}
          />
          <Image src={`/assets/character-by-level/locked/lock.svg`} alt="locked" width={180} height={180} />
        </>
      ) : (
        <Image
          src={`/assets/character-by-level/default/${props.level}.png`}
          width={props.width}
          height={props.height}
          alt="10mm character image"
        />
      )}
    </div>
  );
}

export default Character;

const imageWrapperCss = css({
  position: 'relative',
  margin: '0 auto',
  animation: 'fadeIn .7s',
  height: '100%',

  '& img': {
    animation: 'fadeIn .7s',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: 'auto',
  },
});

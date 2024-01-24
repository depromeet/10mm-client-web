import Image from 'next/image';
import { css, cva, cx } from '@/styled-system/css';

interface Props {
  width: number;
  height: number;
  level: number;
  isLocked?: boolean;
  isBackground?: boolean;
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
            className={imageCss}
          />
          <Image
            src={`/assets/character-by-level/locked/lock.svg`}
            alt="locked"
            width={180}
            height={180}
            className={imageCss}
          />
        </>
      ) : (
        <>
          {props.isBackground && (
            <Image
              src="/assets/level/level-guide-bg.svg"
              alt={'guide bg'}
              width={375}
              height={382}
              className={cx(imageCss, characterImageBgCss)}
            />
          )}
          <Image
            src={`/assets/character-by-level/default/${props.level}.png`}
            width={props.width}
            height={props.height}
            alt="10mm character image"
            className={imageCss}
          />
        </>
      )}
    </div>
  );
}

export default Character;

interface LockedCharacterProps {
  level: number;
  size: 'md' | 'lg';
}

export function LockedCharacter(props: LockedCharacterProps) {
  return (
    <div key={props.level} className={cx(imageWrapperCss)}>
      <Image
        src={`/assets/character-by-level/locked/${props.level}.svg`}
        alt="locked"
        width={180}
        height={180}
        className={cx(imageCss, lockCharacterImageCva({ size: props.size }))}
      />
      <Image
        src={`/assets/character-by-level/locked/lock.svg`}
        alt="locked"
        width={180}
        height={180}
        className={cx(imageCss, lockCoverImageCva({ size: props.size }))}
      />
    </div>
  );
}

const lockCharacterImageCva = cva({
  base: { position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, margin: 'auto', animation: 'fadeIn .7s' },
  variants: {
    size: {
      lg: {
        width: '202px',
        height: '151px',
      },
      md: {
        width: '76px',
        height: '56.8px',
      },
    },
  },
});

const lockCoverImageCva = cva({
  base: {},
  variants: {
    size: {
      md: {
        width: '72px',
        height: '72px',
      },
      lg: {
        width: '180px',
        height: '180px',
      },
    },
  },
});

const imageWrapperCss = css({
  position: 'relative',
  margin: '0 auto',
  animation: 'fadeIn .7s',
  height: '100%',
  width: '100%',
});

const imageCss = css({
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  margin: 'auto',
  animation: 'fadeIn .7s',
});

const characterImageBgCss = css({
  left: '50%',
  transform: 'translateX(-50%)',
  minWidth: '375px',
  minHeight: '382px',
});

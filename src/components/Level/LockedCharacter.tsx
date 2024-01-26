import Image from 'next/image';
import { css, cva, cx } from '@/styled-system/css';

interface Props {
  level: number;
  size: 'md' | 'lg';
}

function LockedCharacter(props: Props) {
  return (
    <div key={props.level} className={cx(imageWrapperCss)}>
      <Image
        src={`/assets/character-by-level/locked/${props.level}.svg`}
        alt="locked"
        width={202}
        height={151}
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

export default LockedCharacter;
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

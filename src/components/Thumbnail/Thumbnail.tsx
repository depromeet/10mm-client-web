import Image from 'next/image';
import { type ThumbnailProps } from '@/components/Thumbnail/Thumbnail.types';
import { cva } from '@/styled-system/css';

// NOTE: variant = null을 변수로 받아야할까?
function Thumbnail({ variant, url, ...props }: ThumbnailProps) {
  switch (variant) {
    case 'filled':
    case 'dimed':
      return (
        <div className={thumbnailStyle(props)}>
          <Image src={url} fill alt="thumbnail" />
        </div>
      );
    case 'null':
    default:
      return (
        <div className={thumbnailStyle(props)}>
          <Image src={'/images/thumbnail-null.png'} fill alt="thumbnail" />
        </div>
      );
  }
}

export default Thumbnail;

const thumbnailStyle = cva({
  base: {
    position: 'relative',
    overflow: 'hidden',
    flexShrink: 0,
  },
  variants: {
    size: {
      h52: {
        width: '52px',
        height: '52px',
        borderRadius: '20px', //TODO : 수정 필요
      },
      h32: {
        width: '32px',
        height: '32px',
        borderRadius: '14px', //TODO : 수정 필요
      },
      h36: {
        width: '36px',
        height: '36px',
        borderRadius: '14px', //TODO : 수정 필요
      },
    },
    variant: {
      null: {},
      filled: {
        '& img': {
          filter: 'brightness(0.9)',
        },
      },
      dimed: {
        '& img': {
          filter: 'brightness(0.4)',
        },
      },
    },
    selected: {
      true: {
        border: '1.5px solid transparent',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundOrigin: 'border-box',
        backgroundClip: 'content-box, border-box',
        backgroundImage:
          'linear-gradient(#D9D9D9, #D9D9D9), linear-gradient(103.3deg, #F3D2EA 6.96%, #D8B8F1 38.47%, #ABBEF0 94.63%)',
      },
    },
  },
  defaultVariants: {
    size: 'h52',
    variant: 'null',
  },
});

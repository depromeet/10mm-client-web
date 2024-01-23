import Image from 'next/image';
import { type ThumbnailProps } from '@/components/Thumbnail/Thumbnail.types';
import { cva } from '@/styled-system/css';

export const DEFAULT_THUMBNAIL_URL = '/images/thumbnail-null.png';

function Thumbnail({ url, ...props }: ThumbnailProps) {
  const imageUrl = url ?? DEFAULT_THUMBNAIL_URL;

  switch (props.variant) {
    case 'filled':
    case 'dimed':
      return (
        <div className={thumbnailStyle(props)}>
          <Image src={imageUrl} fill alt="thumbnail" />
        </div>
      );
    // TODO : null variant 삭제하기
    case 'null':
    default:
      return (
        <div className={thumbnailStyle(props)}>
          <Image src={DEFAULT_THUMBNAIL_URL} fill alt="thumbnail" />
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
      h80: {
        width: '80px',
        height: '80px',
        borderRadius: '31px',
      },
      h52: {
        width: '52px',
        height: '52px',
        borderRadius: '20px',
      },
      h36: {
        width: '36px',
        height: '36px',
        borderRadius: '14px',
      },
      h24: {
        width: '24px',
        height: '24px',
        borderRadius: '10px',
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
        border: '1px solid transparent',
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

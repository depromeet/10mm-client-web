import Image from 'next/image';
import { cva, type RecipeVariantProps } from '@/styled-system/css';

type ThumbnailVariants = RecipeVariantProps<typeof thumbnailStyle> & {
  url?: string;
};

function Thumbnail({ url, ...props }: ThumbnailVariants) {
  return (
    <div className={thumbnailStyle(props)}>
      {url && props.variant !== 'null' && <Image src={url} fill alt="thumbnail" />}
    </div>
  );
}

export default Thumbnail;

const thumbnailStyle = cva({
  base: {
    position: 'relative',
    backgroundSize: 'cover',
    backgroundImage: 'url(/images/thumbnail-null.png) ',
    overflow: 'hidden',
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
    },
    variant: {
      null: {
        backgroundImage: 'url(/images/thumbnail-null.png) ',
      },
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
      },
    },
  },
  compoundVariants: [
    {
      variant: 'null',
      selected: true,
      css: {
        backgroundImage:
          'url(/images/thumbnail-null.png), linear-gradient(103.3deg, #F3D2EA 6.96%, #D8B8F1 38.47%, #ABBEF0 94.63%)',
      },
    },
    {
      variant: 'filled',
      selected: true,
      css: {
        backgroundImage:
          'linear-gradient(#D9D9D9, #D9D9D9), linear-gradient(103.3deg, #F3D2EA 6.96%, #D8B8F1 38.47%, #ABBEF0 94.63%)',
      },
    },
    {
      variant: 'dimed',
      selected: true,
      css: {
        backgroundImage:
          'linear-gradient(#D9D9D9, #D9D9D9), linear-gradient(103.3deg, #F3D2EA 6.96%, #D8B8F1 38.47%, #ABBEF0 94.63%)',
      },
    },
  ],
});

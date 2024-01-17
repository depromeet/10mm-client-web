import Thumbnail from '@/components/Thumbnail/Thumbnail';
import { type ThumbnailProps } from '@/components/Thumbnail/Thumbnail.types';

type NullableThumbnailProps = Omit<ThumbnailProps, 'url'> & {
  url: string | null;
};

function NullableThumbnail({ variant = 'filled', url, ...props }: NullableThumbnailProps) {
  if (!url || variant === 'null') {
    return <Thumbnail variant={'null'} {...props} />;
  }

  return <Thumbnail variant={variant} url={url} {...props} />;
}

export default NullableThumbnail;

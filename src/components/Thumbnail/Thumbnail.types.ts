type ThumbnailSizeType = 'h52' | 'h36' | 'h80' | 'h24';

interface ThumbnailBaseProps {
  variant?: 'null' | 'dimed' | 'filled'; // default : null
  size: ThumbnailSizeType;
  selected?: boolean;
  url?: string | null;
}

export interface FilledThumbnailProps extends ThumbnailBaseProps {
  variant: 'filled';
}

export interface DimmedThumbnailProps extends ThumbnailBaseProps {
  variant: 'dimed';
}

export interface NullThumbnailProps extends ThumbnailBaseProps {
  variant?: 'null';
}

export type ThumbnailProps = FilledThumbnailProps | DimmedThumbnailProps | NullThumbnailProps;

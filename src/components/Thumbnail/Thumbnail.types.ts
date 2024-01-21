type ThumbnailSizeType = 'h52' | 'h36' | 'h80' | 'h24';

interface ThumbnailBaseProps {
  variant?: 'null' | 'dimed' | 'filled'; // default : null
  size: ThumbnailSizeType;
  selected?: boolean;
}

export interface FilledThumbnailProps extends ThumbnailBaseProps {
  url?: string;
  variant: 'filled';
}

export interface DimmedThumbnailProps extends ThumbnailBaseProps {
  url?: string;
  variant: 'dimed';
}

export interface NullThumbnailProps extends ThumbnailBaseProps {
  variant?: 'null';
  url?: string;
}

export type ThumbnailProps = FilledThumbnailProps | DimmedThumbnailProps | NullThumbnailProps;

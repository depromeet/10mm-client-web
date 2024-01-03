type ThumbnailSizeType = 'h52' | 'h32' | 'h36' | 'h80';
export type ThumbnailVariantType = 'null' | 'dimed' | 'filled';

interface ThumbnailBaseProps {
  variant?: ThumbnailVariantType;
  size: ThumbnailSizeType;
  selected?: boolean;
}

export interface FilledThumbnailProps extends ThumbnailBaseProps {
  url: string;
  variant: 'filled';
}

export interface DimmedThumbnailProps extends ThumbnailBaseProps {
  url: string;
  variant: 'dimed';
}

export interface NullThumbnailProps extends ThumbnailBaseProps {
  variant?: 'null';
  url?: null;
}

export type ThumbnailProps = FilledThumbnailProps | DimmedThumbnailProps | NullThumbnailProps;

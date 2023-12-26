type ThumbnailSizeType = 'h52' | 'h32';
interface ThumbnailBaseProps {
  size: ThumbnailSizeType;
  selected: boolean;
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
  variant: 'null';
  url?: null;
}

export type ThumbnailProps = FilledThumbnailProps | DimmedThumbnailProps | NullThumbnailProps;

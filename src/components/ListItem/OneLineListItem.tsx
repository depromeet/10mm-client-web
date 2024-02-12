import { type ReactNode } from 'react';
import Image from 'next/image';
import Thumbnail from '@/components/Thumbnail/Thumbnail';
import { type ThumbnailProps } from '@/components/Thumbnail/Thumbnail.types';
import { oneLineTextCss } from '@/constants/style/text';
import { css, cx } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

interface Props {
  name: string;
  rightElement?: ReactNode;
  leftElement?: ReactNode;
  onClick?: () => void;
}

function OneLineListItem(props: Props) {
  return (
    <li className={containerCss} onClick={props.onClick}>
      {props.leftElement && <div className={leftWrapperCss}>{props.leftElement}</div>}
      <span className={cx(oneLineTextCss, nameCss)}>{props.name}</span>
      {props.rightElement && <div className={rightWrapperCss}>{props.rightElement}</div>}
    </li>
  );
}

type SubOneLineListItemProps = Omit<Props, 'leftElement'>;
function NoneOneLineListItem(props: SubOneLineListItemProps) {
  return <OneLineListItem {...props} />;
}

interface ImageOneLineListItemProps extends SubOneLineListItemProps {
  imageUrl: string;
}

function ImageOneLineListItem({ imageUrl, ...props }: ImageOneLineListItemProps) {
  return <OneLineListItem {...props} leftElement={<Image src={imageUrl} alt={props.name} width={28} height={28} />} />;
}

interface ThumbnailOneLineListItemProps extends SubOneLineListItemProps {
  thumbnail?: ThumbnailProps;
}

function ThumbnailOneLineListItem({ thumbnail, ...props }: ThumbnailOneLineListItemProps) {
  return <OneLineListItem {...props} leftElement={<Thumbnail {...thumbnail} size="h36" />} />;
}

export default Object.assign(OneLineListItem, {
  None: NoneOneLineListItem,
  Image: ImageOneLineListItem,
  Thumbnail: ThumbnailOneLineListItem,
});

const containerCss = flex({
  alignItems: 'center',
  padding: '8px 16px',
});

const leftWrapperCss = css({
  marginRight: '12px',
});

const nameCss = css({
  color: 'text.secondary',
  flex: 1,
  textStyle: 'subtitle4',
});

const rightWrapperCss = css({
  marginLeft: '4px',
});

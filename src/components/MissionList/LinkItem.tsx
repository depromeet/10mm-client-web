import { type ComponentProps } from 'react';
import Link from 'next/link';
import MissionItem from '@/components/MissionList/Item';

interface Props extends ComponentProps<typeof MissionItem> {
  href: string;
  onClick?: () => void; // link click event
}

function MissionLinkItem({ href, onClick, ...props }: Props) {
  if (!href) return <MissionItem {...props} />;

  return (
    <Link href={href} key={props.missionId} onClick={onClick}>
      <MissionItem {...props} />
    </Link>
  );
}

export default MissionLinkItem;

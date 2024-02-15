import { type ComponentProps } from 'react';
import Link from 'next/link';
import MissionItem from '@/components/MissionList/Item';

interface Props extends ComponentProps<typeof MissionItem> {
  href: string;
}

function MissionLinkItem(props: Props) {
  if (!props.href) return <MissionItem {...props} />;

  return (
    <Link href={props.href} key={props.missionId}>
      <MissionItem {...props} />
    </Link>
  );
}

export default MissionLinkItem;

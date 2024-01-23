import { type MissionStatus } from '@/apis/schema/mission';
import Badge from '@/components/Badge/Badge';

function MissionBadge({ status }: { status: MissionStatus }) {
  switch (status) {
    case 'COMPLETED':
      return <Badge color="purple">완료</Badge>;
    case 'REQUIRED':
      return <Badge color="red">인증 필요</Badge>;
    case 'PROGRESSING':
      return <Badge color="gray">진행중</Badge>;

    default:
      return null;
  }
}

export default MissionBadge;

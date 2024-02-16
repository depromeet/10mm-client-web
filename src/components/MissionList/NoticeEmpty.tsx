import Empty from '@/components/Empty/Empty';
import { center } from '@/styled-system/patterns/center';

function MissionListNoticeEmpty() {
  return (
    <div className={containerCss}>
      <Empty type="notice" title={'아직 등록된 미션이 없어요.'} description={''} image={'docs'} />
    </div>
  );
}

export default MissionListNoticeEmpty;

const containerCss = center({
  height: '100%',
  width: '100%',
  padding: '60px 0',
});

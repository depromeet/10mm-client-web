import Icon from '@/components/Icon';
import Thumbnail from '@/components/Thumbnail/Thumbnail';
import { flex } from '@styled-system/patterns';

function FollowSummary() {
  return (
    <div>
      <div className={followSummaryTitleCss}>
        <Thumbnail size={'h36'} />
        <p className={followSummaryTextCss}>
          당근조이 <Icon name={'arrow-forward'} size={12} />
        </p>
      </div>
      <h1>Follow Summary</h1>
    </div>
  );
}

export default FollowSummary;

const followSummaryTitleCss = flex({
  padding: '12px 4px',
  flexDirection: 'row',
  textStyle: 'body4',
  color: 'text.primary',
  alignItems: 'center',
  gap: '8px',
});

const followSummaryTextCss = flex({
  flexDirection: 'row',
  alignItems: 'center',
  gap: '4px',
});

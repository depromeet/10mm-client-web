import { useFollowMissions } from '@/apis/mission';
import Banner from '@/components/Banner/Banner';
import Icon from '@/components/Icon';
import LevelProgressBar from '@/components/LevelStatus/LevelProgressBar';
import Thumbnail from '@/components/Thumbnail/Thumbnail';
import { gradientTextCss } from '@/constants/style/text';
import { getLevel } from '@/utils/result';
import { css, cx } from '@styled-system/css';
import { flex } from '@styled-system/patterns';

interface FollowSummaryProps {
  followId: number;
}

function FollowSummary({ followId }: FollowSummaryProps) {
  const { data } = useFollowMissions(followId);
  const symbolStack = data?.symbolStack ?? 0;
  const currentLevel = getLevel(symbolStack);

  return (
    <div>
      <div className={followSummaryTitleCss}>
        <Thumbnail size={'h36'} />
        <p className={followSummaryTextCss}>
          당근조이 <Icon name={'arrow-forward'} size={12} />
        </p>
      </div>
      <div className={followBannerCss}>
        <Banner type={'graphic'} imageUrl={'/assets/level/1.png'} />
        <div className={followLevelInfoCss}>
          <div className={levelWrapperCss}>
            <Icon name={'10mm-symbol-circle'} size={20} />
            <span className={cx(levelLabelCss, gradientTextCss)}>{symbolStack}</span>
          </div>
          <p className={LevelNameCss}>{currentLevel.label}. 잼민이</p>
          <LevelProgressBar current={50} isLabel={false} backgroundColor={'purple.purple500'} />
        </div>
      </div>
    </div>
  );
}

export default FollowSummary;

const followLevelInfoCss = flex({
  flexDirection: 'column',
  paddingRight: '24px',
  justifyContent: 'center',
});

const LevelNameCss = css({
  textStyle: 'body6',
  color: 'text.tertiary',
  marginTop: '10px',
  textWrap: 'nowrap',
  marginBottom: '8px',
});

const levelWrapperCss = flex({
  gap: '4px',
  alignItems: 'center',
});

const levelLabelCss = css({
  fontSize: '20px',
  fontWeight: '300',
});

const followBannerCss = flex({
  flexDirection: 'row',
  gap: '24px',
  marginBottom: '20px',
});
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

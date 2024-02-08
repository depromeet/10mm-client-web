import Link from 'next/link';
import { useGetMissionStack } from '@/apis/mission';
import { type FollowMemberType } from '@/apis/schema/member';
import Banner from '@/components/Banner/Banner';
import LevelProgressBar from '@/components/Graph/LevelProgressBar';
import Icon from '@/components/Icon';
import Thumbnail from '@/components/Thumbnail/Thumbnail';
import { EVENT_LOG_CATEGORY, EVENT_LOG_NAME } from '@/constants/eventLog';
import { LEVEL_SYSTEM } from '@/constants/level';
import { ROUTER } from '@/constants/router';
import { gradientTextCss } from '@/constants/style/gradient';
import { eventLogger } from '@/utils';
import { calcProgress, getLevel } from '@/utils/result';
import { css, cx } from '@styled-system/css';
import { flex } from '@styled-system/patterns';

type FollowSummaryProps = FollowMemberType;

function FollowSummary({ memberId: followId, nickname: followNickname, profileImageUrl }: FollowSummaryProps) {
  const { data: stackData } = useGetMissionStack(followId.toString());
  const symbolStack = stackData?.symbolStack ?? 0;
  const currentLevel = getLevel(symbolStack);
  const progress = calcProgress(symbolStack);
  const handleClickFollowProfile = () => {
    eventLogger.logEvent(EVENT_LOG_CATEGORY.HOME, EVENT_LOG_NAME.HOME.CLICK_FOLLOW_PROFILE, {
      memberId: followId,
    });
  };
  return (
    <div>
      <div className={followSummaryTitleCss}>
        <Thumbnail size={'h18'} url={profileImageUrl} variant="filled" />
        <Link onClick={handleClickFollowProfile} href={ROUTER.PROFILE.DETAIL(followId)}>
          <p className={followSummaryTextCss}>
            {followNickname} <Icon name={'arrow-forward'} size={12} />
          </p>
        </Link>
      </div>
      <div className={followBannerCss}>
        <Banner type={'graphic'} imageUrl={currentLevel.imageUrl} />
        <div className={followLevelInfoCss}>
          <div className={levelWrapperCss}>
            <Icon name={'10mm-symbol-circle'} size={20} />
            <span className={cx(levelLabelCss, gradientTextCss)}>{symbolStack}</span>
          </div>
          <p className={LevelNameCss}>{currentLevel.label}</p>
          <div className={levelProgressBarWrapperCss}>
            <LevelProgressBar current={progress} isLabel={false} backgroundColor={'purple.purple500'} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FollowSummary;

const followLevelInfoCss = flex({
  flexDirection: 'column',
  justifyContent: 'center',
  width: '90px',
  flex: 0,
  minWidth: '90px',
  maxWidth: '90px',
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

const levelProgressBarWrapperCss = css({
  width: '70px',
});

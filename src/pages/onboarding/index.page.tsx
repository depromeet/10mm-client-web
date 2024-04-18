import { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { FOLLOW_API } from '@/apis/follow';
import Button from '@/components/Button/Button';
import CenterTextHeader from '@/components/Header/CenterTextHeader';
import { EVENT_LOG_CATEGORY, EVENT_LOG_NAME } from '@/constants/eventLog';
import { ROUTER } from '@/constants/router';
import { RECOMMENDATION, RECOMMENDATION_REAL } from '@/pages/onboarding/onboarding.constants';
import RecommendFollowItem from '@/pages/onboarding/RecommendFollowItem';
import { eventLogger } from '@/utils';
import { getEnv } from '@/utils/appEnv';
import { css } from '@styled-system/css';

function OnboardingPage() {
  const [followList, setFollowList] = useState<number[]>([]);
  const router = useRouter();
  const handleFollow = useCallback((id: number) => {
    eventLogger.logEvent(EVENT_LOG_CATEGORY.ONBOARDING, EVENT_LOG_NAME.ONBOARDING.SELECT_FOLLOW);
    setFollowList((prevState) => {
      if (prevState.includes(id)) {
        return prevState.filter((followId) => followId !== id);
      }

      return [...prevState, id];
    });
  }, []);

  const isSkip = followList.length === 0;

  const handleSkip = () => {
    eventLogger.logEvent(EVENT_LOG_CATEGORY.ONBOARDING, EVENT_LOG_NAME.ONBOARDING.CLICK_SKIP);
    router.replace(ROUTER.HOME);
  };

  const handleComplete = async () => {
    await Promise.all(
      followList.map((id) => {
        return FOLLOW_API.addFollow(id);
      }),
    );
    eventLogger.logEvent(EVENT_LOG_CATEGORY.ONBOARDING, EVENT_LOG_NAME.ONBOARDING.CLICK_CONFIRM, {
      followList: followList.join(','),
      followCount: followList.length,
    });
    router.replace(ROUTER.HOME);
  };

  const follows = getEnv() === 'real' ? RECOMMENDATION_REAL : RECOMMENDATION;

  return (
    <div>
      <CenterTextHeader
        title={'추천 친구'}
        rightComponent={
          isSkip ? (
            <Button variant={'ghost'} size={'medium'} onClick={handleSkip}>
              건너뛰기
            </Button>
          ) : (
            <Button variant={'ghost'} size={'medium'} onClick={handleComplete}>
              완료
            </Button>
          )
        }
      />
      <div className={textSectionCss}>
        <img className={assetImagCss} src={'/assets/character/flag.png'} alt={'10mm character flag'} />
        <p className={titleCss}>친구를 팔로우 해보세요!</p>
        <p className={subTitleCss}>팔로우를 통해 미션과 인증을 공유할 수 있어요.</p>
      </div>
      <ul className={followListCss}>
        {follows.map((props) => (
          <RecommendFollowItem
            key={props.id.toString()}
            {...props}
            isFollowing={followList.includes(props.id)}
            onChangeFollow={handleFollow}
          />
        ))}
      </ul>
    </div>
  );
}

export default OnboardingPage;

const followListCss = css({
  padding: '0 16px',
});

const assetImagCss = css({
  width: '112px',
  height: '84px',
});

const titleCss = css({
  textStyle: 'title3',
  color: 'text.primary',
  marginBottom: '4px',
});

const subTitleCss = css({
  textStyle: 'body4',
  color: 'gray.gray600',
});

const textSectionCss = css({
  paddingTop: '28px',
  paddingBottom: '56px',

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

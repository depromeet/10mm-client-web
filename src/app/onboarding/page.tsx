'use client';

import { RECOMMENDATION } from '@/app/onboarding/onboarding.constants';
import RecommendFollowItem from '@/app/onboarding/RecommendFollowItem';
import Button from '@/components/Button/Button';
import CenterTextHeader from '@/components/Header/CenterTextHeader';
import { css } from '@styled-system/css';

function OnboardingPage() {
  return (
    <div>
      <CenterTextHeader
        title={'추천 친구'}
        rightComponent={
          <Button variant={'ghost'} size={'medium'}>
            건너뛰기
          </Button>
        }
      />
      <div className={textSectionCss}>
        <img className={assetImagCss} src={'/assets/character/flag.png'} alt={'10mm character flag'} />
        <p className={titleCss}>친구를 팔로우 해보세요!</p>
        <p className={subTitleCss}>팔로우를 통해 미션과 인증을 공유할 수 있어요.</p>
      </div>
      <ul className={followListCss}>
        {RECOMMENDATION.map((props) => (
          <RecommendFollowItem
            key={props.id.toString()}
            {...props}
            isFollowing={false}
            onChangeFollow={() => {
              console.log('Followed');
            }}
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

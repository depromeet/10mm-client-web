import { Suspense, useState } from 'react';
import Link from 'next/link';
import { useSuspenseGetSearchNickname } from '@/apis/member';
import Header from '@/components/Header/Header';
import { FollowingMember, NotFollowingMember } from '@/components/ListItem/Follow/MemberItem';
import { stagger } from '@/components/Motion/Motion.constants';
import StaggerWrapper from '@/components/Motion/StaggerWrapper';
import SearchBar from '@/components/SearchBar/SearchBar';
import { ROUTER } from '@/constants/router';
import { css } from '@/styled-system/css';

function SearchPage() {
  const [input, setInput] = useState('');

  return (
    <>
      <Header rightAction="none" title="닉네임 검색" />
      <main className={mainCss}>
        <SearchBar placeholder="닉네임을 검색해 주세요." value={input} onChange={setInput} />
        <Suspense fallback={<div></div>}>
          <List nickname={input} key={input} />
        </Suspense>
      </main>
    </>
  );
}

export default SearchPage;

function List({ nickname }: { nickname: string }) {
  const { data, refetch, isFetching } = useSuspenseGetSearchNickname(nickname);

  const onButtonClick = () => {
    refetch();
  };

  return (
    <StaggerWrapper wrapperOverrideCss={listContainer} staggerVariants={stagger(0.02)}>
      {data.map((item) => (
        <Link key={item.memberId + item.followStatus} href={ROUTER.PROFILE.DETAIL(item.memberId)}>
          {item.followStatus === 'FOLLOWING' ? (
            <FollowingMember {...item} onButtonClick={onButtonClick} isLoading={isFetching} />
          ) : (
            <NotFollowingMember {...item} onButtonClick={onButtonClick} isLoading={isFetching} />
          )}
        </Link>
      ))}
    </StaggerWrapper>
  );
}

const listContainer = css({
  margin: '8px 0',
  flex: 1,
  minH: '0',
  overflow: 'auto',
});

const mainCss = css({
  padding: '8px 16px 16px',
  height: '100%',
  minHeight: 'calc(100vh - 44px)',
  maxHeight: 'calc(100vh - 44px)',
  display: 'flex',
  flexDirection: 'column',
});

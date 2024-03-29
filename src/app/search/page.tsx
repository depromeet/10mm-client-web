'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { useSuspenseGetSearchNickname } from '@/apis/member';
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
      <SearchBar placeholder="닉네임을 검색해 주세요." value={input} onChange={setInput} />
      <Suspense fallback={<div></div>}>
        <List nickname={input} key={input} />
      </Suspense>
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

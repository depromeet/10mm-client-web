'use client';

import { Suspense, useState } from 'react';
import { useSuspenseGetSearchNickname } from '@/apis/member';
import { FollowingListItem, FollowListItem, ProfileItemSkeleton } from '@/components/ListItem/ProfileListItem';
import SearchBar from '@/components/SearchBar/SearchBar';
import { css } from '@/styled-system/css';

function SearchPage() {
  const [input, setInput] = useState('');
  return (
    <div className={containerCss}>
      <SearchBar placeholder="닉네임을 검색해 주세요." value={input} onChange={setInput} />
      <Suspense
        fallback={
          <>
            <ProfileItemSkeleton />
            <ProfileItemSkeleton />
            <ProfileItemSkeleton />
            <ProfileItemSkeleton />
          </>
        }
      >
        <List nickname={input} />
      </Suspense>
    </div>
  );
}

const containerCss = css({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
});

export default SearchPage;

function List({ nickname }: { nickname: string }) {
  const { data } = useSuspenseGetSearchNickname(nickname);

  return (
    <ul className={listContainer}>
      {data.map((item) => (
        <FollowListItem name={item.nickname} key={item.memberId} />
      ))}
    </ul>
  );
}

const listContainer = css({
  margin: '8px 0',
  flex: 1,
  minH: '0',
  overflowY: 'auto',
});

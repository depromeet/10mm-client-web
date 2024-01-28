'use client';

import { Suspense, useState } from 'react';
import { useSuspenseGetSearchNickname } from '@/apis/member';
import FollowerItem from '@/components/ListItem/Follow/FollowerItem';
import FollowingItem from '@/components/ListItem/Follow/FollowingItem';
import { ProfileItemSkeleton } from '@/components/ListItem/ProfileListItem';
import SearchBar from '@/components/SearchBar/SearchBar';
import { css } from '@/styled-system/css';

function SearchPage() {
  const [input, setInput] = useState('');
  return (
    <>
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
    </>
  );
}

export default SearchPage;

function List({ nickname }: { nickname: string }) {
  const { data, refetch } = useSuspenseGetSearchNickname(nickname);

  const onButtonClick = () => {
    refetch();
  };

  return (
    <ul className={listContainer}>
      {data.map((item) => {
        const params = {
          name: item.nickname,
          memberId: item.memberId,
          onButtonClick,
        };
        return item.followStatus === 'FOLLOWING' ? (
          <FollowingItem key={item.memberId} {...params} />
        ) : (
          <FollowerItem key={item.memberId} followStatus={item.followStatus} {...params} />
        );
      })}
    </ul>
  );
}

const listContainer = css({
  margin: '8px 0',
  flex: 1,
  minH: '0',
  overflow: 'auto',
});

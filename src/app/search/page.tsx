'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { useSuspenseGetSearchNickname } from '@/apis/member';
import { FollowingMember, NotFollowingMember } from '@/components/ListItem/Follow/MemberItem';
import SearchBar from '@/components/SearchBar/SearchBar';
import { ROUTER } from '@/constants/router';
import { css } from '@/styled-system/css';

function SearchPage() {
  const [input, setInput] = useState('');
  return (
    <>
      <SearchBar placeholder="닉네임을 검색해 주세요." value={input} onChange={setInput} />
      <Suspense fallback={<div></div>}>
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
        return (
          <Link key={item.memberId} href={ROUTER.PROFILE.DETAIL(item.memberId)}>
            {item.followStatus === 'FOLLOWING' ? (
              <FollowingMember {...item} onButtonClick={onButtonClick} />
            ) : (
              <NotFollowingMember {...item} onButtonClick={onButtonClick} />
            )}
          </Link>
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

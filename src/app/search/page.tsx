'use client';

import { useState } from 'react';
import { FollowingListItem, FollowListItem } from '@/components/ListItem/ProfileListItem';
import SearchBar from '@/components/SearchBar/SearchBar';
import { css } from '@/styled-system/css';

function SearchPage() {
  const [input, setInput] = useState('');

  return (
    <div>
      <SearchBar placeholder="닉네임을 검색해 주세요." value={input} onChange={setInput} />

      <ul className={listContainer}>
        <FollowListItem name="2" />
        <FollowListItem name="2" />
        <FollowingListItem name="2" />
      </ul>
    </div>
  );
}

export default SearchPage;

const listContainer = css({
  padding: '8px 0',
});

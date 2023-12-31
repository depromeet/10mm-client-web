import React from 'react';
import NicknameInput from '@/app/mypage/profile_modify/NicknameInput';
import Header from '@/components/Header/Header';
import Thumbnail from '@/components/Thumbnail/Thumbnail';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

const PREVIOUS_NICKNAME = '수미칩';
function ProfileModifyPage() {
  return (
    <>
      <Header rightAction="text-button" title="프로필 수정" rightButtonDisabled />

      <main className={mainCss}>
        <section className={thumbnailWrapperCss}>
          <Thumbnail size="h52" />
        </section>
        <NicknameInput initValue={PREVIOUS_NICKNAME} />
      </main>
    </>
  );
}

export default ProfileModifyPage;

const mainCss = css({
  padding: '0 16px',
});

const thumbnailWrapperCss = css({
  margin: '24px auto',
  width: 'fit-content',
});

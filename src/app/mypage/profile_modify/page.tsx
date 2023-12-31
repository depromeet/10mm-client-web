'use client';

import { useState } from 'react';
import Header from '@/components/Header/Header';
import Icon from '@/components/Icon';
import Input from '@/components/Input/Input';
import Thumbnail from '@/components/Thumbnail/Thumbnail';
import { css } from '@/styled-system/css';

const PREVIOUS_NICKNAME = '수미칩';

function ProfileModifyPage() {
  const [nickname, setNickname] = useState(PREVIOUS_NICKNAME);

  return (
    <>
      <Header rightAction="text-button" title="프로필 수정" rightButtonDisabled={nickname.length === 0} />

      <main className={mainCss}>
        <section className={thumbnailWrapperCss}>
          <Thumbnail size="h80" />
          <div className={cameraIconWrapperCss}>
            <Icon name="camera" width={14} height={14} />
          </div>
        </section>
        <Input value={nickname} onChange={setNickname} name="닉네임" maxLength={20} />;
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
  position: 'relative',
});

const cameraIconWrapperCss = css({
  width: '24px',
  height: '24px',
  borderRadius: '24px',
  backgroundColor: 'gray.gray400',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  position: 'absolute',
  bottom: '-2px',
  right: '-4px',
});

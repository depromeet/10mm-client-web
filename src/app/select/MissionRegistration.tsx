'use client';

import { useState } from 'react';
import Link from 'next/link';
import CategoryBottomSheet from '@/app/select/CategoryBottomSheet';
import PublicBottomSheet from '@/app/select/PublicBottomSheet';
import Button from '@/components/Button/Button';
import Icon from '@/components/Icon';
import Input from '@/components/Input/Input';
import { css } from '@/styled-system/css';

export default function MissionRegistration() {
  const [missionTitleInput, setMissionTitleInput] = useState('');
  const [missionContentInput, setMissionContentInput] = useState('');

  const [isCategoryShowing, toggleCategoryShowing] = useToggle();
  const [missionCategory, setMissionCategory] = useState<string | null>(null);

  const [isPublicShowing, togglePublicShowing] = useToggle();
  const [missionPublicSetting, setMissionPublicSetting] = useState<string | null>(null);

  // 미션 명
  const handleMissionTitleInput = (value: string) => {
    setMissionTitleInput(value);
  };
  const onTitleCloseIconClick = () => {
    setMissionTitleInput('');
  };

  // 미션 내용
  const handleMissionContentInput = (value: string) => {
    setMissionContentInput(value);
  };
  const onContentCloseIconClick = () => {
    setMissionContentInput('');
  };

  return (
    <section>
      <Input
        type="text"
        placeholder="미션명을 입력하세요"
        name="미션명"
        required
        iconName="close-circle"
        iconColor="icon.secondary"
        maxLength={20}
        value={missionTitleInput}
        onIconClick={onTitleCloseIconClick}
        onChange={handleMissionTitleInput}
      />
      <Input
        type="text"
        placeholder="미션 내용을 입력"
        name="미션내용"
        iconName="close-circle"
        iconColor="icon.secondary"
        maxLength={30}
        value={missionContentInput}
        onIconClick={onContentCloseIconClick}
        onChange={handleMissionContentInput}
      />
      <section>
        <h3 className={publicSettingTitleCss}>
          카테고리 <span className={asterisk}>*</span>
        </h3>
        <button
          type="button"
          className={css({
            color: 'white',
          })}
          onClick={toggleCategoryShowing}
        >
          {missionCategory ?? '선택'}
        </button>
        <CategoryBottomSheet
          select={missionCategory}
          isShowing={isCategoryShowing}
          onClickOutside={toggleCategoryShowing}
          onSelect={setMissionCategory}
        />
      </section>
      <section>
        <h3 className={publicSettingTitleCss}>
          공개 설정 <span className={asterisk}>*</span>
        </h3>
        <button
          type="button"
          className={css({
            color: 'white',
          })}
          onClick={togglePublicShowing}
        >
          {missionPublicSetting ?? '선택'}
        </button>
        <PublicBottomSheet
          select={missionPublicSetting}
          onSelect={setMissionPublicSetting}
          isShowing={isPublicShowing}
          onClickOutside={togglePublicShowing}
        />
      </section>

      {/* 카테고리 */}
      <span className={categoryTitleCss}>카테고리</span>
      <span className={asterisk}>*</span>

      <div className={categoryWrapperCss}>
        <p className={categoryTextCss}>카테고리를 선택해주세요.</p>
        <Icon name={'arrow-down'} color={'icon.secondary'} className={iconCss} />
      </div>

      {/* 공개설정 */}
      <span className={publicSettingTitleCss}>공개설정</span>

      <div className={publicSettingWrapperCss}>
        <p className={publicSettingTextCss}>팔로워에게 공개</p>
        <Icon name={'arrow-down'} color={'icon.secondary'} className={iconCss} />
      </div>

      <div className={buttonContainerCss}>
        <Link href={'/stopwatch'}>
          <Button variant={'cta'} size={'medium'}>
            등록
          </Button>
        </Link>
      </div>
    </section>
  );
}

const buttonContainerCss = css({
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: '48px',
});

const publicSettingWrapperCss = css({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  borderBottomWidth: '1px',
  borderColor: 'border.default',
});
const publicSettingTitleCss = css({
  marginTop: '36px',
  textStyle: 'body2',
  color: 'text.primary',
});

const publicSettingTextCss = css({
  width: '100%',
  textStyle: 'body3',
  color: 'text.secondary',
  marginBottom: '14px',
  borderColor: 'border.default',
  marginTop: '12px',
});

const categoryWrapperCss = css({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  borderBottomWidth: '1px',
  borderColor: 'border.default',
  marginBottom: '36px',
});
const categoryTitleCss = css({
  marginTop: '36px',
  textStyle: 'body2',
  color: 'text.primary',
});

const categoryTextCss = css({
  width: '100%',
  textStyle: 'body3',
  color: 'text.secondary',
  marginBottom: '14px',
  borderColor: 'border.default',
  marginTop: '12px',
});
const asterisk = css({
  color: 'red.red500',
  fontWeight: 'bold',
});

const iconCss = css({
  marginTop: '8px',
  cursor: 'pointer',
});

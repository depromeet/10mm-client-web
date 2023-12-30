'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button/Button';
import DropdownInput from '@/components/Input/DropdownInput';
import Input from '@/components/Input/Input';
import { type DropdownValueType } from '@/components/Input/Input.types';
import { MISSION_CATEGORY_LIST, PUBLIC_SETTING_LIST } from '@/constants/mission';
import { ROUTER } from '@/constants/router';
import { css } from '@/styled-system/css';
import { withQueryString } from '@/utils';

export default function MissionRegistration() {
  const router = useRouter();

  const [missionTitleInput, setMissionTitleInput] = useState('');
  const [missionContentInput, setMissionContentInput] = useState('');
  const [missionCategory, setMissionCategory] = useState<DropdownValueType | null>(null);
  const [missionPublicSetting, setMissionPublicSetting] = useState<DropdownValueType>(PUBLIC_SETTING_LIST[0]);

  const isSubmitButtonDisabled = !missionTitleInput || !missionCategory;

  // 미션 명
  const handleMissionTitleInput = (value: string) => {
    setMissionTitleInput(value);
  };
  // const onTitleCloseIconClick = () => {
  //   setMissionTitleInput('');
  // };

  // 미션 내용
  const handleMissionContentInput = (value: string) => {
    setMissionContentInput(value);
  };
  // const onContentCloseIconClick = () => {
  //   setMissionContentInput('');
  // };

  const handleSubmit = () => {
    if (!missionCategory) return;
    router.push(withQueryString(ROUTER.MISSION.STOP_WATCH('dummy'), { category: missionCategory.value }));
  };

  return (
    <section>
      <Input
        type="text"
        placeholder="미션명을 입력하세요"
        name="미션명"
        required
        maxLength={20}
        value={missionTitleInput}
        onChange={handleMissionTitleInput}
        description="디스크립션 영역입니다"
      />
      <Input
        type="text"
        placeholder="미션 내용을 입력"
        name="미션내용"
        maxLength={30}
        value={missionContentInput}
        onChange={handleMissionContentInput}
        description="디스크립션 영역입니다"
      />

      {/* 카테고리 */}
      <DropdownInput
        variant="drop-down"
        title="카테고리"
        required
        list={MISSION_CATEGORY_LIST}
        placeholder="카테고리를 선택해주세요."
        selected={missionCategory}
        onSelect={(item) => setMissionCategory(item)}
      />

      {/* 공개설정 */}
      <DropdownInput
        variant="drop-down"
        title="공개설정"
        list={PUBLIC_SETTING_LIST}
        selected={missionPublicSetting}
        onSelect={(item) => setMissionPublicSetting(item)}
      />

      <div className={buttonContainerCss}>
        <Button variant={'cta'} size={'medium'} onClick={handleSubmit} disabled={isSubmitButtonDisabled}>
          등록
        </Button>
      </div>
    </section>
  );
}

const buttonContainerCss = css({
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: '48px',
});

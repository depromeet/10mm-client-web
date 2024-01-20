'use client';

import { useState } from 'react';
import { type MissionCategory, type MissionVisibility } from '@/apis/schema/mission';
import useCreateMissionMutation from '@/app/mission/new/useCreateMissionMutation';
import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import { type DropdownValueType } from '@/components/Input/Input.types';
import { useSnackBar } from '@/components/SnackBar/SnackBarProvider';
import { MISSION_CATEGORY_LIST, PUBLIC_SETTING_LIST } from '@/constants/mission';
import { css } from '@/styled-system/css';

export default function MissionRegistration() {
  const { triggerSnackBar } = useSnackBar();

  const [missionTitleInput, setMissionTitleInput] = useState('');
  const [missionContentInput, setMissionContentInput] = useState('');
  const [missionCategory, setMissionCategory] = useState<DropdownValueType<MissionCategory> | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [missionPublicSetting, setMissionPublicSetting] = useState<DropdownValueType<MissionVisibility>>(
    PUBLIC_SETTING_LIST[1],
  );

  const isSubmitButtonDisabled = !missionTitleInput || !missionCategory || !missionContentInput;

  const { mutate } = useCreateMissionMutation();
  // 미션 명
  const handleMissionTitleInput = (value: string) => {
    setMissionTitleInput(value);
  };
  // 미션 내용
  const handleMissionContentInput = (value: string) => {
    setMissionContentInput(value);
  };

  const handleSubmit = () => {
    if (!missionCategory) {
      triggerSnackBar({
        message: '미션 제목을 입력해주세요. ',
      });
      return;
    }
    if (!missionContentInput) {
      triggerSnackBar({
        message: '미션 내용을 입력해주세요. ',
      });
      return;
    }

    mutate({
      name: missionTitleInput,
      content: missionContentInput,
      category: missionCategory.value,
      visibility: missionPublicSetting.value,
    });
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
      />
      <Input
        type="text"
        placeholder="미션 내용을 입력"
        required
        name="미션내용"
        maxLength={30}
        value={missionContentInput}
        onChange={handleMissionContentInput}
      />

      {/* 카테고리 */}
      <Input
        variant="drop-down"
        title="카테고리"
        required
        list={MISSION_CATEGORY_LIST}
        placeholder="카테고리를 선택해주세요."
        selected={missionCategory}
        onSelect={(item) => setMissionCategory(item)}
      />

      {/* 공개설정 */}
      <Input
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

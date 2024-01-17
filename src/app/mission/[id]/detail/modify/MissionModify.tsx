'use client';

import { useState } from 'react';
import Input from '@/components/Input/Input';
import { type DropdownValueType } from '@/components/Input/Input.types';
import { PUBLIC_SETTING_LIST } from '@/constants/mission';

export default function MissionModify() {
  const [missionTitleInput, setMissionTitleInput] = useState('');
  const [missionContentInput, setMissionContentInput] = useState('');

  const [missionPublicSetting, setMissionPublicSetting] = useState<DropdownValueType>(PUBLIC_SETTING_LIST[0]);

  const handleMissionTitleInput = (value: string) => {
    setMissionTitleInput(value);
  };

  const handleMissionContentInput = (value: string) => {
    setMissionContentInput(value);
  };

  // TODO: 미션 단건조회 GET, 미션 단건 수정PUT추가
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
        name="미션내용"
        maxLength={30}
        value={missionContentInput}
        onChange={handleMissionContentInput}
      />

      <Input
        variant="drop-down"
        title="공개설정"
        list={PUBLIC_SETTING_LIST}
        selected={missionPublicSetting}
        onSelect={(item) => setMissionPublicSetting(item)}
      />
    </section>
  );
}

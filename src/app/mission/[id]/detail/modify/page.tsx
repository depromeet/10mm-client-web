'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import MISSION_APIS, { useGetMissionDetail, useModifyMissionMutation } from '@/apis/mission';
import { type MissionVisibility } from '@/apis/schema/mission';
import Header from '@/components/Header/Header';
import Input from '@/components/Input/Input';
import { type DropdownValueType } from '@/components/Input/Input.types';
import { useSnackBar } from '@/components/SnackBar/SnackBarProvider';
import { PUBLIC_SETTING_LABEL, PUBLIC_SETTING_LIST } from '@/constants/mission';
import { ROUTER } from '@/constants/router';
import { css } from '@styled-system/css';

export default function MissionModifyPage({ params }: { params: { id: string } }) {
  const { triggerSnackBar } = useSnackBar();
  const router = useRouter();

  const { mutate } = useModifyMissionMutation(params.id, {
    onSuccess: () => {
      router.replace(ROUTER.MISSION.DETAIL(params.id));
    },
    onError: () => {
      triggerSnackBar({ message: '저장에 실패했습니다. 다시 시도해주세요.' });
    },
  });

  const { data } = useGetMissionDetail(params.id);

  const PREVIOUS_MISSIONTITLE = data.name;
  const PREVIOUS_MISSIONCONTENT = data.content;
  const PREVIOUS_PUBLIC_SETTING = PUBLIC_SETTING_LABEL[data.visibility];

  const [missionTitleInput, setMissionTitleInput] = useState(PREVIOUS_MISSIONTITLE);
  const [missionContentInput, setMissionContentInput] = useState(PREVIOUS_MISSIONCONTENT);
  const [missionPublicSetting, setMissionPublicSetting] =
    useState<DropdownValueType<MissionVisibility>>(PREVIOUS_PUBLIC_SETTING);

  const handleMissionTitleInput = (value: string) => {
    setMissionTitleInput(value);
  };

  const handleMissionContentInput = (value: string) => {
    setMissionContentInput(value);
  };
  const isButtonDisabled =
    (missionTitleInput === PREVIOUS_MISSIONTITLE || missionTitleInput.length === 0) &&
    missionContentInput === PREVIOUS_MISSIONCONTENT &&
    missionPublicSetting === PREVIOUS_PUBLIC_SETTING;

  const modifyTest = () => {
    mutate({
      missionId: 1,
      name: missionTitleInput,
      content: missionContentInput,
      visibility: missionPublicSetting.value,
    });
    router.replace('/mission/id/detail');
  };

  return (
    <main className={mainWrapperCss}>
      <Header
        rightAction="text-button"
        title={'미션 수정'}
        rightButtonProps={{ disabled: isButtonDisabled, onClick: modifyTest }}
      />
      <div className={containerCss}>
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
      </div>
    </main>
  );
}

const mainWrapperCss = css({
  height: '100vh',
  width: '100%',
  overflowY: 'hidden',
});

const containerCss = css({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,

  padding: '24px 16px',
});

import { useState } from 'react';
import { useRouter } from 'next/router';
import APIS from '@/apis';
import { isSeverError } from '@/apis/instance.api';
import { type MissionCategory, MissionPeriod, type MissionVisibility } from '@/apis/schema/mission';
import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import { type DropdownValueType } from '@/components/Input/Input.types';
import { useSnackBar } from '@/components/SnackBar/SnackBarProvider';
import { MISSION_CATEGORY_LIST, PUBLIC_SETTING_LIST } from '@/constants/mission';
import { ROUTER } from '@/constants/router';
import { useMutation } from '@tanstack/react-query';

import MissionPeriodSelect from './MissionPeriod';

export default function MissionRegistration() {
  const { triggerSnackBar } = useSnackBar();

  const [missionTitleInput, setMissionTitleInput] = useState('');
  const [missionContentInput, setMissionContentInput] = useState('');
  const [missionCategory, setMissionCategory] = useState<DropdownValueType<MissionCategory> | null>(null);
  const [missionPublicSetting, setMissionPublicSetting] = useState<DropdownValueType<MissionVisibility>>(
    PUBLIC_SETTING_LIST[1],
  );

  const [missionPeriod, setMissionPeriod] = useState<MissionPeriod>(MissionPeriod.TWO_WEEKS);

  const isSubmitButtonDisabled = !missionTitleInput || !missionCategory;

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
        message: '미션 제목을 입력해주세요.',
      });
      return;
    }

    mutate({
      name: missionTitleInput,
      content: missionContentInput,
      category: missionCategory.value,
      visibility: missionPublicSetting.value,
      missionDuration: missionPeriod,
    });
  };

  return (
    <section>
      <Input
        type="text"
        placeholder="미션명 입력"
        name="미션명"
        required
        maxLength={20}
        value={missionTitleInput}
        onChange={handleMissionTitleInput}
      />
      <Input
        type="text"
        placeholder="미션 내용 입력"
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
        placeholder="카테고리 선택"
        selected={missionCategory}
        onSelect={(item) => setMissionCategory(item)}
      />

      <MissionPeriodSelect missionPeriod={missionPeriod} setMissionPeriod={setMissionPeriod} />

      {/* 공개설정 */}
      <Input
        variant="drop-down"
        title="공개설정"
        list={PUBLIC_SETTING_LIST}
        selected={missionPublicSetting}
        onSelect={(item) => setMissionPublicSetting(item)}
      />

      <Button variant={'cta'} size={'medium'} onClick={handleSubmit} disabled={isSubmitButtonDisabled}>
        등록
      </Button>
    </section>
  );
}

const useCreateMissionMutation = () => {
  const router = useRouter();
  const { triggerSnackBar } = useSnackBar();

  // TODO : api 호출 위치 이동
  return useMutation({
    mutationFn: APIS.createMission,
    onSuccess: () => {
      router.replace(ROUTER.HOME);
    },
    onError: (error) => {
      console.error('error: ', error);
      if (isSeverError(error)) {
        triggerSnackBar({
          message: error.response.data.data.message,
        });
        return;
      }
    },
  });
};

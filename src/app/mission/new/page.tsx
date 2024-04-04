'use client';

import { useState } from 'react';
import { type MissionCategory, type MissionVisibility } from '@/apis/schema/mission';
import useCreateMissionMutation from '@/app/mission/new/useCreateMissionMutation';
import Header from '@/components/Header/Header';
import Input from '@/components/Input/Input';
import { type DropdownValueType } from '@/components/Input/Input.types';
import { useSnackBar } from '@/components/SnackBar/SnackBarProvider';
import { MISSION_CATEGORY_LIST, PUBLIC_SETTING_LIST } from '@/constants/mission';
import { flex } from '@/styled-system/patterns';
import { css } from '@styled-system/css';

export default function MissionNewPage() {
  const { triggerSnackBar } = useSnackBar();

  const [missionTitleInput, setMissionTitleInput] = useState('');
  const [missionContentInput, setMissionContentInput] = useState('');
  const [missionCategory, setMissionCategory] = useState<DropdownValueType<MissionCategory> | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [missionPublicSetting, setMissionPublicSetting] = useState<DropdownValueType<MissionVisibility>>(
    PUBLIC_SETTING_LIST[1],
  );

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
    });
  };
  return (
    <main className={mainWrapperCss}>
      <Header
        title={'미션 생성'}
        rightAction="text-button"
        rightButtonText="등록"
        rightButtonProps={{ disabled: isSubmitButtonDisabled, onClick: handleSubmit }}
      />
      <div className={containerCss}>
        <h1 className={mainTitleCss}>
          하루 <strong>10분씩</strong> 2주 동안
          <br />
          어떤 일에 투자하고 싶은가요?
        </h1>
        <section className={sectionCss}>
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
          {/* TODO: 이후에 삭제 - 미션 기간, 알림 설정 Input 생기며 리스트 여백 수정 */}
          <hr
            className={css({
              height: '12px',
              opacity: 0,
            })}
          />

          {/* 공개설정 */}
          <Input
            variant="drop-down"
            title="공개설정"
            list={PUBLIC_SETTING_LIST}
            selected={missionPublicSetting}
            onSelect={(item) => setMissionPublicSetting(item)}
          />
        </section>
      </div>
    </main>
  );
}

const mainWrapperCss = css({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',

  width: '100%',
});

const containerCss = css({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,

  padding: '24px 16px',
});

const mainTitleCss = css({
  marginTop: '2px',
  marginBottom: '36px',

  textStyle: 'title2',

  color: 'text.primary',
  '& strong': {
    color: 'purple.purple800',
    textStyle: 'title2',
  },
});

const sectionCss = flex({
  flexDirection: 'column',
  gap: '12px',
});

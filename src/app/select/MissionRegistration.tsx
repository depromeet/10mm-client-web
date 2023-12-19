'use client';

import Link from 'next/link';
import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import Toggle from '@/components/Toggle/Toggle';
import { css } from '@/styled-system/css';

export default function MissionRegistration() {
  return (
    <section>
      <div>
        <Input
          type="text"
          placeholder="미션명을 입력하세요"
          name="미션명"
          required
          iconName="close-circle"
          iconColor="icon.secondary"
          maxLength={20}
        />
        <Input
          type="text"
          placeholder="미션 내용을 입력"
          name="미션내용"
          iconName="close-circle"
          iconColor="icon.secondary"
          maxLength={30}
        />
        <Input
          type=""
          placeholder="카테고리"
          name="카테고리 선택"
          required
          iconName="arrow-down"
          iconColor="icon.secondary"
        />
        <p className={publicSettingTitleCss}>공개 설정</p>
        <p className={publicSettingTextCss}>내 미션 현황과 인증 사진을 공유해 보세요.</p>

        <div className={publicSettingCss}>
          <span className={subTitlCss}>친구에게 미션 공개하기</span>
          <Toggle initialValue={true} />
        </div>

        <div className={buttonContainerCss}>
          <Link href={'/timer'}>
            <Button variant={'cta'} size={'medium'}>
              등록
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
const buttonContainerCss = css({
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: '48px',
});

const publicSettingCss = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '343px',
  height: '60px',
  borderRadius: '16px',
  padding: '16px',
  gap: '12px',
  backgroundColor: 'bg.surface3',
  margin: '0 auto',
});
const publicSettingTitleCss = css({
  marginTop: '36px',
  textStyle: 'body2',
  color: 'text.primary',
});

const publicSettingTextCss = css({
  textStyle: 'body3',
  color: 'text.secondary',
  marginBottom: '18px',
});
const subTitlCss = css({
  textStyle: 'subtitle3',
  color: 'text.primary',
});

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import RadioInputWithImg from '@/app/select/RadioInputWithImg';
import { MISSION_CATEGORIES } from '@/app/select/select.constants';
import Button from '@/components/Button';
import { ROUTER } from '@/constants/router';
import { withQueryString } from '@/utils';
import { getObjectValues } from '@/utils/object';
import { css } from '@styled-system/css';
import { flex } from '@styled-system/patterns';

export default function SelectMissionForm() {
  const { push } = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleClick = () => {
    if (selectedCategory === null) {
      alert('카테고리를 선택해주세요');
      return;
    }

    push(withQueryString(ROUTER.TIMER, { category: selectedCategory }));
  };

  const handleRadioChange = (value: string) => {
    setSelectedCategory(value);
  };

  return (
    <section className={sectionCss}>
      <div className={listCss}>
        {getObjectValues(MISSION_CATEGORIES).map((category) => (
          <RadioInputWithImg
            key={category.id}
            onChange={handleRadioChange}
            imgSrc={category.imgSrc}
            label={category.label}
            name={'category'}
            value={category.id}
          />
        ))}
      </div>
      <Button disabled={!selectedCategory} onClick={handleClick} className={nextButtonCss}>
        다음
      </Button>
    </section>
  );
}

const nextButtonCss = css({
  padding: '16px 24px',
  textStyle: 'subtitle2',
  color: '#FFFFFF',
  width: 'fit',
  borderRadius: '30px',
  background: '#929DFF',
  transition: '0.3s ease',
  cursor: 'pointer',
  _disabled: {
    background: '#E5E5E5',
  },
});

const sectionCss = flex({
  marginTop: '30px',
  width: '100%',
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'end',
});

const listCss = flex({
  width: '100%',
  flexDirection: 'column',
  gap: '6px',
});

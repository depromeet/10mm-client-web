'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import RadioInputWithImg from '@/app/mission/new/RadioInputWithImg';
import { MISSION_CATEGORIES } from '@/app/mission/new/select.constants';
import Button from '@/components/Button/Button';
import { ROUTER } from '@/constants/router';
import { logEvent, withQueryString } from '@/utils';
import { getObjectValues } from '@/utils/object';
import { flex } from '@styled-system/patterns';

export default function SelectMissionForm() {
  const { push } = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleClick = () => {
    logEvent('click/nextButton', 'select_category', { category: selectedCategory ?? '' });
    if (selectedCategory === null) {
      alert('카테고리를 선택해주세요');
      return;
    }

    push(withQueryString(ROUTER.STOPWATCH, { category: selectedCategory }));
  };

  const handleRadioChange = (value: string) => {
    logEvent('click/selectCategory', 'select_category', { value });
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
      <Button variant={'cta'} size={'medium'} disabled={!selectedCategory} onClick={handleClick}>
        다음
      </Button>
    </section>
  );
}

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

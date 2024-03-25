import { useState } from 'react';
import { useRouter } from 'next/router';
import Button from '@/components/Button/Button';
import Header from '@/components/Header/Header';
import Layout from '@/components/Layout';
import { EVENT_LOG_CATEGORY, EVENT_LOG_NAME } from '@/constants/eventLog';
import { ROUTER } from '@/constants/router';
import { eventLogger, withQueryString } from '@/utils';
import { getObjectValues } from '@/utils/object';
import { css } from '@styled-system/css';
import { flex } from '@styled-system/patterns';

import RadioInputWithImg from './RadioInputWithImg';
import { MISSION_CATEGORIES } from './select.constants';

export default function GuestMissionNewPage() {
  const { push } = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleClick = () => {
    eventLogger.logEvent(EVENT_LOG_NAME.SELECT_CATEGORY.CLICK_NEXT_BUTTON, EVENT_LOG_CATEGORY.SELECT_CATEGORY, {
      category: selectedCategory ?? '',
      isGuest: true,
    });
    if (selectedCategory === null) {
      alert('카테고리를 선택해주세요');
      return;
    }

    push(withQueryString(ROUTER.GUEST.MISSION.STOP_WATCH, { category: selectedCategory }));
  };

  const handleRadioChange = (value: string) => {
    eventLogger.logEvent(EVENT_LOG_NAME.SELECT_CATEGORY.CLICK_SELECT_CATEGORY, EVENT_LOG_CATEGORY.SELECT_CATEGORY, {
      value,
      isGuest: true,
    });
    setSelectedCategory(value);
  };

  return (
    <Layout>
      <main className={mainWrapperCss}>
        <Header rightAction="none" />

        <div className={containerCss}>
          <p className={mainTitleCss}>
            하루 <strong>10분</strong>씩 2주 동안
            <br />
            어떤 일에 투자하고 싶은가요?
          </p>
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
        </div>
      </main>
    </Layout>
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
  textStyle: 'title2',
  color: 'text.primary',
  '& strong': {
    color: 'purple.purple800',
    textStyle: 'title2',
  },
});

const sectionCss = flex({
  marginTop: '28px',
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

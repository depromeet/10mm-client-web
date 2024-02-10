import { useState } from 'react';
import { css } from '@/styled-system/css';
import dayjs from 'dayjs';

import MissionCalendar from './Calendar';
import MissionList from './MissionList';

function MissionSection() {
  const [selectDate, setSelectDate] = useState(dayjs());

  const formatSelectDate = selectDate.format('YYYY-MM-DD');
  return (
    <div className={calendarWrapperCss}>
      <section>
        <MissionCalendar selectDate={selectDate} setSelectDate={setSelectDate} />
      </section>
      <MissionList key={formatSelectDate} selectDate={formatSelectDate} />
      <div className={blankCss} />
    </div>
  );
}

export default MissionSection;

const calendarWrapperCss = css({
  margin: '6px 12px 10px',
});

const blankCss = css({
  height: '156px',
});

import { useState } from 'react';
import { css } from '@/styled-system/css';
import dayjs from 'dayjs';

import MissionCalendar from './Calendar';
import MissionList from './MissionList';

function MissionSection() {
  const [selectDate, setSelectDate] = useState(dayjs());

  return (
    <div className={calendarWrapperCss}>
      <section>
        <MissionCalendar selectDate={selectDate} setSelectDate={setSelectDate} />
      </section>
      <MissionList selectDate={selectDate.format('YYYY-MM-DD')} />
    </div>
  );
}

export default MissionSection;

const calendarWrapperCss = css({
  padding: '6px 12px 10px',
});

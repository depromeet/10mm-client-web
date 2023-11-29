import React from 'react';
import { css } from '@/styled-system/css';
import { center } from '@/styled-system/patterns';

interface Props {
  isActive: boolean;
  time: [number, number];
  category: string;
}
export default function TimerView({ category, time, isActive }: Props) {
  return (
    <div className={center()}>
      <div className={center(innerCss)}>
        <div className={css(categoryCss)}>{category}</div>
        <div
          className={css(timerTextCss, {
            color: isActive ? '#ffbaba' : 'gray',
          })}
        >
          <span>{time[0]}</span>
          <span>:</span>
          <span>{time[1]}</span>
        </div>
      </div>
    </div>
  );
}

const innerCss = {
  width: '312px',
  height: '312px',
  background: 'white',
  boxShadow: '0px 10px 30px 5px rgba(18.51, 14.90, 195.38, 0.07)',
  borderRadius: 9999,
  flexDirection: 'column',
};

const categoryCss = { color: '#4E5968', fontSize: '18px', fontWeight: '600', lineHeight: '150%' };

const timerTextCss = { color: '#FF8C8C', fontSize: '70px', fontWeight: '700' };

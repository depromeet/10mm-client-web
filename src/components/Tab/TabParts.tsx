'use client';
import React, { useEffect, useState } from 'react';
import { css } from '@/styled-system/css';

interface TabPartsProps {
  tabName: string;
  status: boolean;
  onTabClick: (clickedTabName: string) => void;
}

export default function TabParts({ tabName, status, onTabClick }: TabPartsProps) {
  const [isActive, setIsActive] = useState(status);
  useEffect(() => {
    //클릭된 탭은 항상 true
    setIsActive(status);
  }, [status]);

  const handleClick = () => {
    setIsActive(!isActive);
    onTabClick(tabName);
  };
  //isActive 값을 사용하기 위해 js 코드 안에서 사용
  const tabNameCss = css({
    width: '100%',
    paddingBottom: '8px',
    textStyle: 'body2',
    borderBottomWidth: '1px',
    marginRight: '16px',
    color: isActive ? 'purple.purple700' : 'gray.gray500',
    borderColor: isActive ? 'purple.purple700' : 'gray.gray500',
    cursor: 'pointer',
  });

  return (
    <span className={tabNameCss} onClick={handleClick}>
      {tabName}
    </span>
  );
}

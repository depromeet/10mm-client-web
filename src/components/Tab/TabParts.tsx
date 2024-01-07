'use client';
import { css } from '@/styled-system/css';

interface TabPartsProps {
  tabName: string;
  isActive: boolean;
  onTabClick: (clickedTabName: string) => void;
}

export default function TabParts({ tabName, isActive, onTabClick }: TabPartsProps) {
  const handleClick = () => {
    onTabClick(tabName);
  };
  //isActive 값을 사용하기 위해 js 코드 안에서 css사용
  const tabNameCss = css({
    width: '100%',
    paddingBottom: '8px',
    textStyle: 'body3',
    borderBottomWidth: '1px',
    margin: '0 8px',
    color: isActive ? 'purple.purple700' : 'gray.gray500',
    borderColor: isActive ? 'purple.purple700' : 'bg.surface2',
    cursor: 'pointer',
  });

  return (
    <span className={tabNameCss} onClick={handleClick}>
      {tabName}
    </span>
  );
}

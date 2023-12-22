import React, { type FC, useState } from 'react';
import { css } from '@/styled-system/css';

interface ToggleProps {
  initialValue?: boolean;
}

const Toggle: FC<ToggleProps> = ({ initialValue = false }) => {
  const [isToggled, setIsToggled] = useState(initialValue);

  const handleToggle = () => {
    setIsToggled((prev) => !prev);
  };

  return (
    <label>
      <input type="checkbox" checked={isToggled} onChange={handleToggle} className={toggleInputCss} />
      {/*
         {isToggled ? '켜기' : '끄기'} 
         */}
    </label>
  );
};

const toggleInputCss = css({
  appearance: 'none',
  position: 'relative',
  border: '0px solid gray',
  width: '44px',
  height: '28px',
  marginTop: '6px',
  borderRadius: '86.27px',
  backgroundColor: 'gray.500',
  _before: {
    content: '" "',
    position: 'absolute',
    left: '3px',
    top: '3px',
    width: '22px',
    height: '22px',
    borderRadius: '81.48px',
    transform: 'scale(1)',
    backgroundColor: 'white',
    transition: 'left 75ms linear',
  },
  _checked: {
    backgroundColor: 'purple.purple600 ',
    _before: {
      backgroundColor: 'white',
      left: '19px',
    },
  },
});

export default Toggle;

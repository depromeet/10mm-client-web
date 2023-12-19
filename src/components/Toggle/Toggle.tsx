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
    <div>
      <label>
        <input type="checkbox" checked={isToggled} onChange={handleToggle} className={toggleInputCss} />
        {/*
         {isToggled ? '켜기' : '끄기'} 
         */}
      </label>
    </div>
  );
};

const toggleInputCss = css({
  appearance: 'none',
  position: 'relative',
  border: '0px solid gray',
  borderRadius: '1.25rem',
  width: '2.25rem',
  height: '1.25rem',
  backgroundColor: 'gray.500',
  _before: {
    content: '" "',
    position: 'absolute',
    left: '0',
    width: '1.25em',
    height: '1.25em',
    borderRadius: '50%',
    transform: 'scale(0.8)',
    backgroundColor: 'white',
    transition: 'left 75ms linear',
  },
  _checked: {
    backgroundColor: 'purple.purple500 ',
    _before: {
      backgroundColor: 'white',
      left: '1em',
    },
  },
});

export default Toggle;

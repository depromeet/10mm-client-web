import React, { type SVGProps } from 'react';

function LeftArrowIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M13.7139 17.4273L6.43555 10.149L13.7139 2.87012"
        stroke={props.color ?? '#B0B8C1'}
        strokeWidth="1.66667"
      />
    </svg>
  );
}

export default LeftArrowIcon;

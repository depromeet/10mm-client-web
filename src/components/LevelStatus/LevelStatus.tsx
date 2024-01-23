'use client';

import LevelProgressBar from '@/components/LevelStatus/LevelProgressBar';
import { type LevelSystemType } from '@/constants/level';
import { gradientTextCss } from '@/constants/style/text';
import { css, cx } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

interface Props {
  current: number;
  level: LevelSystemType;
}

function LevelStatus({ level, ...props }: Props) {
  return (
    <section className={containerCss}>
      <div className={levelWrapperCss}>
        <div className={symbolContainerCss}>
          <TenMMSymbol />
        </div>
        {/* <Image src="/assets/icons/10mm-symbol-fill.svg" alt="10mm symbol fill" width={16} height={16} /> */}
        <span className={cx(levelLabelCss, gradientTextCss)}>{props.current}</span>
      </div>
      <p className={levelTextWrapperCss}>{level.label}</p>
      <LevelProgressBar current={props.current} isLabel={!level.isFinal} {...level} />
    </section>
  );
}

export default LevelStatus;

const containerCss = flex({
  width: '214px',
  margin: '0 auto',
  flexDirection: 'column',
  gap: '10px',
  alignItems: 'center',
});

const levelWrapperCss = flex({
  gap: '8px',
  alignItems: 'center',
  justifyContent: 'center',
});

const levelLabelCss = css({
  fontSize: '36px',
  fontWeight: '100',
});

const symbolContainerCss = css({
  width: '16px',
  height: '16px',
  position: 'relative',

  '& svg': {
    position: 'absolute',
    top: '-8.5px',
    left: '-12.5px',
  },
});

function TenMMSymbol() {
  return (
    <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d_3405_70138)">
        <circle cx="20.5" cy="16.5" r="8" fill="url(#paint0_linear_3405_70138)" />
      </g>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.5161 18.3718C18.3936 19.3858 16.9398 20.272 15.9494 19.4473C14.7098 18.4151 16.3211 15.6024 17.3038 14.4166C18.2865 13.2307 19.8491 12.8721 20.794 13.6155C21.1197 13.8717 21.3294 14.2254 21.4243 14.6275C22.5468 13.6134 24.0006 12.7272 24.991 13.5519C26.2306 14.5842 24.6193 17.3969 23.6365 18.5827C22.6538 19.7685 21.0912 20.1272 20.1464 19.3838C19.8207 19.1275 19.611 18.7738 19.5161 18.3718Z"
        fill="#18181D"
      />
      <defs>
        <filter
          id="filter0_d_3405_70138"
          x="0.499971"
          y="0.499981"
          width="40.0001"
          height="40.0001"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4.00001" />
          <feGaussianBlur stdDeviation="6.00001" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3405_70138" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3405_70138" result="shape" />
        </filter>
        <linearGradient
          id="paint0_linear_3405_70138"
          x1="12.5"
          y1="8.5"
          x2="28.7564"
          y2="8.76493"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FAD0DE" />
          <stop offset="0.46875" stopColor="#E8CBFF" />
          <stop offset="1" stopColor="#BCCFFF" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const levelTextWrapperCss = css({
  color: 'white',
  textStyle: 'caption',
});

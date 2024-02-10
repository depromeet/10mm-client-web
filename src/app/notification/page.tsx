'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { oneLineTextCss } from '@/components/ListItem/ListItem.styles';
import { stagger } from '@/components/Motion/Motion.constants';
import StaggerWrapper from '@/components/Motion/StaggerWrapper';
import { css, cx } from '@/styled-system/css';

import { flex } from '../../../styled-system/patterns';

function SearchPage() {
  return (
    <Suspense fallback={<div></div>}>
      <List />
    </Suspense>
  );
}

export default SearchPage;

function List() {
  const data = [1, 2, 3, 4, 5, 6, 7];
  //   const { data, refetch, isFetching } = useSuspenseGetSearchNickname(nickname);

  //   const onButtonClick = () => {
  //     refetch();
  //   };

  return (
    <StaggerWrapper wrapperOverrideCss={listContainer} staggerVariants={stagger(0.02)}>
      {data.map((item) => (
        <Link key={item} href={''}>
          <Notification />
          {/* <TwoLineListItem badgeElement={<></>} name={'123123'} subName={'hihi'} imageUrl={''} /> */}
        </Link>
      ))}
    </StaggerWrapper>
  );
}

// 디자인 시스템에 추가되기 전이라 임시로 만듭니다
function Notification() {
  return (
    <li className={cx(containerCss, bgExistContainerCss)}>
      <div
        style={{
          width: '36px',
          height: '36px',
        }}
      >
        <svg width="36" height="36" viewBox="0 0 210 205" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M37.9613 154.379L85.0278 41.2078L163.167 119.347L49.9957 166.414C46.5535 167.845 42.5878 167.059 39.9517 164.423C37.3157 161.787 36.5298 157.821 37.9613 154.379Z"
            fill="url(#paint0_radial_907_13585)"
            stroke="url(#paint1_linear_907_13585)"
          />
          <g filter="url(#filter0_b_907_13585)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M113.137 91.2375C135.007 113.107 157.801 125.77 164.049 119.522C168.923 114.648 162.291 99.708 148.758 82.9921L147.704 81.7029C146.28 79.9797 144.785 78.24 143.223 76.4929L142.04 75.1812C140.046 72.9932 137.952 70.7971 135.765 68.6101C133.578 66.4232 131.382 64.3283 129.194 62.3352L127.882 61.1516C126.135 59.59 124.395 58.0948 122.672 56.6709L121.383 55.6164C104.667 42.0842 89.7267 35.4521 84.853 40.3259C78.6046 46.5742 91.2679 69.3682 113.137 91.2375Z"
              fill="url(#paint2_radial_907_13585)"
            />
            <path
              d="M163.695 119.168C162.313 120.551 159.933 120.963 156.628 120.323C153.344 119.687 149.278 118.034 144.694 115.487C135.532 110.397 124.402 101.795 113.491 90.884C102.579 79.9726 93.9781 68.8432 88.888 59.681C86.3412 55.0968 84.6879 51.0307 84.0518 47.7464C83.4118 44.4414 83.8238 42.0621 85.2065 40.6794C86.2842 39.6017 87.9642 39.1119 90.2347 39.2549C92.5032 39.3978 95.2912 40.1703 98.4811 41.5289C104.856 44.2444 112.73 49.2549 121.067 56.0041C121.067 56.0044 121.068 56.0047 121.068 56.005L122.353 57.0563C122.354 57.0566 122.354 57.0569 122.354 57.0571C124.072 58.4763 125.806 59.9668 127.548 61.5237C127.548 61.5239 127.548 61.5242 127.549 61.5244L128.857 62.7048C128.857 62.7051 128.857 62.7053 128.858 62.7055C131.04 64.6932 133.23 66.7824 135.411 68.9637C137.592 71.1449 139.682 73.3352 141.669 75.5172C141.669 75.5174 141.67 75.5177 141.67 75.5179L142.85 76.8261C142.851 76.8263 142.851 76.8266 142.851 76.8269C144.408 78.5691 145.899 80.3035 147.318 82.0214C147.318 82.0214 147.318 82.0214 147.318 82.0214L148.37 83.3067C148.37 83.307 148.37 83.3072 148.37 83.3075C155.12 91.6449 160.13 99.5182 162.846 105.894C164.204 109.084 164.977 111.872 165.12 114.14C165.263 116.411 164.773 118.091 163.695 119.168Z"
              stroke="url(#paint3_radial_907_13585)"
            />
          </g>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M203.679 31.1152L183.029 31.9785L194.875 53.4535L203.679 31.1152Z"
            fill="#FFDAFE"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M111.015 4.2955L99.7504 30.1939L120.786 29.3941L111.015 4.2955Z"
            fill="#5B72F2"
          />
          <circle cx="156.463" cy="9.8995" r="7" transform="rotate(45 156.463 9.8995)" fill="#E965E2" />
          <circle cx="154.392" cy="97.9239" r="7" transform="rotate(45 154.392 97.9239)" fill="#E965E2" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M132.247 43.0286C130.092 41.7964 129.342 39.0517 130.571 36.8947C131.802 34.7329 134.555 33.9809 136.714 35.2159L137.292 35.5464L138.244 36.1058L139.148 36.6465L140.02 37.1776C146.127 40.9398 150.4 44.4299 153.196 48.5279L153.406 48.8421L153.502 48.9898L153.753 48.9482C162.849 47.4821 170.141 50.6784 175.137 57.6524L175.37 57.9821C178.121 61.9439 180.43 70.9875 181.649 76.4988C182.199 78.9816 180.503 81.3572 177.989 81.7374C175.558 82.1049 173.276 80.4606 172.772 78.0543C171.781 73.3226 170.007 66.0391 167.977 63.115C165.242 59.1758 161.71 57.2509 156.778 57.6301L156.362 57.6672L156.367 57.7629C156.446 60.623 155.731 63.5615 154.158 66.5214L153.965 66.8767L153.466 67.7608C147.286 78.5051 140.212 83.3465 133.246 81.5845C127.144 80.041 123.202 73.3789 124.142 67.4472C125.399 59.5107 131.038 54.7839 139.339 52.1921C139.532 52.132 139.738 52.0709 139.957 52.009L140.645 51.8213C140.885 51.7583 141.134 51.6949 141.39 51.6314L142.175 51.4414L142.987 51.2536L143.68 51.0993L143.66 51.0793C141.758 49.1815 139.109 47.2122 135.697 45.0866L135.3 44.8406L134.49 44.3473L133.645 43.8417L132.749 43.3152L132.247 43.0286ZM147.182 59.6405L147.195 59.5604L145.472 59.9282L144.466 60.1535L143.532 60.3746L142.967 60.5171L142.46 60.6537L142.022 60.7831C136.64 62.4633 133.646 64.9731 133.031 68.8551C132.791 70.3659 134.058 72.5064 135.453 72.8593C137.052 73.2637 139.424 72.0353 142.278 68.4005L142.679 67.8776C142.746 67.7878 142.814 67.6967 142.882 67.6043L143.292 67.0337C143.499 66.7403 143.708 66.4348 143.919 66.1169L144.343 65.4644C144.414 65.3529 144.486 65.2399 144.557 65.1256L144.99 64.4226L145.428 63.6853C145.501 63.5595 145.574 63.4323 145.648 63.3036L146.093 62.5141C146.636 61.5344 147 60.58 147.182 59.6405Z"
            fill="white"
          />
          <defs>
            <filter
              id="filter0_b_907_13585"
              x="69.6664"
              y="25.1393"
              width="109.569"
              height="109.569"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feGaussianBlur in="BackgroundImageFix" stdDeviation="6.7957" />
              <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_907_13585" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_907_13585" result="shape" />
            </filter>
            <radialGradient
              id="paint0_radial_907_13585"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(83.4267 54.4242) rotate(49.4017) scale(103.344 110.642)"
            >
              <stop stopColor="#F065E2" />
              <stop offset="1" stopColor="#3748FA" />
            </radialGradient>
            <linearGradient
              id="paint1_linear_907_13585"
              x1="36.1435"
              y1="58.1545"
              x2="51.1828"
              y2="147.003"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.29535" />
              <stop offset="1" stopColor="white" stopOpacity="0.01" />
            </linearGradient>
            <radialGradient
              id="paint2_radial_907_13585"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(90.9031 79.9238) rotate(34.3143) scale(73.0722)"
            >
              <stop stopColor="white" stopOpacity="0.801593" />
              <stop offset="1" stopColor="#889AFF" stopOpacity="0.301884" />
            </radialGradient>
            <radialGradient
              id="paint3_radial_907_13585"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(91.2047 46.7222) rotate(70.2944) scale(47.4778 71.8208)"
            >
              <stop stopColor="white" stopOpacity="0.973411" />
              <stop offset="1" stopColor="white" stopOpacity="0.01" />
            </radialGradient>
          </defs>
        </svg>
      </div>
      <div className={textWrapperCss}>
        <p className={cx(oneLineTextCss, nameCss)}>a가 나를 팔로우 했어요</p>
        <p className={cx(oneLineTextCss, subNameCss)}>24.02.11</p>
      </div>{' '}
    </li>
  );
}

const listContainer = css({
  gap: '8px',
  height: '100%',
  overflowY: 'auto',
  _scrollbar: {
    display: 'none',
  },
});

// 디자인 시스템에 추가되기 전이라 임시로 만듭니다
const containerCss = flex({
  gap: '10px',
  alignItems: 'center',
  borderRadius: '22px',
  height: '74px',
  cursor: 'pointer',
});

const textWrapperCss = flex({ flex: 1, flexDirection: 'column', gap: '2px', minWidth: '0' });

const subNameCss = css({
  color: 'text.tertiary',
  textStyle: 'body3',
  width: '100%',
});

const nameCss = css({
  color: 'text.secondary',
  textStyle: 'body2',
});

const bgExistContainerCss = css({
  border: '1px solid #22242F',
  background: 'linear-gradient(0deg, rgba(168, 180, 240, 0.02) 0%, rgba(168, 180, 240, 0.02) 100%), #18181D',
  boxShadow: '-10px 0px 100px 4px rgba(69, 85, 169, 0.05) inset',
  padding: '16px',
});

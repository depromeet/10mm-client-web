import React from 'react';
import { type CardBannerType } from '@/components/Banner/Banner.types';
import Icon from '@/components/Icon';
import { css } from '@/styled-system/css';

function CardBanner(props: CardBannerType) {
  return (
    <div className={containerCss}>
      <Icon name={props.iconName} width={20} height={20} />
      <p className={descriptionCss}>{props.description}</p>
      <p className={titleCss}>{props.title}</p>
    </div>
  );
}

export default CardBanner;

const containerCss = css({
  padding: '20px 16px 16px',
  width: 'fit-content',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  border: '0.3px solid',
  borderColor: 'gradient-stroke',
  borderRadius: '22px',
  // border: 0.3px solid var(--gradient-stroke, #DDD5FF);
  background: 'linear-gradient(136deg, rgba(240, 168, 198, 0.02) 15.95%, rgba(143, 169, 255, 0.02) 85.07%)',
  boxShadow: '0px 10px 20px 4px rgba(100, 78, 122, 0.20) inset, 0px 4px 20px 0px rgba(16, 15, 23, 0.30)',
});

const descriptionCss = css({
  marginTop: '8px',
  textStyle: 'body4',
  color: 'text.secondary',
});
const titleCss = css({
  marginTop: '6px',
  textStyle: 'subtitle1',
  color: 'text.primary',
});

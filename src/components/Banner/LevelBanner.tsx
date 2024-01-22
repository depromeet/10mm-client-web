import Image from 'next/image';
import { css } from '@/styled-system/css';

import Icon from '../Icon';
import { type LevelBannerType } from './Banner.types';

export default function LevelBanner(props: LevelBannerType) {
  return (
    <div className={levelBannerCss}>
      <Image className={imageCss} width={53.333} height={40} alt={props.level} src={props.imageUrl} />

      <p className={levelCss}>Lv 4. 잼민이</p>

      <div className={levelStatusCss}>
        <Icon name={'10mm-symbol-circle'} color={'icon.secondary'} width={12} height={12} />
        <span className={levelAmoutCss}>{props.amount}</span>
        <Icon name={'arrow-forward'} color={'icon.secondary'} width={14} height={14} />
      </div>
    </div>
  );
}
const levelBannerCss = css({
  display: 'flex',
  flexDirection: 'row',
  padding: '16px',
  alignItems: 'center',
  marginTop: '20px',
  gap: '8px',
  borderRadius: '20px',
  background: 'linear-gradient(93deg, rgba(23, 25, 27, 0.80) 0.82%, rgba(24, 25, 33, 0.80) 99.97%)',
  boxShadow: '0px 5px 50px 4px rgba(78, 85, 122, 0.50) inset, 0px 4px 20px 0px rgba(16, 15, 23, 0.20)',
  backdropFilter: 'blur(20px)',
});
const imageCss = css({
  flexShrink: '0',
  width: '30px',
  height: '30px',
});
const levelCss = css({
  textStyle: 'body1',
  color: 'text.secondary',
  flex: '1',
});
const levelStatusCss = css({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
});
const levelAmoutCss = css({
  textStyle: 'subtitle4',
  color: 'purple.purple800',
  fontWeight: 'semibold',
});

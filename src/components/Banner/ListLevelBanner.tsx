import Image from 'next/image';
import Icon from '@/components/Icon';
import { css } from '@/styled-system/css';
import { getLevel } from '@/utils/result';

import { type LevelBannerType } from './Banner.types';

function ListLevelBanner(props: LevelBannerType) {
  const levelInfo = getLevel(props.symbolStack);

  return (
    <div className={levelBannerCss}>
      <Image className={imageCss} width={53.333} height={40} alt={String(levelInfo.level)} src={levelInfo.imageUrl} />

      <p className={levelCss}>{levelInfo.label}</p>

      <div className={levelStatusCss}>
        <Icon name={'10mm-symbol-circle'} color={'icon.secondary'} width={12} height={12} />
        <span className={levelAmountCss}>{props.symbolStack}</span>
        <Icon className="arrow-forward" name={'arrow-forward'} color={'icon.secondary'} width={14} height={14} />
      </div>
    </div>
  );
}

export default ListLevelBanner;

const levelBannerCss = css({
  display: 'flex',
  flexDirection: 'row',
  padding: '12px 16px 12px 8px',
  alignItems: 'center',
  marginTop: '20px',
  borderRadius: '20px',
  background: 'linear-gradient(93deg, rgba(28, 29, 33, 0.80) 0.82%, rgba(24, 25, 33, 0.80) 99.97%)',
  boxShadow: '0px 5px 50px 4px rgba(78, 85, 122, 0.50) inset, 0px 4px 20px 0px rgba(16, 15, 23, 0.20)',
  backdropFilter: 'blur(20px)',
});

const imageCss = css({
  flexShrink: '0',
  width: '53.333px',
  height: '40px',
  objectFit: 'contain',
  marginRight: '2px',
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

const levelAmountCss = css({
  textStyle: 'subtitle4',
  color: 'purple.purple800',
  fontWeight: 'semibold',
});

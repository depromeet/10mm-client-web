import Image from 'next/image';
import { type CardBannerType } from '@/components/Banner/Banner.types';
import { css } from '@/styled-system/css';

function CardBanner(props: CardBannerType) {
  return (
    <div className={containerCss}>
      <div>
        <Image src={props.iconUrl} width={20} height={20} alt={props.title} />
      </div>
      <p className={descriptionCss}>{props.description}</p>
      <p className={titleCss}>{props.title}</p>
    </div>
  );
}

export default CardBanner;

const containerCss = css({
  width: '100%',
  overflow: 'hidden',
  borderRadius: '22px',
  boxShadow: '0px 10px 30px 4px rgba(78, 80, 122, 0.20) inset, 0px 4px 20px 0px rgba(15, 16, 23, 0.30)',
  border: ' 1px solid #474A5D',
  padding: '20px 16px 16px',
  background: 'linear-gradient(136deg, rgba(168, 184, 240, 0.02) 15.95%, rgba(165, 143, 255, 0.02) 85.07%)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  flex: 1,
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

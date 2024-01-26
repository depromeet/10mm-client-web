import Image from 'next/image';
import { type CardBannerType } from '@/components/Banner/Banner.types';
import { css } from '@/styled-system/css';

function CardBanner(props: CardBannerType) {
  return (
    <div className={containerCss}>
      <div className={innerContainerCss}>
        <div>
          <Image src={props.iconUrl} width={20} height={20} alt={props.title} />
        </div>
        {/* <Icon name={props.iconName} width={20} height={20} /> */}
        <p className={descriptionCss}>{props.description}</p>
        <p className={titleCss}>{props.title}</p>
      </div>
    </div>
  );
}

export default CardBanner;

const containerCss = css({
  minWidth: 'fit-content',
  width: '100%',
  overflow: 'hidden',
  borderRadius: '22px',
  boxShadow: '0px 10px 20px 4px rgba(100, 78, 122, 0.20) inset, 0px 4px 20px 0px rgba(16, 15, 23, 0.30)',
  border: '.3px solid transparent',
});

const innerContainerCss = css({
  padding: '20px 16px 16px',
  background: 'linear-gradient(136deg, rgba(240, 168, 198, 0.02) 15.95%, rgba(143, 169, 255, 0.02) 85.07%)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  height: '100%',
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

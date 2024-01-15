import Image from 'next/image';
import { type GraphicBannerType } from '@/components/Banner/Banner.types';
import { css } from '@/styled-system/css';

function GraphicBanner(props: GraphicBannerType) {
  return (
    <div className={containerCss}>
      <Image src={props.imageUrl} alt="graphicBanner" fill />
    </div>
  );
}

export default GraphicBanner;

const containerCss = css({
  borderRadius: '22px',
  border: '0.25px solid #5C5977',
  background: 'linear-gradient(136deg, rgba(168, 227, 240, 0.02) 15.95%, rgba(143, 169, 255, 0.02) 85.07%)',
  boxShadow: '-10px 0px 100px 4px rgba(90, 78, 122, 0.20) inset',
  position: 'relative',
  width: '235px',
  height: '120px',
  display: 'flex',

  '& img': {
    objectFit: 'contain',
    height: '100%',
  },
});

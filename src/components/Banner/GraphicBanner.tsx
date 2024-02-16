import Image from 'next/image';
import { type GraphicBannerType } from '@/components/Banner/Banner.types';
import { css, cx } from '@/styled-system/css';
import { center } from '@/styled-system/patterns';

function GraphicBanner(props: GraphicBannerType) {
  return (
    <div className={containerCss}>
      <Image src={props.imageUrl} alt="graphicBanner" width={106.67} height={80} className={graphicImageCss} />
      <div className={bgCss}>
        <Image src="/images/banner/graphic-bg-gradient.svg" width={194} height={120} alt="graphic banner bg" />
      </div>
    </div>
  );
}

export default GraphicBanner;

const graphicImageCss = css({
  objectFit: 'contain',
  height: '100%',
  flex: 0,
  zIndex: 1,
});

const containerCss = center({
  borderRadius: '22px',
  border: '1px solid #393C4C',
  background: 'rgba(168, 197, 240, 0.02)',
  boxShadow: '0px 10px 100px 4px rgba(78, 80, 122, 0.20) inset',
  position: 'relative',
  width: '100%',
  height: '120px',
  display: 'flex',
});

const bgCss = css({
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 0,
  width: '194px',
  height: '120px',
  '& img': {
    width: '100%',
    height: '100%',
  },
});

export const GraphicBannerSkeleton = () => {
  return (
    <div
      className={cx(
        containerCss,
        css({
          animation: 'skeleton',
        }),
      )}
    ></div>
  );
};

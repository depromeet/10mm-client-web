import Image from 'next/image';
import { type ListBannerType } from '@/components/Banner/Banner.types';
import { css } from '@/styled-system/css';

function ListBanner(props: ListBannerType) {
  return (
    <div className={missionHistoryBannerCss}>
      <Image className={imageCss} width={30} height={30} alt={props.title} src={props.imageUrl} />
      <div>
        <p className={bannerTitleCss}>{props.title}</p>
        <p className={bannerDescriptionCss}>{props.description}</p>
        {props.date && <p className={dateCss}>{props.date}</p>}
      </div>
    </div>
  );
}

export default ListBanner;

const missionHistoryBannerCss = css({
  display: 'flex',
  flexDirection: 'row',
  padding: '16px',
  alignItems: 'center',
  gap: '8px',
  borderRadius: '22px',
  background: 'linear-gradient(93deg, rgba(25, 23, 27, 0.80) 0.82%, rgba(24, 25, 33, 0.80) 99.97%)',
  boxShadow: '0px 5px 50px 4px rgba(92, 78, 122, 0.50) inset, 0px 4px 20px 0px rgba(16, 15, 23, 0.20)',
  backdropFilter: 'blur(20px)',
});

const imageCss = css({
  flexShrink: '0',
  width: '30px',
  height: '30px',
});

const bannerTitleCss = css({
  textStyle: 'body1',
  color: 'text.primary',
});

const bannerDescriptionCss = css({
  textStyle: 'body4',
  color: 'text.tertiary',
  marginTop: '2px',
});

const dateCss = css({
  marginTop: '6px',
  textStyle: 'body6',
  color: 'purple.purple300',
});

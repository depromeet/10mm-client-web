import Image from 'next/image';
import { type ListBannerType } from '@/components/Banner/Banner.types';
import { css } from '@/styled-system/css';

function ListBanner(props: ListBannerType) {
  return (
    <div className={containerCss}>
      <Image className={imageCss} width={30} height={30} alt={props.title} src={props.imageUrl} />
      <div>
        <p className={titleCss}>{props.title}</p>
        <p className={descriptionCss}>{props.description}</p>
        {props.date && <p className={dateCss}>{props.date}</p>}
      </div>
    </div>
  );
}

export default ListBanner;

const containerCss = css({
  display: 'flex',
  flexDirection: 'row',
  padding: '16px',
  alignItems: 'center',
  gap: '8px',
  borderRadius: '22px',
  border: '1px solid #22242F',
  background: 'rgba(181, 184, 255, 0.02)',
  boxShadow: '-10px 0px 100px 4px rgba(93, 96, 178, 0.10) inset',
});

const imageCss = css({
  flexShrink: '0',
  width: '30px',
  height: '30px',
});

const titleCss = css({
  textStyle: 'body1',
  color: 'text.primary',
});

const descriptionCss = css({
  textStyle: 'body5',
  color: 'text.tertiary',
  marginTop: '2px',
});

const dateCss = css({
  marginTop: '6px',
  textStyle: 'body6',
  color: 'purple.purple300',
});

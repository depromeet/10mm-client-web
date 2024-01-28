import { type BannerType } from './Banner.types';
import CardBanner from './CardBanner';
import GraphicBanner from './GraphicBanner';
import ListBanner from './ListBanner';
import ListLevelBanner from './ListLevelBanner';

function Banner(props: BannerType) {
  switch (props.type) {
    case 'list':
      return <ListBanner {...props} />;
    case 'card':
      return <CardBanner {...props} />;
    case 'graphic':
      return <GraphicBanner {...props} />;
    case 'level':
      return <ListLevelBanner {...props} />;
  }
}

export default Banner;

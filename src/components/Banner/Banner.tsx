import React from 'react';
import { type BannerType } from '@/components/Banner/Banner.types';
import CardBanner from '@/components/Banner/CardBanner';
import GraphicBanner from '@/components/Banner/GraphicBanner';
import ListBanner from '@/components/Banner/ListBanner';

import LevelBanner from './LevelBanner';

function Banner(props: BannerType) {
  switch (props.type) {
    case 'list':
      return <ListBanner {...props} />;
    case 'card':
      return <CardBanner {...props} />;
    case 'graphic':
      return <GraphicBanner {...props} />;
    case 'level':
      return <LevelBanner {...props} />;
  }
}

export default Banner;

import React from 'react';
import { type BannerType } from '@/components/Banner/Banner.types';
import CardBanner from '@/components/Banner/CardBanner';
import GraphicBanner from '@/components/Banner/GraphicBanner';
import ListBanner from '@/components/Banner/ListBanner';

function Banner(props: BannerType) {
  switch (props.type) {
    case 'list':
      return <ListBanner {...props} />;
    case 'card':
      return <CardBanner {...props} />;
    case 'graphic':
      return <GraphicBanner {...props} />;
  }
}

export default Banner;

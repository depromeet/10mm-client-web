import FeedList from '@/app/feed/FeedList';
import AppBar from '@/app/home/AppBar';
import AppBarBottom from '@/components/AppBarBottom/AppBarBottom';
import BottomDim from '@/components/BottomDim/BottomDim';

export default function FeedPage() {
  return (
    <>
      <AppBar />
      <FeedList />
      <BottomDim />
      <AppBarBottom />
    </>
  );
}

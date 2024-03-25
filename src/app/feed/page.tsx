import FeedSection from '@/app/feed/FeedSection';
import AppBarBottom from '@/components/AppBarBottom/AppBarBottom';
import BottomDim from '@/components/BottomDim/BottomDim';
import AppBar from '@/pages/home/AppBar';

export default function FeedPage() {
  return (
    <>
      <AppBar />
      <FeedSection />
      <BottomDim type={'bottomDim2'} />
      <AppBarBottom />
    </>
  );
}

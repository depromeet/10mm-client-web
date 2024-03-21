import FeedSection from '@/app/feed/FeedSection';
import AppBar from '@/pages/home/AppBar';
import AppBarBottom from '@/components/AppBarBottom/AppBarBottom';
import BottomDim from '@/components/BottomDim/BottomDim';

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

import { type ComponentProps } from 'react';
import BottomSheet from '@/components/BottomSheet/BottomSheet';
import Header from '@/components/Header';

interface Props extends Omit<ComponentProps<typeof BottomSheet>, 'headerElement'> {}
function CategoryBottomSheet(props: Props) {
  return <BottomSheet headerElement={<Header.None title="카테고리" />} {...props}></BottomSheet>;
}

export default CategoryBottomSheet;

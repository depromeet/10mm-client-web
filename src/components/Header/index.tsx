import Header from '@/components/Header/Header';
import IconHeader from '@/components/Header/IconHeader';
import NoneHeader from '@/components/Header/NoneHeader';
import TextButtonHeader from '@/components/Header/TextButtonHeader';

export default Object.assign(Header, {
  Icon: IconHeader,
  TextButton: TextButtonHeader,
  None: NoneHeader,
});

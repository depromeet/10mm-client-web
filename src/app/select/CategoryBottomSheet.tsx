import { type ComponentProps } from 'react';
import Image from 'next/image';
import BottomSheet from '@/components/BottomSheet/BottomSheet';
import Header from '@/components/Header';
import Icon from '@/components/Icon';
import { css } from '@/styled-system/css';

const CATEGORY = [
  {
    name: '운동',
    image: '/images/category/exercise.png',
  },
  {
    name: '공부',
    image: '/images/category/study.png',
  },
  {
    name: '글 읽기',
    image: '/images/category/reading.png',
  },
  {
    name: '글 쓰기',
    image: '/images/category/writting.png',
  },
  {
    name: '프로젝트 / 작업',
    image: '/images/category/laptop.png',
  },
  {
    name: '영상 보기 / 팟캐스트 듣기',
    image: '/images/category/play-button.png',
  },
  {
    name: '기타',
    image: '/images/category/exercise.png',
  },
];

interface Props extends Omit<ComponentProps<typeof BottomSheet>, 'headerElement'> {
  selectCategory: string | null;
  onSelectCategory: (category: string) => void;
}

function CategoryBottomSheet(props: Props) {
  const onClick = (name: string) => {
    props.onSelectCategory(name);
    props.onClickOutside?.();
  };

  return (
    <BottomSheet headerElement={<Header.None title="카테고리" />} {...props}>
      <ul className={categoryListCss}>
        {CATEGORY.map((item) => (
          <li key={item.name} className={categoryItemCss} onClick={() => onClick(item.name)}>
            <div>
              <div className={imageWrapperCss}>
                <Image src={item.image} alt={item.name} fill />
              </div>
              <div>{item.name}</div>
            </div>
            <div>{props.selectCategory === item.name && <Icon name="check-circle" color="purple.purple700" />}</div>
          </li>
        ))}
      </ul>
    </BottomSheet>
  );
}

export default CategoryBottomSheet;

const categoryListCss = css({
  width: '100%',
});

const categoryItemCss = css({
  position: 'relative',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '12px 16px',
  color: 'text.secondary',
  textStyle: 'subtitle3',

  '& div': {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
  },
});

const imageWrapperCss = css({
  position: 'relative',
  width: '28px',
  height: '28px',
});

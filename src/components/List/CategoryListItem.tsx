import Image from 'next/image';
import Icon from '@/components/Icon';
import { type CategoryListItemType } from '@/components/List/List.types';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

function CategoryListItem(props: CategoryListItemType) {
  return (
    <div className={containerCss}>
      {props.imageUrl && <Image src={props.imageUrl} alt={props.category} width={28} height={28} />}
      <span className={categoryCss}>{props.category}</span>
      {props.checked && <Icon name="check-circle" color="purple.purple700" />}
    </div>
  );
}

export default CategoryListItem;

const containerCss = flex({
  gap: '8px',
  alignItems: 'center',
  padding: '12px 16px',
});

const categoryCss = css({
  color: 'text.secondary',
  flex: 1,
});

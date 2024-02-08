import Link from 'next/link';
import { type FullTabPartsProps } from '@/components/Tab/Tab.types';
import { css, cx } from '@/styled-system/css';

function FullTabParts({ tabName, isActive, onTabClick, href }: FullTabPartsProps) {
  const classNames = cx(
    tabNameCss,
    css({
      color: isActive ? 'text.secondary' : 'text.tertiary',
      borderColor: isActive ? 'icon.secondary' : 'gray.gray150',
    }),
  );

  if (href) {
    return (
      <Link href={href} shallow replace className={classNames} onClick={onTabClick}>
        <div>{tabName}</div>
      </Link>
    );
  }

  return (
    <div className={classNames} onClick={onTabClick}>
      {tabName}
    </div>
  );
}

export default FullTabParts;

const tabNameCss = css({
  textStyle: 'subtitle4',
  borderBottomWidth: '1px',
  cursor: 'pointer',
  flex: 1,
  lineHeight: '55px',
  textAlign: 'center',
  transition: 'color 0.3s, border-color 0.3s',
});

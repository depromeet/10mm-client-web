import Icon from '@/components/Icon';
import { NAVIGATION, type NavigationItemType } from '@/constants/navigation';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

interface Props {
  current: string;
  onClick: (item: NavigationItemType) => void;
}

function AppBarBottomView(props: Props) {
  return (
    <article className={containerCss}>
      {NAVIGATION.map((item) => {
        const isActive = item.key === props.current;
        return (
          <div
            key={item.key}
            onClick={() => props.onClick(item)}
            className={css(itemCss, {
              color: isActive ? 'purple.purple800' : 'text.quaternary',
            })}
          >
            <Icon name={item.icon} color={isActive ? 'purple.purple800' : 'text.quaternary'} />
            <span>{item.name}</span>
          </div>
        );
      })}
    </article>
  );
}

export default AppBarBottomView;

const containerCss = flex({
  padding: '12px 32px',
  gap: '24px',
  backgroundColor: 'bg.surface4',
  width: 'fit-content',
  borderRadius: '24px',

  position: 'fixed',
  bottom: '34px', // indicator(34px)
  left: 0,
  right: 0,
  margin: '16px auto',
  zIndex: 'appBar',
});

const itemCss = {
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
  alignItems: 'center',
  cursor: 'pointer',
  textStyle: 'caption',
  transition: 'all .3s',

  '& svg': {
    transition: 'all .3s',
  },
};

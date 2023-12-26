import Icon, { type IconComponentMap } from '@/components/Icon';
import { ROUTER } from '@/constants/router';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

interface NavigationItemType {
  icon: keyof typeof IconComponentMap;
  key: string;
  name: string;
  path: string;
}

const NAVIGATION: NavigationItemType[] = [
  {
    icon: 'navigation-home',
    key: 'home',
    name: 'Home',
    path: ROUTER.HOME,
  },
  {
    icon: 'navigation-result',
    key: 'result',
    name: 'Result',
    path: ROUTER.RESULT.ROOT,
  },
  {
    icon: 'navigation-mypage',
    key: 'mypage',
    name: 'My',
    path: ROUTER.MYPAGE.ROOT,
  },
];

interface Props {
  current: string;
  onClick: (key: string) => void;
}

function AppBarBottomView(props: Props) {
  return (
    <article className={containerCss}>
      {NAVIGATION.map((item) => {
        const isActive = item.key === props.current;
        return (
          <div
            key={item.key}
            onClick={() => props.onClick(item.key)}
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

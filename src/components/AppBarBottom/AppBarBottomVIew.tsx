import Link from 'next/link';
import Icon from '@/components/Icon';
import { EVENT_LOG_CATEGORY, EVENT_LOG_NAME } from '@/constants/eventLog';
import { NAVIGATION, type NavigationItemType } from '@/constants/navigation';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';
import { eventLogger } from '@/utils';
import { NATIVE_METHODS } from '@/utils/nativeMethod';

interface Props {
  current: string;
  onClick?: (item: NavigationItemType) => void;
}

function AppBarBottomView(props: Props) {
  const handleClick = (tabName: string) => {
    NATIVE_METHODS.HAPTIC();
    eventLogger.logEvent(EVENT_LOG_NAME.BOTTOM_APP_BAR.CLICK_TAB, EVENT_LOG_CATEGORY.BOTTOM_APP_BAR, {
      tabName,
    });
  };
  return (
    <article className={containerCss}>
      {NAVIGATION.map((item) => {
        const isActive = item.key === props.current;
        return (
          <Link
            key={item.key}
            href={item.path}
            passHref
            onClick={() => {
              handleClick(item.name);
            }}
          >
            <div
              onClick={() => props.onClick?.(item)}
              className={css(itemCss, {
                color: isActive ? 'purple.purple800' : 'purple.purple100',
              })}
            >
              <Icon name={item.icon} color={isActive ? 'purple.purple800' : 'purple.purple100'} />
              <span>{item.name}</span>
            </div>
          </Link>
        );
      })}
    </article>
  );
}

export default AppBarBottomView;

const containerCss = flex({
  padding: '12px 16px 14px',
  backdropFilter: 'blur(20px)',
  width: 'fit-content',
  borderRadius: '24px',
  position: 'fixed',
  bottom: '12px', // indicator(34px)
  left: 0,
  right: 0,
  margin: '16px auto',
  zIndex: 'appBar',
  background: 'linear-gradient(91deg, rgba(35, 40, 52, 0.70) 0%, rgba(39, 40, 62, 0.70) 100%)',
});

const itemCss = {
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
  alignItems: 'center',
  cursor: 'pointer',
  fontSize: '9px',
  fontWeight: '400',
  lineHeight: '12px',
  transition: 'all .3s',
  width: '48px',

  '& svg': {
    transition: 'all .3s',
  },
};

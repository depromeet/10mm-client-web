import Link from 'next/link';
import Icon from '@/components/Icon';
import Thumbnail from '@/components/Thumbnail/Thumbnail';
import { css, cva } from '@styled-system/css';

interface MissionCalendarItemProps {
  imageUrl?: string;
  missionId?: string;
  date: number;
  isActive?: boolean;
  routerLink: string;
}

function MissionCalendarItem({ imageUrl, date, isActive, routerLink }: MissionCalendarItemProps) {
  return (
    <Link href={routerLink}>
      <div
        className={missionCalendarItemWrapperCss({
          active: isActive,
        })}
      >
        {imageUrl ? (
          <div className={thumbnailCss}>
            <Thumbnail size={'h36'} variant={'dimed'} url={imageUrl} />
            <Icon
              className={css({
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              })}
              name={'10mm-symbol'}
              size={24}
            />
          </div>
        ) : (
          <div
            className={missionCalendarItemNonCompletedCss({
              active: isActive,
            })}
          />
        )}
        {date}
      </div>
    </Link>
  );
}

const missionCalendarItemNonCompletedCss = cva({
  base: {
    width: '36px',
    height: '36px',
    borderRadius: '14px',
  },
  variants: {
    active: {
      true: {
        background: 'purple.purple050',
      },
      false: {
        background: 'bg.surface3',
      },
    },
  },
  defaultVariants: {
    active: false,
  },
});

const missionCalendarItemWrapperCss = cva({
  base: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
  },
  variants: {
    active: {
      true: {
        color: 'purple.purple600',
      },
      false: {
        color: 'text.tertiary',
      },
    },
  },
  defaultVariants: {
    active: false,
  },
});

const thumbnailCss = css({
  position: 'relative',
});

export default MissionCalendarItem;

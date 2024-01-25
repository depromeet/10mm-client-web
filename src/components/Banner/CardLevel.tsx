import Character from '@/app/level/guide/Character';
import Icon from '@/components/Icon';
import LockedCharacter from '@/components/Level/LockedCharacter';
import { LEVEL_SYSTEM } from '@/constants/level';
import { gradientBorderWrapperCss, gradientTextCss } from '@/constants/style/gradient';
import { css, cx } from '@/styled-system/css';
import { center, flex } from '@/styled-system/patterns';

interface Props {
  level: number;
  isSelected: boolean;
  isLocked: boolean;
  onClick?: () => void;
}

function CardLevel(props: Props) {
  const levelInfo = LEVEL_SYSTEM[props.level - 1];

  return (
    <li
      className={cx(
        itemContainerRecipe,
        props.isSelected ? gradientBorderWrapperCss() : css({ backgroundColor: 'bg.surface3' }),
      )}
      onClick={props.onClick}
    >
      <div className={itemInnerContainerCss}>
        <p className={levelLabelCss}>Lv. {levelInfo.level}</p>
        <div className={imageWrapperCss}>
          {props.isLocked ? (
            <LockedCharacter level={levelInfo.level} size="md" />
          ) : (
            <Character width={76} height={56.8} level={levelInfo.level} isLocked={props.isLocked} />
          )}
        </div>
        <div className={stackTextCss}>
          <Icon name={props.isLocked ? '10mm-symbol-circle-lock' : '10mm-symbol-circle'} />
          <p className={props.isLocked ? '' : gradientTextCss}>
            {levelInfo.min}~{levelInfo.max}
          </p>
        </div>
      </div>
    </li>
  );
}

export default CardLevel;

const levelLabelCss = css({
  color: 'text.secondary',
  textStyle: 'subtitle4',
});

const itemContainerRecipe = css({
  borderRadius: '22px',
  width: '116px!',
  height: '163px',
  listStyle: 'none',
});

const itemInnerContainerCss = css({
  width: '100%',
  height: '100%',
  flexDirection: 'column',
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  padding: '14px 16px',
});

const imageWrapperCss = center({
  flex: 1,
  width: '100%',
});

const stackTextCss = flex({
  width: 'fit-content',
  gap: '2px',
  alignItems: 'center',
  textStyle: 'body1',
  color: 'text.tertiary',
});

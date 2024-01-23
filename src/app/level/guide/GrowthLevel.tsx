import Image from 'next/image';
import Character from '@/app/level/guide/Character';
import Icon from '@/components/Icon';
import { LEVEL_SYSTEM, type LevelSystemType } from '@/constants/level';
import { css, cva } from '@/styled-system/css';
import { center, flex } from '@/styled-system/patterns';

function GrowthLevel({
  selectLevel,
  maxLevel,
  onClick,
}: {
  selectLevel: number;
  onClick: (level: number) => void;
  maxLevel: number;
}) {
  return (
    <>
      <h2 className={headingCss}>성장 레벨</h2>
      <div className={containerCss}>
        <ul className={listContainerCss}>
          {LEVEL_SYSTEM.map((level, idx) => {
            const isLocked = maxLevel <= idx;
            return (
              <GrowthLevelItem
                key={level.label}
                {...level}
                isSelected={selectLevel === level.level}
                isLocked={isLocked}
                onClick={() => onClick(level.level)}
              />
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default GrowthLevel;

const headingCss = css({
  color: 'gray.gray800',
  textStyle: 'subtitle2',
});

const containerCss = css({
  overflow: 'scroll',
});

const listContainerCss = flex({
  gap: '14px',
  padding: '12px 16px',
  width: 'fit-content',
});

interface GrowthLevelItemProps extends Pick<LevelSystemType, 'level' | 'min' | 'max' | 'imageUrl' | 'isFinal'> {
  isSelected: boolean;
  isLocked: boolean;
  onClick: () => void;
}

function GrowthLevelItem(props: GrowthLevelItemProps) {
  return (
    <li className={itemContainerRecipe({ selected: props.isSelected })} onClick={props.onClick}>
      <p className={levelLabelCss}>{props.level}</p>
      <div className={imageWrapperCss}>
        <Character width={76} height={56.8} level={props.level} isLocked={props.isLocked} />
      </div>
      <div className={stackTextCss}>
        <Icon name={props.isLocked ? '10mm-symbol-circle-lock' : '10mm-symbol-circle'} />
      </div>
    </li>
  );
}

const levelLabelCss = css({
  color: 'text.secondary',
  textStyle: 'subtitle4',
});

const itemContainerRecipe = cva({
  base: {
    borderRadius: '22px',
    flexDirection: 'column',
    padding: '14px 16px',
    width: '116px !',
    height: '163px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    cursor: 'pointer',
  },
  variants: {
    selected: {
      true: {
        border: '1px solid var(--gradient-primary, #FAD0DE)',
        background: 'linear-gradient(93deg, rgba(25, 23, 27, 0.80) 0.82%, rgba(24, 25, 33, 0.80) 99.97%)',
        boxShadow: '0px 5px 50px 4px rgba(92, 78, 122, 0.50) inset, 0px 4px 20px 0px rgba(16, 15, 23, 0.20)',
        backdropBlur: 'blur(20px)',
      },
      false: {
        backgroundColor: 'bg.surface3',
      },
    },
  },
});

const imageWrapperCss = center({
  flex: 1,
});

const stackTextCss = flex({
  width: 'fit-content',
  gap: '2px',
});

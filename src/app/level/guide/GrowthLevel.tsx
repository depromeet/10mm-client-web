import CardLevel from '@/components/Banner/CardLevel';
import { LEVEL_SYSTEM } from '@/constants/level';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

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
              <CardLevel
                key={level.label}
                // {...level}
                level={level.level}
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
  padding: '0 16px',
});

const containerCss = css({
  overflowY: 'auto',
  position: 'relative',

  '&::-webkit-scrollbar': {
    width: '2px',
  },
  '&::-webkit-scrollbar-thumb': {
    width: '2px',
    borderRadius: '5px',
    backgroundColor: 'bg.surface3',
  },
  '&::-webkit-scrollbar-track': {
    width: '2px',
  },
});

const listContainerCss = flex({
  gap: '14px',
  padding: '12px 16px',
  width: 'fit-content',
});

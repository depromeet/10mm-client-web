import CardLevel from '@/components/Banner/CardLevel';
import { LEVEL_SYSTEM } from '@/constants/level';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

interface Props {
  selectLevel: number;
  onClick: (level: number) => void;
  maxLevel: number;
}

function GrowthLevel({ selectLevel, maxLevel, onClick }: Props) {
  return (
    <>
      <h2 className={headingCss}>성장 레벨</h2>
      <div className={containerCss}>
        <ul className={listContainerCss}>
          {LEVEL_SYSTEM.map(({ level, label }, idx) => {
            const isLocked = maxLevel <= idx;
            return (
              <CardLevel
                key={label}
                level={level}
                isSelected={selectLevel === level}
                isLocked={isLocked}
                onClick={() => onClick(level)}
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
    width: '0px',
  },
  '&::-webkit-scrollbar-track': {
    width: '0px',
  },
});

const listContainerCss = flex({
  gap: '14px',
  padding: '12px 16px',
  width: 'fit-content',
});

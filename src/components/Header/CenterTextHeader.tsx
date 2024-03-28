import { css, cx } from '@styled-system/css';
import { center } from '@styled-system/patterns';

interface CenterTextHeaderProps {
  title: string;
  rightComponent?: React.ReactNode;
}

function CenterTextHeader({ title, rightComponent }: CenterTextHeaderProps) {
  return (
    <div className={headerWrapperCss}>
      <div className={sectionWrapperCss} />
      <div className={cx(sectionWrapperCss, centerCss)}>
        <h2 className={titleCss}>{title}</h2>
      </div>
      <div className={cx(sectionWrapperCss, flexEndCss)}>{rightComponent}</div>
    </div>
  );
}

export default CenterTextHeader;

const headerWrapperCss = css({
  height: '44px',
  display: 'flex',
});

const titleCss = css({
  color: 'text.primary',
  textStyle: 'subtitle1',
});

const sectionWrapperCss = css({
  width: '33%',
});

const centerCss = center();

const flexEndCss = css({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
});

import { css } from '@/styled-system/css';

const DEFAULT_TEXT_AREA_MAX_LENGTH = 200;

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  count?: boolean;
  description?: string;
  textAreaTitle?: string | React.ReactNode;
  value?: string;
}

const TextArea = ({ count, description, textAreaTitle, value, ...props }: Props) => {
  const shouldShowTailRow = !!description || count;

  return (
    <div className={textAreaWrapperCss}>
      {!!textAreaTitle && (
        <div className={headRowCss}>
          {typeof textAreaTitle === 'string' ? (
            <span className={textAreaTitleCss}>{textAreaTitle}</span>
          ) : (
            textAreaTitle
          )}
        </div>
      )}
      <div className={bodyRowCss}>
        <textarea className={textAreaCss} maxLength={DEFAULT_TEXT_AREA_MAX_LENGTH} value={value} {...props} />
      </div>
      {shouldShowTailRow && (
        <div className={tailRowCss}>
          {description && <div className={descriptionWrapperCss}>{description}</div>}
          {count && (
            <div className={countWrapperCss}>
              <span className={countValueCss}>{value?.length ?? 0}</span>
              <span>/</span>
              <span>{props.maxLength ?? DEFAULT_TEXT_AREA_MAX_LENGTH}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TextArea;

const textAreaWrapperCss = css({
  maxWidth: '343px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

const headRowCss = css({});

const textAreaTitleCss = css({
  color: 'text.primary',
  textStyle: 'body4',
});

const bodyRowCss = css({});

const textAreaCss = css({
  width: '343px',
  height: '86px',
  borderRadius: '16px',
  padding: '16px',
  backgroundColor: 'bg.surface3',
  color: 'text.secondary',
  outline: 'none',
  resize: 'none',

  '&::placeholder': {
    color: 'text.placeholder',
    textStyle: 'body1',
  },
});

const tailRowCss = css({
  display: 'flex',
  flexDirection: 'row',
});

const descriptionWrapperCss = css({
  flex: 1,
  color: 'text.tertiary',
  textStyle: 'body6',
});

const countWrapperCss = css({
  flex: 1,
  display: 'flex',
  justifyContent: 'flex-end',
  color: 'text.tertiary',
  textStyle: 'body6',
});

const countValueCss = css({
  color: 'text.secondary',
  textStyle: 'body6',
});

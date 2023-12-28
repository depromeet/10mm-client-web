import Icon from '@/components/Icon';
import { type SnackBarWithId } from '@/components/SnackBar/SnackBar.types';
import { css } from '@styled-system/css';

export default function SnackBar(props: SnackBarWithId) {
  if (props.rightAction === 'none') {
    return <div className={snackBarWrapperCss}>{props.message}</div>;
  }
  if (props.rightAction === 'icon') {
    return (
      <div className={snackBarWrapperCss}>
        {props.message}
        <Icon name={props.iconName} color={'text.primary'} />
      </div>
    );
  }
  return (
    <div className={snackBarWrapperCss}>
      <div>SnackBar</div>
    </div>
  );
}

const snackBarWrapperCss = css({
  padding: '16px 24px',
  justifyContent: 'center',
  textStyle: 'subtitle5',
  color: 'text.secondary',
  backdropFilter: 'blur(20px)',
  boxShadow: '0px 5px 50px 4px rgba(92, 78, 122, 0.30) inset',
  background: 'rgba(32, 30, 40, 0.90)',
  borderRadius: '24px',
});

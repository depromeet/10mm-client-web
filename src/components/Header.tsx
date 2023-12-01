import Icon from '@/components/Icon';
import { css } from '@styled-system/css';

const Header = () => {
  return (
    <div
      className={css({
        fontSize: '2xl',
        fontWeight: 'bold',
      })}
    >
      <h1>
        <Icon name="left-arrow" />
      </h1>
    </div>
  );
};

export default Header;

import { css } from '@styled-system/css';

const Header = () => {
  return (
    <div
      className={css({
        fontSize: '2xl',
        fontWeight: 'bold',
      })}
    >
      <h1>Header</h1>
    </div>
  );
};

export default Header;

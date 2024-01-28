'use client';
import { type ComponentProps } from 'react';
import Icon from '@/components/Icon';
import { css, cx } from '@/styled-system/css';

interface Props extends Omit<ComponentProps<'input'>, 'onChange'> {
  onChange: (value: string) => void;
}

function SearchBar({ onChange, ...props }: Props) {
  const onClick = () => {
    onChange('');
  };

  return (
    <div className={containerCss}>
      <Icon name="navigation-search" size={16} className={searchIconCss} color="icon.tertiary" />
      <input type="search" className={inputCss} onChange={(e) => onChange(e.target.value)} {...props}></input>
      <Icon
        onClick={onClick}
        name="close-circle"
        size={22}
        className={cx('delete-icon', iconCss)}
        color="icon.tertiary"
      />
    </div>
  );
}

export default SearchBar;

const containerCss = css({
  position: 'relative',

  '& .delete-icon': {
    display: 'none',
  },
  '&:hover': {
    '& .delete-icon': {
      display: 'block',
    },
  },
});

const inputCss = css({
  borderRadius: '16px',
  border: '1px solid gray.gray100',
  borderColor: 'gray.gray100',
  backgroundColor: 'bg.surface1',
  padding: '15px 38px',
  outline: 'none',
  color: 'text.secondary',
  width: '100%',
  '&::placeholder': {
    color: 'text.placeholder',
  },
});

const searchIconCss = css({
  position: 'absolute',
  left: '16px',
  top: 0,
  bottom: 0,
  margin: 'auto',
});

const iconCss = css({
  position: 'absolute',
  right: '16px',
  top: 0,
  bottom: 0,
  margin: 'auto',
  //   pointerEvents: 'none',
});

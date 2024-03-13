import { type ComponentProps } from 'react';
import Image from 'next/image';
import BottomSheet from '@/components/BottomSheet/BottomSheet';
import Header from '@/components/Header/Header';
import Icon from '@/components/Icon';
import { type DropDownInputType, type DropdownValueType } from '@/components/Input/Input.types';
import useToggle from '@/hooks/useToggle';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

function DropdownInput<Value extends string = string>(props: DropDownInputType<Value>) {
  const [isCategoryShowing, toggleCategoryShowing] = useToggle();

  const onClick = (item: DropdownValueType<Value>) => {
    props.onSelect(item);
  };

  return (
    <div>
      <h3>
        <span className={titleCss}>{props.title}</span>
        {props.required && <span className={asterisk}>*</span>}
      </h3>
      <div className={selectWrapperCss} onClick={toggleCategoryShowing}>
        <div className={textWrapperCss}>
          {props.selected ? (
            <p className={labelCss}>
              {props.selected.imgUrl && (
                <Image src={props.selected.imgUrl} alt={props.selected.value} width={22} height={22} />
              )}
              {props.selected.label}
            </p>
          ) : (
            <p className={placeholderCss}>{props.placeholder}</p>
          )}
        </div>
        <Icon name={'input-arrow-down'} color={'icon.secondary'} className={iconCss} />
      </div>
      <Dropdown<Value>
        isShowing={isCategoryShowing}
        onClickOutside={toggleCategoryShowing}
        selected={props.selected}
        onClick={onClick}
        list={props.list}
        title={props.title}
      />
    </div>
  );
}

export default DropdownInput;

const selectWrapperCss = css({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottomWidth: '1px',
  borderColor: 'border.default',
  marginBottom: '36px',
  cursor: 'pointer',
});

const titleCss = css({
  marginTop: '36px',
  textStyle: 'body4',
  color: 'text.primary',
});

const textWrapperCss = css({
  width: '100%',
  textStyle: 'subtitle3',
  padding: '14px 4px',
  borderColor: 'border.default',
});

const labelCss = flex({ color: 'text.secondary', gap: '8px', alignItems: 'center' });
const placeholderCss = css({ color: 'text.placeholder' });

const iconCss = css({
  cursor: 'pointer',
});

const asterisk = css({
  color: 'red.red500',
  fontWeight: 'bold',
  marginLeft: '2px',
});

interface DropdownProps<T extends string>
  extends Omit<ComponentProps<typeof BottomSheet>, 'headerElement'>,
    Pick<DropDownInputType<T>, 'selected' | 'list'> {
  onClick: (item: DropdownValueType<T>) => void;
  title: string;
}

function Dropdown<T extends string>(props: DropdownProps<T>) {
  return (
    <BottomSheet
      headerElement={
        <Header
          rightAction="text-button"
          title={props.title}
          rightButtonProps={{
            onClick: props.onClickOutside,
          }}
        />
      }
      {...props}
    >
      <ul className={dropdownListCss}>
        {props.list.map((item) => (
          <li key={item.value} className={dropdownItemCss} onClick={() => props.onClick(item)}>
            <div>
              {item.imgUrl && (
                <div className={imageWrapperCss}>
                  <Image src={item.imgUrl} alt={item.value} fill />
                </div>
              )}
              <div>{item.label}</div>
            </div>
            <div>{props.selected?.value === item.value && <Icon name="check-circle" color="purple.purple700" />}</div>
          </li>
        ))}
      </ul>
    </BottomSheet>
  );
}

const dropdownListCss = css({
  width: '100%',
});

const dropdownItemCss = css({
  position: 'relative',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '12px 16px',
  color: 'text.secondary',
  textStyle: 'subtitle3',
  height: '46px',
  cursor: 'pointer',

  '& div': {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
  },
});

const imageWrapperCss = css({
  position: 'relative',
  width: '28px',
  height: '28px',
});

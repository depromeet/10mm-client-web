import { type ComponentProps } from 'react';
import Link from 'next/link';
import { buttonStyle } from '@/components/Button/Button';
import { styled } from '@/styled-system/jsx';

interface Props extends ComponentProps<typeof LinkButtonStyle> {
  disabled?: boolean;
}

function LinkButton({ disabled, ...props }: Props) {
  return (
    <LinkButtonStyle
      style={{
        pointerEvents: disabled ? 'none' : 'auto',
        filter: disabled ? 'brightness(0.4)' : '',
      }}
      {...props}
    />
  );
}

export default LinkButton;

const LinkButtonStyle = styled(Link, buttonStyle);

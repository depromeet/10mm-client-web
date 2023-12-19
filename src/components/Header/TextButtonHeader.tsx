import { type ComponentProps } from 'react';
import Button from '@/components/Button/Button';
import Header from '@/components/Header/Header';

interface Props extends Omit<ComponentProps<typeof Header>, 'rightElement'> {
  rightButtonText?: string;
}

function TextButtonHeader({ rightButtonText = '완료', ...props }: Props) {
  return (
    <Header
      rightElement={
        <Button variant="ghost" size="medium">
          {rightButtonText}
        </Button>
      }
      {...props}
    />
  );
}

export default TextButtonHeader;

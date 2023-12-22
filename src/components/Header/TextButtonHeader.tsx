import { type ComponentProps } from 'react';
import Button from '@/components/Button/Button';
import Header from '@/components/Header/Header';

interface Props extends Omit<ComponentProps<typeof Header>, 'rightElement'> {
  rightButtonText?: string;
  onButtonClick?: () => void;
}

function TextButtonHeader({ rightButtonText = '완료', onButtonClick, ...props }: Props) {
  return (
    <Header
      rightElement={
        <Button variant="ghost" size="medium" onClick={onButtonClick}>
          {rightButtonText}
        </Button>
      }
      {...props}
    />
  );
}

export default TextButtonHeader;

import Button from '@/components/Button/Button';
import { type TextButtonHeaderType } from '@/components/Header/Header.types';
import HeaderBase from '@/components/Header/HeaderBase';

function TextButtonHeader({ rightButtonText = '완료', rightButtonProps, ...props }: TextButtonHeaderType) {
  return (
    <HeaderBase
      rightElement={
        <Button variant="ghost" size="medium" {...rightButtonProps}>
          {rightButtonText}
        </Button>
      }
      {...props}
    />
  );
}

export default TextButtonHeader;

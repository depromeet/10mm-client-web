import Button from '@/components/Button/Button';

import { type TextButtonHeaderType } from './Header.types';
import HeaderBase from './HeaderBase';

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

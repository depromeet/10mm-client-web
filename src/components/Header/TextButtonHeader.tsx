import { type ComponentProps } from 'react';
import Button from '@/components/Button/Button';
import Header from '@/components/Header/Header';

interface Props extends Omit<ComponentProps<typeof Header>, 'rightElement'> {
  rightButtonText: string;
}

function TextButtonHeader({ rightButtonText, ...props }: Props) {
  return (
    <Header
      rightElement={
        <Button variant="ghost" size="medium">
          완료
        </Button>
      }
      {...props}
    />
  );
}

export default TextButtonHeader;

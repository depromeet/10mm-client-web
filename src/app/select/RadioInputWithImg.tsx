import Image from 'next/image';
import RadioInput, { type RadioInputProps } from '@/app/select/RadioInput';
import { css } from '@styled-system/css';

interface RadioInputWithEmojiProps extends RadioInputProps {
  imgSrc: string;
  label: string;
}

export default function RadioInputWithImg({ imgSrc, label, ...props }: RadioInputWithEmojiProps) {
  return (
    <RadioInput {...props}>
      <Image src={imgSrc} width={36} height={36} alt={label} className={emojiBoxCss} />
      {label}
    </RadioInput>
  );
}

const emojiBoxCss = css({
  marginRight: '8px',
});

import Image from 'next/image';
import RadioInput from '@/app/select/RadioInput';
import { css } from '@styled-system/css';

export default function RadioInputWithImg({
  imgSrc,
  label,
  ...props
}: {
  imgSrc: string;
  label: string;
  name: string;
  value: string;
}) {
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

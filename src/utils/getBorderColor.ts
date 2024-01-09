export const getBorderColor = (errorMsg: string | undefined, isFocused: boolean): string => {
  if (isFocused) {
    return 'purple.purple500';
  }

  if (errorMsg) {
    return 'red.red500';
  }

  return 'border.default';
};

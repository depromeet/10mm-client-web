import { flex } from '@/styled-system/patterns';

export const reactionBarContainerCss = flex({
  position: 'relative',
  backgroundColor: 'bg.surface3',
  padding: '0 12px',
  borderRadius: '16px',
  gap: '16px',
});

export const titleSectionCss = flex({
  lineHeight: '41px',
  gap: '4px',
  textStyle: 'body4',
  alignItems: 'center',
});

import { type ReactNode } from 'react';
import { stagger } from '@/components/Motion/Motion.constants';
import StaggerWrapper from '@/components/Motion/StaggerWrapper';
import { flex } from '@/styled-system/patterns';

function MissionListContainer({ children }: { children: ReactNode }) {
  return (
    <StaggerWrapper wrapperOverrideCss={listCss} staggerVariants={stagger(0.02)}>
      {children}
    </StaggerWrapper>
  );
}

export default MissionListContainer;

const listCss = flex({
  flexDirection: 'column',
  flex: 1,

  gap: '8px',
  height: '100%',
});

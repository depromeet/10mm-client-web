'use client';

import Graph from '@/components/Graph/Graph';
import { getLevel } from '@/utils/result';

interface Props {
  symbolStack: number;
  viewLevel: number;
}

function LevelStatus({ viewLevel, ...props }: Props) {
  const currentLevel = getLevel(props.symbolStack);

  if (currentLevel.isFinal) {
    return <Graph status="last-level" {...props} />;
  }

  if (currentLevel.level === viewLevel) {
    return <Graph status="present-level" {...props} />;
  }

  if (currentLevel.level < viewLevel) {
    return <Graph status="future-level" level={viewLevel} {...props} />;
  }

  if (currentLevel.level > viewLevel) {
    return <Graph status="past-level" level={viewLevel} {...props} />;
  }

  //   return (
  //     <section className={containerCss}>
  //       <div className={levelWrapperCss}>
  //         <div className={symbolContainerCss}>
  //           <TenMMSymbol />
  //         </div>
  //         {/* <Image src="/assets/icons/10mm-symbol-fill.svg" alt="10mm symbol fill" width={16} height={16} /> */}
  //         <span className={cx(levelLabelCss, gradientTextCss)}>{props.symbolStack}</span>
  //       </div>
  //       <p className={levelTextWrapperCss}>{viewLevel.label}</p>
  //       <LevelProgressBar current={props.symbolStack} isLabel={!viewLevel.isFinal} {...viewLevel} />
  //     </section>
  //   );
}

export default LevelStatus;

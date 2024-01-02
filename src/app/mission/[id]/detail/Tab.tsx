import { type ReactNode } from 'react';
import TabItem from '@/app/mission/[id]/detail/TabItem';
import { css } from '@styled-system/css';

/**
 * 기능은 없고 UI만 만들어놓은 컴포넌트, 준호가 만들어준 Tab 컴포넌트로 나중에 교체
 */
function Tab({
  tabs,
}: {
  tabs: {
    label: string;
    component: ReactNode;
  }[];
}) {
  const renderTabItem = tabs[0].component;
  return (
    <div className={tabContainerCss}>
      <div className={tabLabelCss}>
        {tabs.map(({ label }) => (
          <TabItem label={label} status={'active'} key={label} />
        ))}
      </div>
      <div className={tabWrapperCss}>{renderTabItem}</div>
    </div>
  );
}

export default Tab;

const tabContainerCss = css({
  height: '100%',
});

const tabWrapperCss = css({
  height: 'calc(100% - 44px)',
  overflowY: 'scroll',
  _scrollbar: {
    display: 'none',
  },
});

const tabLabelCss = css({
  display: 'flex',
  flexDirection: 'row',
  gap: '8px',
  padding: '16px 16px 0px 16px',
});

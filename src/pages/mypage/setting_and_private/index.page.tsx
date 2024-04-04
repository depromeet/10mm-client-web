import Header from '@/components/Header/Header';

import MenuList from './MenuList';

function SettingAndPrivatePage() {
  return (
    <>
      <Header isBackIcon={true} rightAction="none" title="설정 및 개인정보" />
      <main>
        <MenuList />
      </main>
    </>
  );
}

export default SettingAndPrivatePage;

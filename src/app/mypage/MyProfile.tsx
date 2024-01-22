import Badge from '@/components/Badge/Badge';
import Banner from '@/components/Banner/Banner';
import Tab from '@/components/Tab/Tab';
import { MISSION_CATEGORY_LABEL } from '@/constants/mission';
import { css } from '@/styled-system/css';
import { getLevel } from '@/utils/result';

const FOLLOWING = '132';
const FOLLOWER = '181';
const tabs = [
  {
    tabName: '미션 목록',
    id: 'mission-list',
  },
];
const DUMMY_SYMBOL_STACK = 90;
const currentLevel = getLevel(DUMMY_SYMBOL_STACK);
export default function MyProfile() {
  return (
    <div className={containerCss}>
      <section className={myTabContainerCss}>
        <div className={myTabCss}>
          <div>
            <p className={userNameCss}>당근조이</p>
            <span className={followerTabCss}>
              팔로잉 {FOLLOWING} &nbsp; 팔로워 {FOLLOWER}
            </span>
          </div>
          <Badge color="gray">프로필 수정</Badge>
        </div>
        <Banner type="level" amount={210} iconName="alarm" level="Lv 4. 잼민이" imageUrl={currentLevel.imageUrl} />
        <Tab tabs={tabs} activeTab={'mission-list'} />;{/* <MissionList /> */}
      </section>
    </div>
  );
}
const containerCss = css({});

const myTabContainerCss = css({
  width: '100%',
  // position: 'absolute',
  // top: '184px',
  marginTop: '184px',
  height: '100vh',
  backgroundColor: 'bg.surface2',
  borderTopRightRadius: '28px',
  borderTopLeftRadius: '28px',
  padding: '0px 24px',
});
const userNameCss = css({
  color: 'text.primary',
  fontSize: 'subtitle2',
  fontWeight: 'semibold',
});
const followerTabCss = css({
  color: 'text.secondary',
  marginTop: '6px',
});

const myTabCss = css({
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
});

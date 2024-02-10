import { useGetMissionSummaryList } from '@/apis/result';
import MissionBadge from '@/app/home/MissionBadge';
import { TwoLineListItem } from '@/components/ListItem';
import MotionDiv from '@/components/Motion/MotionDiv';
import { MISSION_CATEGORY_LABEL } from '@/constants/mission';
import { css } from '@/styled-system/css';

interface Props {
  selectDate: string;
}
function MissionList(props: Props) {
  const { data: selectSummaryListData } = useGetMissionSummaryList(props.selectDate);

  return (
    <section className={sectionCss}>
      <div className={infoWrapperCss}>
        <div>
          <span>
            <b>전체</b>
          </span>
          <span>
            <b>{selectSummaryListData?.missionAllCount ?? 0}</b>
          </span>
        </div>
        <div>
          <span>성공</span>
          <span>{selectSummaryListData?.missionCompleteCount ?? 0}</span>
        </div>
        <div>
          <span>미완료</span>
          <span>{selectSummaryListData?.missionNoneCount ?? 0}</span>
        </div>
      </div>
      <MotionDiv key={props.selectDate}>
        <ul>
          {selectSummaryListData?.missionList.map((item) => (
            <TwoLineListItem
              key={item.missionId}
              badgeElement={<MissionBadge status={item.missionStatus} />}
              name={item.name}
              subName={MISSION_CATEGORY_LABEL[item.category].label}
              imageUrl={MISSION_CATEGORY_LABEL[item.category].imgUrl}
              isBackground={false}
            />
          ))}
        </ul>
      </MotionDiv>
    </section>
  );
}

export default MissionList;

const sectionCss = css({
  backgroundColor: 'bg.surface1',
  borderRadius: '20px',
  padding: '20px',
  marginTop: '10px',
});

const infoWrapperCss = css({
  display: 'flex',
  gap: '8px',
  marginBottom: '12px',

  '& div': {
    display: 'flex',
    gap: '4px',
  },
  '& span': {
    textStyle: 'body4',
    color: 'text.secondary',
  },
  '& b': {
    color: 'purple.purple700',
  },
});

const listCss = css({});

import { useGetMissionSummaryList } from '@/apis/result';
import { css } from '@/styled-system/css';

interface Props {
  selectDate: string;
}
function MissionList(props: Props) {
  const { data: selectSummaryListData } = useGetMissionSummaryList(props.selectDate);
  console.log('data: ', selectSummaryListData);

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
          <span>전체</span>
          <span>{selectSummaryListData?.missionAllCount ?? 0}</span>
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
    </section>
  );
}

export default MissionList;

const sectionCss = css({
  backgroundColor: 'bg.surface1',
  borderRadius: '20px',
  padding: '20px',
});

const infoWrapperCss = css({
  display: 'flex',
  gap: '8px',

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

'use client';
import { useMemo } from 'react';
import { useParams } from 'next/navigation';
import { useGetRecordDetail } from '@/apis';
import MyReactionBar from '@/components/ReactionBar/MyReactionBar/MyReactionBar';
import { css } from '@styled-system/css';
import dayjs from 'dayjs';

import HistoryThumbnail from './HistoryThumbnail';

function MissionRecordDetail() {
  const params = useParams();

  const recordId = params.id as string;
  const { data } = useGetRecordDetail(recordId);

  const { sinceDay, imageUrl, remark, duration, startedAt: missionDate } = data;

  const dateText = useMemo(() => dayjs(missionDate).format('YYYY년 MM월 DD일'), [missionDate]);

  return (
    <section className={missionHistorySectionCss}>
      <div className={sectionTitleCss}>
        <span className={textSecondaryColorCss}>{dateText}</span>
        <span className={textTertiaryColorCss}>{sinceDay}일차</span>
      </div>
      <HistoryThumbnail imageUrl={imageUrl} missionDuration={duration} />
      <span className={textSecondaryColorCss}>{remark}</span>

      <MyReactionBar recordId={Number(recordId)} />
    </section>
  );
}
export default MissionRecordDetail;

const sectionTitleCss = css({
  display: 'flex',
  justifyContent: 'space-between',
});

const missionHistorySectionCss = css({
  padding: '32px 16px 0 16px',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  textStyle: 'body1',
});

const textSecondaryColorCss = css({
  color: 'text.secondary',
});

const textTertiaryColorCss = css({
  color: 'text.tertiary',
});

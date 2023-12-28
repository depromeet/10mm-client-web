export const formatMMSS = (second: number) => {
  const minutes = Math.floor(second / 60); // 분 계산
  const seconds = second % 60; // 초 계산
  const formattedMinutes = String(minutes).padStart(2, '0'); // 두 자리로 변환
  const formattedSeconds = String(seconds).padStart(2, '0'); // 두 자리로 변환

  return {
    minutes,
    seconds,
    formattedMinutes,
    formattedSeconds,
  };
};

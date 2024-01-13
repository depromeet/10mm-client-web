import { useEffect, useRef } from 'react';

function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef<() => void | null>(); // 클로저 역할을 해주는 useRef. 렌더를 해도 초기화 되지 않는다.

  // callback(setCount)가 변경될 때를 useEffect가 감지해서 최신상태를 저장한다.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // 인터벌과 클리어 세팅
  useEffect(() => {
    function tick() {
      if (savedCallback.current !== null && savedCallback.current) {
        savedCallback.current();
      }
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id); // 바로바로 클리어를 해주기 때문에 메모리를 차지하지 않는다.
    }
  }, [delay]);
}

export default useInterval;

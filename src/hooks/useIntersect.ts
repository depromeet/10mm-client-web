import { useCallback, useEffect, useRef } from 'react';

//https://tech.kakaoenterprise.com/149
interface IntersectionObserverInit {
  /**
   * target의 가시성을 확인할 때 사용되는 상위 속성 이름- null 입력 시, 기본값으로 브라우저의 Viewport가 설정됨
   */
  root?: Element | Document | null;
  /**
   * root에 마진값을 주어 범위를 확장 가능
   */
  rootMargin?: string;
  /**
   * 콜백이 실행되기 위해 target의 가시성이 얼마나 필요한지 백분율로 표시
   */
  threshold?: number | number[];
}

type IntersectHandler = (entry: IntersectionObserverEntry, observer: IntersectionObserver) => void;

const useIntersect = (onIntersect: IntersectHandler, options?: IntersectionObserverInit) => {
  const ref = useRef<HTMLDivElement>(null);
  const callback = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) onIntersect(entry, observer);
      });
    },
    [onIntersect],
  );

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(callback, options);
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, options, callback]);

  return ref;
};

export default useIntersect;

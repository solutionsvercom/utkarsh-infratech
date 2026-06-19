import { useEffect, useState } from 'react';

/** True when viewport is below Tailwind's `md` breakpoint (mobile / small tablet). */
export function useIsMobileViewport() {
  const query = '(max-width: 767px)';

  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = (event) => setIsMobile(event.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return isMobile;
}

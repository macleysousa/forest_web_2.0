'use client';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { Loading } from './Loading';

const isSameURL = (target: URL, current: URL) => {
  const clean = (url: URL) => url.protocol + '//' + url.host + url.pathname;
  const cleanTarget = clean(target);
  const cleanCurrent = clean(current);
  return cleanTarget === cleanCurrent;
};

export function ProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const loadingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (loadingRef.current) loadingRef.current.hidden = true;
  }, [pathname, searchParams]);

  useEffect(() => {
    const handleAnchorClick = (event: MouseEvent) => {
      const anchorElement = event.currentTarget as HTMLAnchorElement;
      if (anchorElement.target === '_blank') return;
      if (event.metaKey || event.ctrlKey) return;

      const targetUrl = new URL(anchorElement.href);
      const currentUrl = new URL(location.href);

      if (isSameURL(targetUrl, currentUrl)) return;
      if (targetUrl?.href === currentUrl?.href) return;

      if (!loadingRef.current) return;
      loadingRef.current.hidden = false;
    };

    const handleMutation: MutationCallback = () => {
      const anchors = Array.from(document.querySelectorAll('a'));
      const valid = anchors.filter((a) => a.href && a.target !== '_blank');
      for (const a of valid) a.addEventListener('click', handleAnchorClick);
    };

    const mutationObserver = new MutationObserver(handleMutation);
    mutationObserver.observe(document, { childList: true, subtree: true });

    window.history.pushState = new Proxy(window.history.pushState, {
      apply: (
        target,
        thisArg,
        argArray: [any, string, string | URL | null | undefined],
      ) => {
        if (loadingRef.current) loadingRef.current.hidden = true;
        return target.apply(thisArg, argArray);
      },
    });
  }, []);

  return <Loading ref={loadingRef} />;
}

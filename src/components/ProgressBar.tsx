'use client';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Window {
    __progress: { start: () => void; stop: () => void };
  }
}

const isSameURL = (target: URL, current: URL) => {
  const clean = (url: URL) => url.protocol + '//' + url.host + url.pathname;
  const cleanTarget = clean(target);
  const cleanCurrent = clean(current);
  return cleanTarget === cleanCurrent;
};

const createProgress = (): Window['__progress'] => {
  let value = 50;
  let timeoutId: NodeJS.Timeout | null = null;

  const element = window.document.createElement('div');
  element.style.position = 'fixed';
  element.style.height = '4px';
  element.style.background = 'var(--chakra-colors-blue-500)';
  element.style.width = '0%';
  element.style.top = '0px';
  window.document.body.appendChild(element);

  const setValue = (newValue: number) => {
    value = newValue;
    element.style.width = `${value}%`;
  };

  const increment = () => {
    setValue(value + 5);
  };

  const work = () => {
    if (value === 0) return;
    if (value === 100) return;
    increment();
    timeoutId = setTimeout(() => work(), 200);
  };

  return {
    start: () => {
      increment();
      timeoutId = setTimeout(() => work(), 100);
    },

    stop: () => {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }

      if (value > 0) setValue(0);
    },
  };
};

export function ProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (window.__progress === undefined) window.__progress = createProgress();
    window.__progress.stop();
  }, [pathname, searchParams]);

  useEffect(() => {
    if (window.__progress === undefined) window.__progress = createProgress();

    const handleAnchorClick = (event: MouseEvent) => {
      const anchorElement = event.currentTarget as HTMLAnchorElement;
      if (anchorElement.target === '_blank') return;
      if (event.metaKey || event.ctrlKey) return;

      const targetUrl = new URL(anchorElement.href);
      const currentUrl = new URL(location.href);

      if (isSameURL(targetUrl, currentUrl)) return;
      if (targetUrl?.href === currentUrl?.href) return;

      window.__progress.start();
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
        window.__progress.stop();
        return target.apply(thisArg, argArray);
      },
    });
  }, []);

  return null;
}

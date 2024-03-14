import { useToast } from '@chakra-ui/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { createContext, useContext, useEffect, useRef } from 'react';
import { Loading } from '../components/Loading';

type RouterContextType = {
  pathname: string;
  push: (url: string) => void;
};

const RouterContext = createContext(null as unknown as RouterContextType);

type RouterContextProviderProps = {
  children: React.ReactNode;
};

const isSameURL = (target: URL, current: URL) => {
  const clean = (url: URL) => url.protocol + '//' + url.host + url.pathname;
  const cleanTarget = clean(target);
  const cleanCurrent = clean(current);
  return cleanTarget === cleanCurrent;
};

export function RouterContextProvider({
  children,
}: RouterContextProviderProps) {
  const toast = useToast();
  const router = useRouter();
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
  }, []);

  useEffect(() => {
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

  const push = (url: string) => {
    if (pathname === url) {
      toast({ status: 'info', title: 'Você já está nessa página' });
      return;
    }

    if (loadingRef.current) {
      loadingRef.current.hidden = false;
    }

    console.log('router.push', url);

    router.push(url);
  };

  return (
    <RouterContext.Provider value={{ pathname, push }}>
      {children}
      <Loading ref={loadingRef} />
    </RouterContext.Provider>
  );
}

export function useRouterContext() {
  return useContext(RouterContext);
}

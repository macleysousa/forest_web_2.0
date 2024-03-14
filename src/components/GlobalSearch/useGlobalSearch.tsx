'use client';
import { useEffect, useState } from 'react';
import { options } from '../../configs/sidebar';
import { useRouterContext } from '../../contexts/RouterContext';
import type { OptionType } from './index';
import type { SingleValue } from 'react-select';

const selectOptions = options.flatMap((o) =>
  'path' in o
    ? { label: o.name, value: o.path }
    : o.items.map((i) => ({ label: `${o.name} / ${i.name}`, value: i.path })),
);

export function useGlobalSearch() {
  const { pathname, ...router } = useRouterContext();
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);

  const toggle = () => setOpen(!open);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        setOpen(true);
      }

      if (e.key === 'Escape') {
        e.preventDefault();
        setOpen(false);
      }
    };

    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, []);

  const handleChange = (option: SingleValue<OptionType>) => {
    if (!option) return;
    setPending(true);
    if (option.value === pathname) return window.location.reload();
    router.push(option.value);
  };

  return { handleChange, open, options: selectOptions, pending, toggle };
}

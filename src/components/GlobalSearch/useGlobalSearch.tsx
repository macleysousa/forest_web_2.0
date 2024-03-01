'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BiSolidFactory } from 'react-icons/bi';
import { IoBagCheckSharp } from 'react-icons/io5';

import {
  MdAssignmentInd,
  MdContacts,
  MdDashboard,
  MdDirectionsCar,
  MdInsertChart,
  MdPaid,
  MdPinDrop,
  MdSettings,
  MdStars,
} from 'react-icons/md';

import type { OptionType } from './index';
import type { SingleValue } from 'react-select';

const options = [
  {
    icon: MdDashboard,
    id: Math.random().toString(36).substring(2),
    name: 'Dashboard',
    path: '/dashboard',
  },
  {
    icon: MdInsertChart,
    id: Math.random().toString(36).substring(2),
    name: 'Painel Gerencial',
    path: '/management-panel',
  },
  {
    icon: MdContacts,
    id: Math.random().toString(36).substring(2),
    name: 'Clientes',
    path: '/clients',
  },
  {
    icon: MdPaid,
    id: Math.random().toString(36).substring(2),
    name: 'Notas Fiscais',
    path: '/invoices',
  },
  {
    icon: MdPinDrop,
    id: Math.random().toString(36).substring(2),
    items: [
      {
        id: Math.random().toString(36).substring(2),
        name: 'Pedidos',
        path: '/mobile/order-details',
      },
      {
        id: Math.random().toString(36).substring(2),
        name: 'Visitas',
        path: '/mobile/visits',
      },
      {
        id: Math.random().toString(36).substring(2),
        name: 'Mapa de Visitas',
        path: '/mobile/visits-map',
      },
      {
        id: Math.random().toString(36).substring(2),
        name: 'Estoque Cliente',
        path: '/mobile/client-stock',
      },
      {
        id: Math.random().toString(36).substring(2),
        name: 'Estoque Distrubuidor',
        path: '/mobile/distributor-stock',
      },
    ],
    name: 'Mobile',
  },
  {
    icon: IoBagCheckSharp,
    id: Math.random().toString(36).substring(2),
    items: [
      {
        id: Math.random().toString(36).substring(2),
        name: 'Planejamento Clientes',
        path: '/customer-planning',
      },
      {
        id: Math.random().toString(36).substring(2),
        name: 'Planejamento Roteiros',
        path: '/visitas',
      },
    ],
    name: 'Planejamentos',
  },
  {
    icon: MdStars,
    id: Math.random().toString(36).substring(2),
    items: [
      {
        id: Math.random().toString(36).substring(2),
        name: 'Lista de Produtos',
        path: '/products',
      },
      {
        id: Math.random().toString(36).substring(2),
        name: 'Tabela de Preços Padrão',
        path: '/standard-pricing-table',
      },
      {
        id: Math.random().toString(36).substring(2),
        name: 'Tabela de Preços Clientes',
        path: '/clients-pricing-table',
      },
      {
        id: Math.random().toString(36).substring(2),
        name: 'Tabela de Preços Grupo',
        path: '/group-pricing-table',
      },
      {
        id: Math.random().toString(36).substring(2),
        name: 'Solicitação Preço',
        path: '/estoque-de-clientes',
      },
      {
        id: Math.random().toString(36).substring(2),
        name: 'Aprovações',
        path: '/estoque-de-clientes',
      },
    ],
    name: 'Produtos',
  },
  {
    icon: BiSolidFactory,
    id: Math.random().toString(36).substring(2),
    items: [
      {
        id: Math.random().toString(36).substring(2),
        name: 'Pedidos',
        path: '/factory/orders',
      },
      {
        id: Math.random().toString(36).substring(2),
        name: 'Novos Pedidos',
        path: '/factory/new-orders',
      },
      {
        id: Math.random().toString(36).substring(2),
        name: 'Estoque PPS',
        path: '/factory/pps-stock',
      },
    ],
    name: 'Fábrica',
  },
  {
    icon: MdDirectionsCar,
    id: Math.random().toString(36).substring(2),
    name: 'Pedidos Parceiros',
    path: '/partners-orders',
  },
  {
    icon: MdAssignmentInd,
    id: Math.random().toString(36).substring(2),
    name: 'Usuários',
    path: '/users',
  },
  {
    icon: MdSettings,
    id: Math.random().toString(36).substring(2),
    name: 'Ferramentas',
    path: '/tools',
  },
];

const selectOptions = options.flatMap((option) => {
  if (option.path) {
    return {
      label: option.name,
      value: option.path,
    };
  }

  if (option.items) {
    return option.items.map((item) => ({
      label: `${option.name} / ${item.name}`,
      value: item.path,
    }));
  }

  throw new Error('invalid option');
});

export function useGlobalSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);

  const toggle = () => setOpen(!open);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        setOpen(true);
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

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

import type { IconType } from 'react-icons';

/* eslint-disable prettier/prettier */
export type Option = { icon: IconType; id: string; name: string } & (
  | { path: string }
  | { items: Array<{ id: string; name: string; path: string }>; rootPath: string }
);
/* eslint-enable prettier/prettier */

export const options: Option[] = [
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
    rootPath: '/mobile',
  },
  {
    icon: IoBagCheckSharp,
    id: Math.random().toString(36).substring(2),
    items: [
      {
        id: Math.random().toString(36).substring(2),
        name: 'Planejamento Clientes',
        path: '/planning/customer-planning',
      },
      {
        id: Math.random().toString(36).substring(2),
        name: 'Planejamento Roteiros',
        path: '/planning/routes-planning',
      },
    ],
    name: 'Planejamentos',
    rootPath: '/planning',
  },
  {
    icon: MdStars,
    id: Math.random().toString(36).substring(2),
    items: [
      {
        id: Math.random().toString(36).substring(2),
        name: 'Lista de Produtos',
        path: '/products/products-list',
      },
      {
        id: Math.random().toString(36).substring(2),
        name: 'Tabela de Preços Padrão',
        path: '/products/standard-pricing-table',
      },
      {
        id: Math.random().toString(36).substring(2),
        name: 'Tabela de Preços Clientes',
        path: '/products/clients-pricing-table',
      },
      {
        id: Math.random().toString(36).substring(2),
        name: 'Tabela de Preços Grupo',
        path: '/products/group-pricing-table',
      },
      {
        id: Math.random().toString(36).substring(2),
        name: 'Solicitação Preço',
        path: '/products/estoque-de-clientes',
      },
      {
        id: Math.random().toString(36).substring(2),
        name: 'Aprovações',
        path: '/products/estoque-de-clientes',
      },
    ],
    name: 'Produtos',
    rootPath: '/products',
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
    rootPath: '/factory',
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

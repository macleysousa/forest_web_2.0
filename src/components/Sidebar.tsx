import { Link } from '@chakra-ui/next-js';

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Center,
  Icon,
  Image,
  VStack,
} from '@chakra-ui/react';

import { usePathname } from 'next/navigation';
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

type Option = { icon: IconType; id: string; name: string } & (
  | { path: string }
  | { items: Array<{ id: string; name: string; path: string }> }
);

const options: Option[] = [
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
    path: '/customers',
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

export function Sidebar() {
  const pathname = usePathname();

  return (
    <Box
      bg="#110834"
      color="#bcbcbc"
      height="100dvh"
      minW="16rem"
      overflowY="scroll"
      css={{
        '&::-webkit-scrollbar': {
          width: '4px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#636363',
          borderRadius: '24px',
        },
        '&::-webkit-scrollbar-track': {
          mr: '3px',
          width: '6px',
        },
      }}
    >
      <Center m="1rem 0 2rem 0">
        <Image
          alt="petroplus logo"
          src="/petroplus.png"
          w="8rem"
        />
      </Center>
      <VStack
        align="left"
        gap="1rem"
        padding="0 1rem"
      >
        {options.map((option) =>
          'path' in option ? (
            <Button
              key={option.id}
              as={Link}
              bg="transparent"
              color="white"
              fontSize="md"
              gap={3}
              h="3.25rem"
              href={option.path}
              isActive={pathname.startsWith(option.path)}
              justifyContent="flex-start"
              lineHeight="shorter"
              px={3}
              _active={{
                bg: '#1d1242',
                color: 'blue.500',
                textDecoration: 'none',
              }}
              _hover={{
                bg: '#1d1242',
                color: 'blue.500',
                textDecoration: 'none',
              }}
              leftIcon={
                <Icon
                  as={option.icon}
                  fontSize="2xl"
                />
              }
            >
              {option.name}
            </Button>
          ) : (
            <Accordion
              key={option.id}
              allowToggle
            >
              <AccordionItem
                borderWidth={0}
                sx={{ '&:last-of-type': { borderWidth: 0 } }}
              >
                <AccordionButton
                  color="white"
                  fontSize="md"
                  gap={3}
                  h="3.25rem"
                  lineHeight="shorter"
                  px={3}
                  _hover={{
                    bg: '#1d1242',
                    color: 'blue.500',
                    textDecoration: 'none',
                  }}
                >
                  <Icon
                    as={option.icon}
                    fontSize="2xl"
                  />
                  <Box
                    as="span"
                    flex="1"
                    textAlign="left"
                  >
                    {option.name}
                  </Box>
                  <AccordionIcon fontSize="2xl" />
                </AccordionButton>
                <AccordionPanel p={0}>
                  <VStack
                    align="left"
                    gap={0}
                    px={0}
                  >
                    {option.items.map((item) => (
                      <Button
                        key={item.id}
                        as={Link}
                        bg="transparent"
                        color="#a09cae"
                        fontSize="md"
                        gap={3}
                        h="2.5rem"
                        href={item.path}
                        isActive={pathname.startsWith(item.path)}
                        justifyContent="flex-start"
                        px={9}
                        _active={{
                          bg: '#1d1242',
                          color: 'blue.500',
                          textDecoration: 'none',
                        }}
                        _hover={{
                          bg: '#1d1242',
                          color: 'blue.500',
                          textDecoration: 'none',
                        }}
                      >
                        {item.name}
                      </Button>
                    ))}
                  </VStack>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          ),
        )}
      </VStack>
    </Box>
  );
}

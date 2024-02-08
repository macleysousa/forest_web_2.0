import { Center, VStack, Flex, Icon, Button, Text, Box, Image } from '@chakra-ui/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { IoBagCheckSharp } from 'react-icons/io5';
import {
  MdDashboard,
  MdContacts,
  MdPinDrop,
  MdStars,
  MdDirectionsCar,
  MdInsertChart,
  MdSettings,
  MdKeyboardArrowRight,
  MdPaid,
} from 'react-icons/md';

interface MenuOptions {
  options: {
    name: string;
    path: string;
  }[];
  open: boolean;
}

interface MenuOptionsMap {
  [key: string]: MenuOptions;
}

export default function Sidebar() {
  const pathname = usePathname();
  const setClassName = (path: string) =>
    'hover:bg-hover-blue hover:text-color-blue p-2 rounded-lg' +
    (pathname === path ? ' ' + 'bg-hover-blue text-color-blue' : '');

  const [menuOptions, setMenuOptions] = useState<MenuOptionsMap>({
    mobile: {
      options: [
        { name: 'Pedidos', path: '/mobile/order-details' },
        { name: 'Visitas', path: '/mobile/visits' },
        { name: 'Mapa de Visitas', path: '/mobile/visits-map' },
        { name: 'Estoque Cliente', path: '/mobile/client-stock' },
        { name: 'Estoque Distrubuidor', path: '/mobile/distributor-stock' },
      ],
      open: false,
    },
    planning: {
      options: [
        { name: 'Planejamento Clientes', path: '/pedidos' },
        { name: 'Planejamento Roteiros', path: '/visitas' },
      ],
      open: false,
    },
    products: {
      options: [
        { name: 'Lista de Produtos', path: '/pedidos' },
        { name: 'Tabela de Preços Padrão', path: '/visitas' },
        { name: 'Tabela de Preços Clientes', path: '/mapa-de-visitas' },
        { name: 'Tabela de Preços Grupo', path: '/estoque-de-clientes' },
        { name: 'Solicitação Preço', path: '/estoque-de-clientes' },
        { name: 'Aprovações', path: '/estoque-de-clientes' },
      ],
      open: false,
    },
  });

  const handleOpenMenuOption = (option: string) => () => {
    setMenuOptions((prevState) => ({
      ...prevState,
      [option]: { ...prevState[option], open: !prevState[option].open },
    }));
  };

  return (
    <Box bg="#110834" color="#bcbcbc" minW="16rem" height="100dvh">
      <Center m="1rem 0 2rem 0">
        <Image src="/petroplus.png" alt="petroplus logo" w="8rem" />
      </Center>
      <VStack align="left" padding="0 1rem" gap="1rem">
        <Link href="/dashboard" className={setClassName('/dashboard')}>
          <Flex align="center" gap="1rem">
            <Icon as={MdDashboard} />
            <Text>Dashboard</Text>
          </Flex>
        </Link>
        <Link href="/management-panel" className={setClassName('/management-panel')}>
          <Flex align="center" gap="1rem">
            <Icon as={MdInsertChart} />
            <Text>Painel Gerencial</Text>
          </Flex>
        </Link>
        <Link href="/clients" className={setClassName('/clients')}>
          <Flex align="center" gap="1rem">
            <Icon as={MdContacts} />
            <Text>Clientes</Text>
          </Flex>
        </Link>
        <Link href="/invoices" className={setClassName('/invoices')}>
          <Flex align="center" gap="1rem">
            <Icon as={MdPaid} />
            <Text>Notas Fiscais</Text>
          </Flex>
        </Link>
        <Button
          colorScheme="#bcbcbc"
          variant="link"
          justifyContent="left"
          onClick={handleOpenMenuOption('mobile')}
          className="hover:bg-hover-blue hover:text-color-blue p-2 rounded-lg"
        >
          <Flex align="center" gap="1rem" w="100%">
            <Icon as={MdPinDrop} />
            <Text>Mobile</Text>
            <Icon ml="auto" as={MdKeyboardArrowRight}></Icon>
          </Flex>
        </Button>
        {menuOptions.mobile.open && (
          <VStack align="left" padding="0 1rem" gap="1rem">
            {menuOptions.mobile.options.map((option, index) => (
              <Link href={option.path} key={index} className={setClassName(`/${option.name}`)}>
                <Flex align="center" gap=".5rem">
                  <Text>{option.name}</Text>
                </Flex>
              </Link>
            ))}
          </VStack>
        )}
        <Button
          colorScheme="#bcbcbc"
          variant="link"
          justifyContent="left"
          onClick={handleOpenMenuOption('planning')}
          className="hover:bg-hover-blue hover:text-color-blue p-2 rounded-lg"
        >
          <Flex align="center" gap="1rem" w="100%">
            <Icon as={IoBagCheckSharp} />
            <Text>Planejamentos</Text>
            <Icon ml="auto" as={MdKeyboardArrowRight}></Icon>
          </Flex>
        </Button>
        {menuOptions.planning.open && (
          <VStack align="left" padding="0 1rem" gap="1rem">
            {menuOptions.planning.options.map((option, index) => (
              <Link href={option.path} key={index} className={setClassName(`/${option.name}`)}>
                <Flex align="center" gap=".5rem">
                  <Text>{option.name}</Text>
                </Flex>
              </Link>
            ))}
          </VStack>
        )}
        <Button
          colorScheme="#bcbcbc"
          variant="link"
          justifyContent="left"
          onClick={handleOpenMenuOption('products')}
          className="hover:bg-hover-blue hover:text-color-blue p-2 rounded-lg"
        >
          <Flex align="center" gap="1rem" w="100%">
            <Icon as={MdStars} />
            <Text>Produtos</Text>
            <Icon ml="auto" as={MdKeyboardArrowRight}></Icon>
          </Flex>
        </Button>
        {menuOptions.products.open && (
          <VStack align="left" padding="0 1rem" gap="1rem">
            {menuOptions.products.options.map((option, index) => (
              <Link href={option.path} key={index} className={setClassName(`/${option.name}`)}>
                <Flex align="center" gap="1rem">
                  <Text>{option.name}</Text>
                </Flex>
              </Link>
            ))}
          </VStack>
        )}
        <Link href="/partners-orders" className={setClassName('/partners-order')}>
          <Flex align="center" gap="1rem" w="100%">
            <Icon as={MdDirectionsCar} />
            <Text>Pedidos Parceiros</Text>
          </Flex>
        </Link>
        <Link href="/tools" className={setClassName('/tools')}>
          <Flex align="center" gap="1rem">
            <Icon as={MdSettings} />
            <Text>Ferramentas</Text>
          </Flex>
        </Link>
      </VStack>
    </Box>
  );
}

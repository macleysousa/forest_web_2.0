import { Center, VStack, Flex, Icon, Button, Text, Box, Image } from '@chakra-ui/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
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
import { BiSolidFactory } from 'react-icons/bi';

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
        { name: 'Planejamento Clientes', path: '/customer-planning' },
        { name: 'Planejamento Roteiros', path: '/visitas' },
      ],
      open: false,
    },
    products: {
      options: [
        { name: 'Lista de Produtos', path: '/products' },
        { name: 'Tabela de Preços Padrão', path: '/standard-pricing-table' },
        { name: 'Tabela de Preços Clientes', path: '/clients-pricing-table' },
        { name: 'Tabela de Preços Grupo', path: '/group-pricing-table' },
        { name: 'Solicitação Preço', path: '/estoque-de-clientes' },
        { name: 'Aprovações', path: '/estoque-de-clientes' },
      ],
      open: false,
    },
    orders: {
      options: [
        { name: 'pedidos', path: '/pedidos' },
        { name: 'visitas', path: '/visitas' },
        { name: 'mapa de visitas', path: '/mapa-de-visitas' },
        { name: 'estoque de clientes', path: '/estoque-de-clientes' },
      ],
      open: false,
    },
    factory: {
      options: [
        { name: 'Pedidos', path: '/factory/orders' },
        { name: 'Novos Pedidos', path: '/factory/new-orders' },
        { name: 'Estoque PPS', path: '/factory/pps-stock' },
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

  useEffect(() => {
    for (const key in menuOptions) {
      if (pathname.includes(key)) {
        setMenuOptions((prevState) => ({
          ...prevState,
          [key]: { ...prevState[key], open: true },
        }));
      }
    }
    // removing array dependencies to avoid infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              <Link href={option.path} key={index} className={setClassName(`${option.path}`)}>
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
              <Link href={option.path} key={index} className={setClassName(`${option.path}`)}>
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
              <Link href={option.path} key={index} className={setClassName(`${option.path}`)}>
                <Flex align="center" gap="1rem">
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
          onClick={handleOpenMenuOption('orders')}
          className="hover:bg-hover-blue hover:text-color-blue p-2 rounded-lg"
        >
          <Flex align="center" gap="1rem" w="100%">
            <Icon as={MdDirectionsCar} />
            <Text>Pedidos Parceiros</Text>
            <Icon ml="auto" as={MdKeyboardArrowRight}></Icon>
          </Flex>
        </Button>
        {menuOptions.orders.open && (
          <VStack align="left" padding="0 1rem" gap="1rem">
            {menuOptions.orders.options.map((option, index) => (
              <Link href={option.path} key={index} className={setClassName(`${option.path}`)}>
                <Flex align="center" gap="1rem">
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
          onClick={handleOpenMenuOption('factory')}
          className="hover:bg-hover-blue hover:text-color-blue p-2 rounded-lg"
        >
          <Flex align="center" gap="1rem" w="100%">
            <Icon as={BiSolidFactory} />
            <Text>Fábrica</Text>
            <Icon ml="auto" as={MdKeyboardArrowRight}></Icon>
          </Flex>
        </Button>
        {menuOptions.factory.open && (
          <VStack align="left" padding="0 1rem" gap="1rem">
            {menuOptions.factory.options.map((option, index) => (
              <Link href={option.path} key={index} className={setClassName(`/${option.name}`)}>
                <Flex align="center" gap="1rem">
                  <Text>{option.name}</Text>
                </Flex>
              </Link>
            ))}
          </VStack>
        )}
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

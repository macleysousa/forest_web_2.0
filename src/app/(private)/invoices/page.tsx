'use client';

import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
} from '@chakra-ui/react';

import { useInfiniteQuery } from '@tanstack/react-query';
import { RangeDatepicker } from 'chakra-dayzed-datepicker';
import { useEffect, useRef, useState } from 'react';

import {
  MdArrowDownward,
  MdArrowDropDown,
  MdArrowUpward,
  MdCalendarToday,
} from 'react-icons/md';

import { dayNames, monthNames } from '../../../configs/datepicker';
import { GetNFEsResult, getNFEs } from '../../../services/api/nfes';
import type { DefaultError, InfiniteData } from '@tanstack/query-core';

const OrderType = {
  date: 'Data',
};

const Order = {
  asc: 'Ascendente' as const,
  desc: 'Decrescente' as const,
};

const formatPeriod = (period: string) =>
  period.replace(/(\d{2}-\d{2})-\d{4}/g, '$1').replace(/-/g, '/');

const formatCNPJ = (cnpj: string) =>
  cnpj.replace(/^(\d{3})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');

const getVolume = (data: InfiniteData<GetNFEsResult, number>) =>
  data.pages
    .reduce((acc, result) => acc + result.nfes.totals.total_quantity, 0)
    .toLocaleString('pt-BR');

const getVolumeMix = (data: InfiniteData<GetNFEsResult, number>) =>
  data.pages
    .reduce((acc, result) => acc + result.nfes.totals.total_quantity_mix, 0)
    .toLocaleString('pt-BR');

const getCobertura = (data: InfiniteData<GetNFEsResult, number>) =>
  data.pages
    .reduce((acc, result) => acc + result.nfes.totals.cobertura, 0)
    .toLocaleString('pt-BR');

const getValorTotal = (data: InfiniteData<GetNFEsResult, number>) =>
  data.pages
    .reduce((acc, result) => acc + result.nfes.totals.value_total, 0)
    .toLocaleString('pt-BR', { currency: 'BRL', style: 'currency' });

const toSelectedDates = (period: string) =>
  period
    .split(' a ')
    .map((value) => value.split('-').reverse().join('-'))
    .map((value) => new Date(`${value}T00:00:00.000-03:00`));

const Period: React.FC<{ period: string }> = ({ period }) => (
  <>
    de {formatPeriod(period).split(' a ')[0]}
    <br />a {formatPeriod(period).split(' a ')[1]}
  </>
);

export default function InvoicesPage() {
  const toast = useToast();

  const [state, setState] = useState({
    order: 'desc' as keyof typeof Order,
    orderType: 'date' as keyof typeof OrderType,
    period: '01-01-2024 a 31-12-2024',
  });

  const infiniteQuery = useInfiniteQuery<
    GetNFEsResult,
    DefaultError,
    InfiniteData<GetNFEsResult, number>,
    ['nfes', typeof state],
    number
  >({
    getNextPageParam: (lastPage) =>
      lastPage.nfes.current_page !== lastPage.nfes.last_page
        ? lastPage.nfes.current_page + 1
        : undefined,

    initialPageParam: 1,

    queryFn: ({ pageParam, signal }) =>
      getNFEs({
        has_filters: '1',
        order: state.order,
        order_type: state.orderType,
        page: pageParam.toString(),
        period: state.period,
        signal,
      }),

    queryKey: ['nfes', state],
  });

  const loadMoreButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!infiniteQuery.error) return;
    console.log(infiniteQuery.error);
    toast({ description: 'Não foi possível buscar NFEs', status: 'error' });
  }, [infiniteQuery.error, toast]);

  useEffect(() => {
    if (!loadMoreButtonRef.current) return;
    const threshold = 1;

    const observer = new IntersectionObserver(
      (entries) =>
        entries.some((entry) => entry.intersectionRatio === threshold) &&
        !infiniteQuery.isFetching &&
        infiniteQuery.fetchNextPage(),
      { threshold },
    );

    observer.observe(loadMoreButtonRef.current);
    return () => observer.disconnect();
  }, [infiniteQuery]);

  const handleOrderChange = (order: keyof typeof Order) => () => {
    if (state.order === order) return;
    setState({ ...state, order });
  };

  const handlePeriodChange = (dates: Date[]) => {
    const parsedDates: string[] = [];

    for (const date of dates) {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate();
      parsedDates.push(`${year}-${month}-${day}`);
    }

    setState({ ...state, period: parsedDates.join(' a ') });
  };

  return (
    <Box padding="2rem">
      <Flex alignItems="center">
        <Heading>Notas Fiscais</Heading>
        <Flex
          gap="1rem"
          marginLeft="auto"
        >
          <Box position="relative">
            <Button
              bg="white"
              border="1px solid #DCDCDC"
              fontWeight="400"
              h="2.5rem"
              rightIcon={<MdArrowDropDown color="#898989" />}
              size="sm"
            >
              <Text
                as="span"
                color="#898989"
                display="inline-block"
              >
                Período
              </Text>
            </Button>
            <RangeDatepicker
              configs={{ dayNames, firstDayOfWeek: 0, monthNames }}
              selectedDates={toSelectedDates(state.period)}
              propsConfigs={{
                inputProps: {
                  cursor: 'pointer',
                  h: '2.5rem',
                  left: '0',
                  opacity: '0',
                  position: 'absolute',
                  size: 'sm',
                  w: '100%',
                },
              }}
              onDateChange={handlePeriodChange}
            />
          </Box>
          <Menu>
            <MenuButton
              _active={{ bg: 'gray.300' }}
              _hover={{ _disabled: { bg: 'gray.200' }, bg: 'gray.200' }}
              as={Button}
              bg="white"
              border="1px solid #DCDCDC"
              color="gray.800"
              fontWeight="400"
              h="2.5rem"
              rightIcon={<MdArrowDropDown color="#898989" />}
              size="sm"
            >
              <Text
                as="span"
                color="#898989"
                display="inline-block"
                mr="0.25rem"
              >
                Ordenar por:
              </Text>
              {OrderType[state.orderType]}
            </MenuButton>
            <MenuList>
              <MenuItem
                fontSize="sm"
                icon={<MdCalendarToday />}
                onClick={() => setState({ ...state, orderType: 'date' })}
              >
                {OrderType.date}
              </MenuItem>
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton
              _active={{ bg: 'gray.300' }}
              _hover={{ _disabled: { bg: 'gray.200' }, bg: 'gray.200' }}
              as={Button}
              bg="white"
              border="1px solid #DCDCDC"
              color="gray.800"
              fontWeight="400"
              h="2.5rem"
              rightIcon={<MdArrowDropDown color="#898989" />}
              size="sm"
              variant=""
            >
              <Text
                as="span"
                color="#898989"
                display="inline-block"
                mr="0.25rem"
              >
                Ordem:
              </Text>
              {Order[state.order]}
            </MenuButton>
            <MenuList>
              <MenuItem
                fontSize="sm"
                icon={<MdArrowUpward />}
                onClick={handleOrderChange('asc')}
              >
                {Order.asc}
              </MenuItem>
              <MenuItem
                fontSize="sm"
                icon={<MdArrowDownward />}
                onClick={handleOrderChange('desc')}
              >
                {Order.desc}
              </MenuItem>
            </MenuList>
          </Menu>
          <Button
            bg="#FFFFFF"
            border="1px solid #1E93FF"
            color="#1E93FF"
            h="2.5rem"
            size="sm"
            variant="outline"
            isDisabled
          >
            Exportar
          </Button>
        </Flex>
      </Flex>
      <Flex
        justifyContent="space-between"
        marginLeft="auto"
        marginRight="auto"
        marginTop="1.5rem"
        maxWidth="80rem"
      >
        {[
          {
            label: 'Período',
            size: 'lg',
            value: <Period period={state.period} />,
          },
          {
            label: 'Volume',
            size: '2xl',
            value: infiniteQuery.data ? getVolume(infiniteQuery.data) : '-',
          },
          {
            label: 'Volume Mix',
            size: '2xl',
            value: infiniteQuery.data ? getVolumeMix(infiniteQuery.data) : '-',
          },
          {
            label: 'Cobertura',
            size: '4xl',
            value: infiniteQuery.data ? getCobertura(infiniteQuery.data) : '-',
          },
          {
            label: 'Produtos',
            size: '4xl',
            value: '-',
          },
          {
            label: 'Valor Total',
            size: 'sm',
            value: infiniteQuery.data ? getValorTotal(infiniteQuery.data) : '-',
          },
        ].map(({ label, value, size }) => (
          <Flex
            key={label}
            background="#FFFFFF"
            border="1px solid #DCDCDC"
            borderRadius="0.5rem"
            flexDirection="column"
            height="6.8125rem"
            paddingBottom="1.25rem"
            paddingTop="1.25rem"
            textAlign="center"
            width="9rem"
          >
            <Text fontSize="sm">{label}</Text>
            <Flex
              alignItems="center"
              flexGrow="1"
              justifyContent="center"
            >
              <Text
                fontSize={size}
                fontWeight="700"
              >
                {value}
              </Text>
            </Flex>
          </Flex>
        ))}
      </Flex>
      <TableContainer
        background="#FFFFFF"
        borderRadius="0.5rem"
        boxShadow="base"
        marginTop="1.5rem"
      >
        <Table>
          <Thead>
            <Tr>
              <Th textTransform="none">Emissor</Th>
              <Th
                textAlign="center"
                textTransform="none"
              >
                Número
              </Th>
              <Th
                textAlign="center"
                textTransform="none"
              >
                Tipo
              </Th>
              <Th
                textAlign="center"
                textTransform="none"
              >
                Data de Emissão
              </Th>
              <Th
                textAlign="center"
                textTransform="none"
              >
                Cliente
              </Th>
              <Th
                textAlign="center"
                textTransform="none"
              >
                Cidade/UF
              </Th>
              <Th
                textAlign="center"
                textTransform="none"
              >
                Segmento
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {infiniteQuery.data?.pages
              .flatMap((page) => page.nfes.data)
              .map((nfe, i) => (
                <Tr
                  key={`${nfe.id}-${i}`}
                  background={i % 2 === 0 ? '#FFFFFF' : '#F9F9F9'}
                >
                  <Td padding="1.25rem 0.75rem">
                    <Box
                      alignItems="center"
                      display="inline-flex"
                      flexDirection="column"
                      gap="0.5rem"
                      w="100%"
                    >
                      <Text
                        as="span"
                        fontSize="xs"
                        textDecoration="underline"
                      >
                        {nfe.customer_emitter_social_name}
                      </Text>
                      <Text
                        as="span"
                        background="#E9F1F2"
                        color="#70B6C1"
                        fontSize="xs"
                        textAlign="center"
                        w="100%"
                      >
                        {formatCNPJ(nfe.customer_emitter_cnpj)}
                      </Text>
                    </Box>
                  </Td>
                  <Td
                    padding="1.25rem 0.75rem"
                    textAlign="center"
                  >
                    <Text
                      as="span"
                      fontSize="xs"
                    >
                      {nfe.number_nfe}
                    </Text>
                  </Td>
                  <Td
                    padding="1.25rem 0.75rem"
                    textAlign="center"
                  >
                    <Badge
                      background="#E9E6EF"
                      color="#775DA6"
                    >
                      {nfe.type}
                    </Badge>
                  </Td>
                  <Td
                    padding="1.25rem 0.75rem"
                    textAlign="center"
                  >
                    <Text
                      as="span"
                      fontSize="xs"
                    >
                      {(nfe.date.split(' ')[0] ?? '')
                        .split('-')
                        .reverse()
                        .join('/')}
                    </Text>
                    <br />
                    <Text
                      as="span"
                      fontSize="xs"
                    >
                      {(nfe.date.split(' ')[1] ?? '').replace(
                        /^(\d{2}:\d{2}):\d{2}$/,
                        '$1',
                      )}
                    </Text>
                  </Td>
                  <Td padding="1.25rem 0.75rem">
                    <Box
                      alignItems="center"
                      display="inline-flex"
                      flexDirection="column"
                      gap="0.5rem"
                      w="100%"
                    >
                      <Text
                        as="span"
                        fontSize="xs"
                        textDecoration="underline"
                      >
                        {nfe.customer_receiver_social_name}
                      </Text>
                      <Text
                        as="span"
                        background="#E9F1F2"
                        color="#70B6C1"
                        fontSize="xs"
                        textAlign="center"
                        w="100%"
                      >
                        {formatCNPJ(nfe.customer_receiver_cnpj)}
                      </Text>
                    </Box>
                  </Td>
                  <Td
                    padding="1.25rem 0.75rem"
                    textAlign="center"
                  >
                    <Text
                      as="span"
                      fontSize="xs"
                    >
                      {nfe.city} - {nfe.state}
                    </Text>
                  </Td>
                  <Td
                    padding="1.25rem 0.75rem"
                    textAlign="center"
                  >
                    <Text
                      as="span"
                      fontSize="xs"
                    >
                      {nfe.segment_name}
                    </Text>
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
      {infiniteQuery.hasNextPage && (
        <Flex
          justify="center"
          mt="2rem"
        >
          <Button
            ref={loadMoreButtonRef}
            bg="#FFFFFF"
            border="1px solid #1E93FF"
            color="#1E93FF"
            h="2.5rem"
            isDisabled={infiniteQuery.isFetching}
            size="sm"
            variant="outline"
            onClick={() => infiniteQuery.fetchNextPage()}
          >
            Carregar mais
          </Button>
        </Flex>
      )}
    </Box>
  );
}

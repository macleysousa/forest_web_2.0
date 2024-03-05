'use client';

import {
  Badge,
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Icon,
  SimpleGrid,
  Skeleton,
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
import {
  DefaultError,
  InfiniteData,
  useInfiniteQuery,
} from '@tanstack/react-query';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { IoMdArrowRoundDown, IoMdArrowRoundUp } from 'react-icons/io';
import { FilterModal } from '../../../components/FilterModal';
import {
  CustomersResponse,
  getCustomers,
} from '../../../services/api/customer';

type Order = {
  order: 'asc' | 'desc';
  order_type: 'social_name' | 'cnpj' | 'situation' | 'rating' | 'status';
};

const range = (length) =>
  Array.from({ length })
    .fill(null)
    .map((_, i) => i);

const options = [
  {
    label: 'Cidade',
    value: 'city',
  },
  {
    label: 'Estado',
    value: 'state',
  },
  {
    label: 'Rede',
    value: 'brand',
  },
  {
    label: 'Bandeira',
    value: 'flag',
  },
  {
    label: 'CNPJ',
    value: 'cnpj',
  },
  {
    label: 'Situação',
    value: 'situation',
  },
  {
    label: 'Ator Cliente',
    value: 'actor',
  },
  {
    label: 'Segmento',
    value: 'segment',
  },
  {
    label: 'Parceiro',
    value: 'partner',
  },
  {
    label: 'Cadastro',
    value: 'cadastro',
  },
  {
    label: 'Razão Social',
    value: 'social_name',
  },
  {
    label: 'Bairro',
    value: 'neighborhood',
  },
  {
    label: 'Árvore',
    value: 'tree',
  },
  {
    label: 'Código Parceiro',
    value: 'dn_code',
  },
];

export default function ClientsPage() {
  const toast = useToast();

  const [state, setState] = useState<Order>({
    order: 'asc',
    order_type: 'social_name',
  });
  const [filters, setFilters] = useState<
    Array<Record<string, string | number>>
  >([]);

  const infiniteQuery = useInfiniteQuery<
    CustomersResponse,
    DefaultError,
    InfiniteData<CustomersResponse, number>,
    ['customers', typeof state, typeof filters],
    number
  >({
    getNextPageParam: (lastPage) =>
      lastPage.customers.current_page !== lastPage.customers.last_page
        ? lastPage.customers.current_page + 1
        : undefined,
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      getCustomers({
        has_filters: filters ? 1 : 0,
        order: state.order,
        order_type: state.order_type,
        page: pageParam as unknown as string,
        ...filters,
      }),
    queryKey: ['customers', state, filters],
    retry: 5,
  });

  useEffect(() => {
    if (!infiniteQuery.error) return;
    console.log(infiniteQuery.error);
    toast({
      description: 'Não foi possível buscar os clientes',
      status: 'error',
    });
  }, [infiniteQuery.error, toast]);

  const loadMoreButtonRef = useRef<HTMLButtonElement>(null);

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

  const handleSort = (type: Order['order_type']) => {
    setState((prevState) => {
      return {
        order: prevState.order === 'asc' ? 'desc' : 'asc',
        order_type: type,
      };
    });
  };

  const handleFilterCallback = (
    params: Array<{ name: string; value: string }>,
  ) => {
    if (!params.some((param) => param.name)) {
      setFilters([]);
      return;
    }
    params.forEach((param) => {
      if (param.value)
        setFilters((prevState) => ({
          ...prevState,
          [param.name]: param.value,
        }));
    });
  };

  const getArrow = (order: Order['order']) => {
    return order === 'asc' ? (
      <Icon as={IoMdArrowRoundDown} />
    ) : (
      <Icon as={IoMdArrowRoundUp} />
    );
  };

  const cardsContent = [
    {
      name: 'Clientes',
      value: infiniteQuery.data?.pages[0]?.customers.totals.count,
    },
    {
      name: 'Inadimplentes',
      value: infiniteQuery.data?.pages[0]?.customers.totals.inadimplente,
    },
    {
      name: 'Prospectos',
      value: infiniteQuery.data?.pages[0]?.customers.totals.prospect,
    },
    {
      name: 'Inativos',
      value: infiniteQuery.data?.pages[0]?.customers.totals.inactive,
    },
    {
      name: 'Ativos',
      value: infiniteQuery.data?.pages[0]?.customers.totals.active,
    },
    {
      name: 'Roteirizados',
      value: infiniteQuery.data?.pages[0]?.customers.totals.routes,
    },
  ];

  return (
    <Box p="2rem">
      <Flex>
        <Heading
          minW="30%"
          w="30%"
        >
          Clientes
        </Heading>
        <Flex
          align="flex-end"
          gap="1rem"
          justify="flex-end"
          minW="70%"
          w="70%"
        >
          <FilterModal
            applyCallback={(params) => handleFilterCallback(params)}
            options={options}
          />
          <Button
            borderColor="#1E93FF"
            color="#1E93FF"
            variant="outline"
          >
            Exportar
          </Button>
          <Link
            href="/customers/new-client"
            legacyBehavior
            passHref
          >
            <Button
              as="a"
              variant="solid"
              w="9rem"
            >
              Novo
            </Button>
          </Link>
        </Flex>
      </Flex>
      <SimpleGrid
        columns={{ lg: 3, md: 3, sm: 2, xl: 6 }}
        p="2rem 0"
        spacing={{ lg: 7, md: 5, sm: 5 }}
      >
        {cardsContent.map((card, index) => (
          <Card
            key={index}
            align="center"
            h={{ '2xl': '9rem', 'base': '6rem', 'xl': '6rem' }}
            justify="center"
            variant="outline"
            w={{ '2xl': '11rem', 'base': '9rem', 'xl': '9rem' }}
          >
            <Text
              fontSize={{ '2xl': '20px', 'base': '14px', 'xl': '14px' }}
              fontWeight="500"
            >
              {card.name}
            </Text>
            <Text
              fontSize={{ '2xl': '42px', 'base': '36px', 'xl': '36px' }}
              fontWeight="700"
            >
              {card.value}
            </Text>
          </Card>
        ))}
      </SimpleGrid>
      <TableContainer
        bg="#fff"
        borderRadius="12px"
        p="1.5rem 1rem"
      >
        <Table
          colorScheme="gray"
          fontSize="12px"
          size="xsm"
          variant="striped"
        >
          <Thead h="3rem">
            <Tr>
              <Th pl="1rem">CNPJ</Th>
              <Th
                cursor="pointer"
                w="20%"
                onClick={() => handleSort('social_name')}
              >
                <Text as="span">Razão Social</Text>
                {state.order_type === 'social_name' && getArrow(state.order)}
              </Th>
              <Th
                cursor="pointer"
                textAlign="center"
                onClick={() => handleSort('situation')}
              >
                <Text as="span">Situação</Text>
                {state.order_type === 'situation' && getArrow(state.order)}
              </Th>
              <Th
                cursor="pointer"
                textAlign="center"
                onClick={() => handleSort('rating')}
              >
                <Text as="span">Avaliação</Text>
                {state.order_type === 'rating' && getArrow(state.order)}
              </Th>
              <Th
                cursor="pointer"
                textAlign="center"
                onClick={() => handleSort('status')}
              >
                <Text as="span">Status</Text>
                {state.order_type === 'status' && getArrow(state.order)}
              </Th>
              <Th>Segmento</Th>
              <Th>Parceiro</Th>
              <Th>Cidade/UF</Th>
              <Th>Cadastro</Th>
            </Tr>
          </Thead>
          <Tbody h="3rem">
            {!infiniteQuery.data &&
              range(4).map((key) => (
                <Tr key={key}>
                  <Td
                    padding="1.25rem 0.75rem"
                    textAlign="center"
                  >
                    <Skeleton
                      display="inline-block"
                      height="0.875rem"
                      width="8.75rem"
                    />
                  </Td>
                  <Td
                    padding="1.25rem 0.75rem"
                    textAlign="center"
                  >
                    <Skeleton
                      display="inline-block"
                      height="0.875rem"
                      width="9.5rem"
                    />
                  </Td>
                  <Td
                    padding="1.25rem 0.75rem"
                    textAlign="center"
                  >
                    <Skeleton
                      display="inline-block"
                      height="0.875rem"
                      width="2.25rem"
                    />
                  </Td>
                  <Td
                    padding="1.25rem 0.75rem"
                    textAlign="center"
                  >
                    <Skeleton
                      display="inline-block"
                      height="0.875rem"
                      width="4rem"
                    />
                  </Td>
                  <Td
                    padding="1.25rem 0.75rem"
                    textAlign="center"
                  >
                    <Skeleton
                      display="inline-block"
                      height="1.75rem"
                      width="12.75rem"
                    />
                  </Td>
                  <Td
                    padding="1.25rem 0.75rem"
                    textAlign="center"
                  >
                    <Skeleton
                      display="inline-block"
                      height="0.875rem"
                      width="3.75rem"
                    />
                  </Td>
                  <Td
                    padding="1.25rem 0.75rem"
                    textAlign="center"
                  >
                    <Skeleton
                      display="inline-block"
                      height="1.25rem"
                      width="4.5rem"
                    />
                  </Td>
                  <Td
                    padding="1.25rem 0.75rem"
                    textAlign="center"
                  >
                    <Skeleton
                      display="inline-block"
                      height="0.875rem"
                      width="0.375rem"
                    />
                  </Td>
                </Tr>
              ))}
            {String(
              infiniteQuery.data?.pages.flatMap((page) => page.status),
            ) !== 'error' &&
              infiniteQuery.data?.pages
                .flatMap((page) => page.customers.data)
                .map((customer, index) => (
                  <Tr
                    key={`tr-${index}`}
                    h="3rem"
                  >
                    <Td pl="1rem">{customer?.cnpj}</Td>
                    <Td
                      cursor="pointer"
                      textDecor="underline"
                    >
                      <Link
                        href={`/customers/${encodeURIComponent(customer?.id)}`}
                        legacyBehavior
                        passHref
                      >
                        {customer?.social_name}
                      </Link>
                    </Td>
                    <Td textAlign="center">{customer?.situation}</Td>
                    <Td textAlign="center">{customer?.rating || '-'}</Td>
                    <Td textAlign="center">{customer?.status.charAt(0)}</Td>
                    <Td>{customer?.segment}</Td>
                    <Td>{customer?.partner || 'Não definido'}</Td>
                    <Td>
                      {customer?.city || '-'} / {customer?.state || '-'}
                    </Td>
                    <Td>
                      <Badge
                        borderRadius="8px"
                        color="#00A163"
                        colorScheme="green"
                        fontSize="12px"
                        p="5px"
                      >
                        Completo
                      </Badge>
                    </Td>
                  </Tr>
                ))}
          </Tbody>
        </Table>
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
      </TableContainer>
    </Box>
  );
}

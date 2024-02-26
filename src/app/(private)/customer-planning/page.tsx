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

import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { CgMenuGridR } from 'react-icons/cg';

import {
  MdArrowDropDown,
  MdCheckBox,
  MdCheckBoxOutlineBlank,
} from 'react-icons/md';

import { useAuthContext } from '../../../contexts/AuthContext';
import { getCustomersPlanning } from '../../../services/api/customers-planning';
import { getUser } from '../../../services/api/user';
import type { DefaultError, InfiniteData } from '@tanstack/query-core';

type GetCustomersPlanning = typeof getCustomersPlanning;
type GetCustomersPlanningResult = Awaited<ReturnType<GetCustomersPlanning>>;
type Actor = Awaited<ReturnType<typeof getUser>>['actor_tree'][number];

const range = (length) =>
  Array.from({ length })
    .fill(null)
    .map((_, i) => i);

export default function CustomerPlanningPage() {
  const toast = useToast();
  const auth = useAuthContext();
  const [state, setState] = useState<{ actorId?: string; treeId?: string }>({});
  const [actorName, setActorName] = useState('');
  const loadMoreButtonRef = useRef<HTMLButtonElement>(null);

  const infiniteQuery = useInfiniteQuery<
    GetCustomersPlanningResult,
    DefaultError,
    InfiniteData<GetCustomersPlanningResult, number>,
    ['customers-planning', typeof state],
    number
  >({
    getNextPageParam: (lastPage) => {
      const { current_page, last_page } = lastPage.customers_planning;
      return current_page !== last_page ? current_page + 1 : undefined;
    },

    initialPageParam: 1,

    queryFn: ({ pageParam, signal }) =>
      getCustomersPlanning({
        actor_id: state.actorId,
        page: pageParam.toString(),
        signal,
        tree_id: state.treeId,
      }),

    queryKey: ['customers-planning', state],
  });

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

  const handleActorChange = (actor: Actor) => () => {
    if (state.actorId === actor.actor_id.toString()) {
      setState({});
      setActorName('');
      return;
    }

    setState({ actorId: `${actor.actor_id}`, treeId: `${actor.tree_id}` });
    setActorName(actor.name);
  };

  return (
    <Box p="2rem">
      <Flex alignItems="center">
        <Heading>Planejamento de Clientes</Heading>
        <Flex
          gap="1rem"
          marginLeft="auto"
        >
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
                Ator:
              </Text>
              {actorName || 'Selecione um ator'}
            </MenuButton>
            <MenuList>
              {auth.is === 'authenticated' &&
                auth.user.actor_tree.map((actor) => (
                  <MenuItem
                    key={JSON.stringify(actor)}
                    fontSize="sm"
                    icon={
                      state.actorId === actor.actor_id.toString() ? (
                        <MdCheckBox fontSize="1rem" />
                      ) : (
                        <MdCheckBoxOutlineBlank fontSize="1rem" />
                      )
                    }
                    onClick={handleActorChange(actor)}
                  >
                    {actor.name}
                  </MenuItem>
                ))}
            </MenuList>
          </Menu>
          <Button
            _hover={{ userSelect: 'none' }}
            h="2.5rem"
            leftIcon={<CgMenuGridR fontSize="1.5rem" />}
            variant="solid"
            isDisabled
          >
            Dashboard
          </Button>
        </Flex>
      </Flex>
      <Flex
        justifyContent="space-between"
        marginLeft="auto"
        marginRight="auto"
        marginTop="1.75rem"
        maxWidth="80rem"
      >
        {[
          {
            label: 'Totais',
            value: infiniteQuery.data?.pages.reduce(
              (total, result) =>
                total + result.customers_planning.totals.count_customers,
              0,
            ),
          },
          {
            label: 'Ativos',
            value: infiniteQuery.data?.pages.reduce(
              (total, result) =>
                total + result.customers_planning.totals.count_active,
              0,
            ),
          },
          {
            label: 'Inativos',
            value: infiniteQuery.data?.pages.reduce(
              (total, result) =>
                total + result.customers_planning.totals.count_inactive,
              0,
            ),
          },
          {
            label: 'Prospects',
            value: infiniteQuery.data?.pages.reduce(
              (total, result) =>
                total + result.customers_planning.totals.count_prospect,
              0,
            ),
          },
          {
            label: 'Volume Mix',
            value: infiniteQuery.data?.pages.reduce(
              (total, result) =>
                total + result.customers_planning.totals.sum_volume_mix_target,
              0,
            ),
          },
        ].map(({ label, value }) => (
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
                fontSize="2xl"
                fontWeight="700"
              >
                {value?.toLocaleString('pt-BR')}
              </Text>
            </Flex>
          </Flex>
        ))}
      </Flex>
      <TableContainer
        background="#FFFFFF"
        borderRadius="0.5rem"
        boxShadow="base"
        marginTop="2rem"
      >
        <Table>
          <Thead>
            <Tr>
              <Th textAlign="center">Região</Th>
              <Th textAlign="center">Segmento</Th>
              <Th textAlign="center">Parceiro</Th>
              <Th textAlign="center">Bandeira</Th>
              <Th textAlign="center">Cliente</Th>
              <Th textAlign="center">Cidade</Th>
              <Th textAlign="center">Status</Th>
              <Th textAlign="center">Frentistas/Consultores</Th>
            </Tr>
          </Thead>
          <Tbody>
            {infiniteQuery.data?.pages.map((customerPlanning) =>
              customerPlanning.customers_planning.data.map((item, i) => (
                <Tr
                  key={item.id}
                  background={i % 2 === 0 ? '#FFFFFF' : '#F9F9F9'}
                >
                  <Td
                    padding="1.25rem 0.75rem"
                    textAlign="center"
                  >
                    <Text
                      as="span"
                      fontSize="xs"
                    >
                      {item.actor_name}
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
                      {item.segment_name}
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
                      {item.partner_name}
                    </Text>
                  </Td>
                  <Td
                    padding="1.25rem 0.75rem"
                    textAlign="center"
                  >
                    <Text
                      as="span"
                      display="inline-block"
                      fontSize="xs"
                      lineHeight="1rem"
                      maxWidth="4rem"
                      whiteSpace="normal"
                    >
                      {item.flag_name}
                    </Text>
                  </Td>
                  <Td
                    padding="1.25rem 0.75rem"
                    textAlign="center"
                  >
                    <Box
                      alignItems="center"
                      display="inline-flex"
                      flexDirection="column"
                      gap="0.5rem"
                    >
                      <Text
                        as="span"
                        fontSize="xs"
                        textDecoration="underline"
                      >
                        {item.social_name}
                      </Text>
                      <Text
                        as="span"
                        background="#E9F1F2"
                        color="#70B6C1"
                        fontSize="xs"
                        textAlign="center"
                        width="100%"
                      >
                        {item.cnpj.replace(
                          /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
                          '$1.$2.$3/$4-$5',
                        )}
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
                      {item.city}
                    </Text>
                  </Td>
                  <Td
                    padding="1.25rem 0.75rem"
                    textAlign="center"
                  >
                    <Badge
                      colorScheme={
                        item.customer_status === 'Ativo'
                          ? 'green'
                          : item.customer_status === 'Prospect'
                            ? 'blue'
                            : 'gray'
                      }
                    >
                      {item.customer_status}
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
                      -
                    </Text>
                  </Td>
                </Tr>
              )),
            )}
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

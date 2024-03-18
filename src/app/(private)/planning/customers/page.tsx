'use client';

import {
  Badge,
  Box,
  Button,
  Heading,
  Icon,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Stack,
  StackDivider,
  Stat,
  StatLabel,
  StatNumber,
  Table,
  TableContainer,
  Tag,
  TagCloseButton,
  TagLabel,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from '@chakra-ui/react';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { MdFilterList } from 'react-icons/md';
import { Loading } from '../../../../components/Loading';
import { AuthUser, useAuthContext } from '../../../../contexts/AuthContext';
import { getCustomersPlanning } from '../../../../services/api/customers-planning';
import type { DefaultError, InfiniteData } from '@tanstack/query-core';

type GetCustomersPlanning = typeof getCustomersPlanning;
type GetCustomersPlanningResult = Awaited<ReturnType<GetCustomersPlanning>>;

export default function CustomerPlanningPage() {
  const toast = useToast();
  const auth = useAuthContext();
  const loadMoreButtonRef = useRef<HTMLButtonElement>(null);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const [actorTreeInFilterIsDistributor, setActorTreeInFilterIsDistributor] =
    useState(true);

  const [filters, setFilters] = useState(() => {
    if (auth.is !== 'authenticated') throw new Error('unexpected auth state');
    const { actor_id, tree_id } = auth.user.distributor;
    return { actor_id: actor_id.toString(), tree_id: tree_id.toString() };
  });

  const infiniteQuery = useInfiniteQuery<
    GetCustomersPlanningResult,
    DefaultError,
    InfiniteData<GetCustomersPlanningResult, number>,
    ['customers-planning', typeof filters],
    number
  >({
    getNextPageParam: (lastPage) => {
      const { current_page, last_page } = lastPage.customers_planning;
      return current_page !== last_page ? current_page + 1 : undefined;
    },

    initialPageParam: 1,

    queryFn: ({ pageParam, signal }) =>
      getCustomersPlanning({
        ...filters,
        page: pageParam.toString(),
        signal,
      }),

    queryKey: ['customers-planning', filters],
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

  const isActorTreeFilterOptionActive = (
    actorTree: AuthUser['actor_tree'][number],
  ) => {
    if (actorTreeInFilterIsDistributor) return false;
    if (filters.actor_id !== actorTree.actor_id.toString()) return false;
    if (filters.tree_id !== actorTree.tree_id.toString()) return false;
    return true;
  };

  const handleSelectActorTree =
    (actorTree: AuthUser['actor_tree'][number]) => () => {
      setPopoverOpen(false);
      if (isActorTreeFilterOptionActive(actorTree)) return;
      // eslint-disable-next-line prettier/prettier
      setFilters({ actor_id: actorTree.actor_id.toString(), tree_id: actorTree.tree_id.toString() });
      setActorTreeInFilterIsDistributor(false);
    };

  const handleUnselectActorTree = () => {
    if (actorTreeInFilterIsDistributor) return;
    if (auth.is !== 'authenticated') throw new Error('unexpected auth state');
    const { actor_id, tree_id } = auth.user.distributor;

    // eslint-disable-next-line prettier/prettier
    const newFilters = { actor_id: actor_id.toString(), tree_id: tree_id.toString() };
    setFilters(newFilters);

    setActorTreeInFilterIsDistributor(true);
  };

  if (auth.is !== 'authenticated') {
    return <Loading />;
  }

  return (
    <>
      <Box
        display="flex"
        flexDirection={{ base: 'column', md: 'row' }}
        flexWrap="wrap"
        gap={4}
        justifyContent={{ md: 'space-between' }}
      >
        <Heading>Planejamento de Clientes</Heading>
        <Box
          display="flex"
          flexWrap="wrap"
          gap={4}
        >
          <Popover
            isOpen={popoverOpen}
            placement="bottom-start"
            onClose={() => setPopoverOpen(false)}
          >
            <PopoverTrigger>
              <Button
                isLoading={infiniteQuery.isFetching}
                variant="outline"
                onClick={() => setPopoverOpen(true)}
              >
                Ator / Árvore
              </Button>
            </PopoverTrigger>
            <Portal>
              <PopoverContent>
                <PopoverArrow />
                <PopoverHeader></PopoverHeader>
                <PopoverBody>
                  <Stack
                    direction="column"
                    divider={<StackDivider borderColor="gray.300" />}
                    gap={2}
                    maxHeight="60dvh"
                    overflowY="auto"
                  >
                    {/* eslint-disable prettier/prettier */}
                    {auth.user.actor_tree.map((actorTree) => (
                      <Table
                        key={JSON.stringify(actorTree)}
                        _hover={{ '& td': { background: 'gray.100', borderColor: 'gray.300' }, 'cursor': 'pointer' }}
                        size="sm"
                        sx={isActorTreeFilterOptionActive(actorTree) ? { '& td': { background: 'gray.100', borderColor: 'gray.300' } } : {}}
                        onClick={handleSelectActorTree(actorTree)}
                      >
                        <Tbody>
                          <Tr>
                            <Td fontWeight="bold" textAlign="end">actor_name</Td>
                            <Td width="100%">{actorTree.actor_name}</Td>
                          </Tr>
                          <Tr>
                            <Td fontWeight="bold" textAlign="end">actor_type</Td>
                            <Td width="100%">{actorTree.actor_type}</Td>
                          </Tr>
                          <Tr>
                            <Td fontWeight="bold" textAlign="end">tree_name</Td>
                            <Td width="100%">{actorTree.tree_name}</Td>
                          </Tr>
                          <Tr>
                            <Td fontWeight="bold" textAlign="end">tree_type</Td>
                            <Td width="100%">{actorTree.tree_type}</Td>
                          </Tr>
                        </Tbody>
                      </Table>
                    ))}
                    {/* eslint-enable prettier/prettier */}
                  </Stack>
                </PopoverBody>
                <PopoverFooter />
              </PopoverContent>
            </Portal>
          </Popover>
          <Button
            isLoading={infiniteQuery.isFetching}
            leftIcon={<Icon as={MdFilterList} />}
            variant="outline"
            isDisabled
          >
            Mais Filtros
          </Button>
        </Box>
      </Box>
      {!actorTreeInFilterIsDistributor && (
        <Box
          display="flex"
          flexWrap="wrap"
          gap={2}
          mt={6}
        >
          <Tag colorScheme="blue">
            <TagLabel>Ator / Ávore</TagLabel>
            <TagCloseButton onClick={handleUnselectActorTree} />
          </Tag>
        </Box>
      )}
      <Box
        display="flex"
        gap={4}
        marginTop={4}
        overflow="auto"
        paddingBottom={2}
        paddingTop={2}
        scrollSnapType="x mandatory"
      >
        {[
          {
            label: 'Totais',
            value:
              infiniteQuery.data?.pages.reduce(
                (total, result) =>
                  total + result.customers_planning.totals.count_customers,
                0,
              ) ?? '-',
          },
          {
            label: 'Ativos',
            value:
              infiniteQuery.data?.pages.reduce(
                (total, result) =>
                  total + result.customers_planning.totals.count_active,
                0,
              ) ?? '-',
          },
          {
            label: 'Inativos',
            value:
              infiniteQuery.data?.pages.reduce(
                (total, result) =>
                  total + result.customers_planning.totals.count_inactive,
                0,
              ) ?? '-',
          },
          {
            label: 'Prospects',
            value:
              infiniteQuery.data?.pages.reduce(
                (total, result) =>
                  total + result.customers_planning.totals.count_prospect,
                0,
              ) ?? '-',
          },
          {
            label: 'Volume Mix',
            value:
              infiniteQuery.data?.pages.reduce(
                (total, result) =>
                  total +
                  result.customers_planning.totals.sum_volume_mix_target,
                0,
              ) ?? '-',
          },
        ].map(({ label, value }) => (
          <Box
            key={label}
            background="white"
            borderRadius="md"
            boxShadow="base"
            flexShrink={0}
            minWidth="8rem"
            padding={4}
            scrollSnapAlign="start"
          >
            <Stat>
              <StatLabel>{label}</StatLabel>
              <StatNumber>{value}</StatNumber>
            </Stat>
          </Box>
        ))}
      </Box>
      <TableContainer
        background="white"
        borderRadius="sm"
        boxShadow="base"
        marginTop={6}
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
                  <Td textAlign="center">{item.actor_name}</Td>
                  <Td textAlign="center">{item.segment_name}</Td>
                  <Td textAlign="center">{item.partner_name}</Td>
                  <Td textAlign="center">
                    <Box
                      as="span"
                      display="inline-block"
                      maxWidth="4rem"
                      whiteSpace="normal"
                    >
                      {item.flag_name}
                    </Box>
                  </Td>
                  <Td textAlign="center">
                    <Box
                      alignItems="center"
                      display="inline-flex"
                      flexDirection="column"
                      gap="0.5rem"
                    >
                      <Box
                        as="span"
                        fontSize="xs"
                        textDecoration="underline"
                      >
                        {item.social_name}
                      </Box>
                      <Box
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
                      </Box>
                    </Box>
                  </Td>
                  <Td textAlign="center">{item.city}</Td>
                  <Td textAlign="center">
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
                  <Td textAlign="center">-</Td>
                </Tr>
              )),
            )}
          </Tbody>
        </Table>
      </TableContainer>
      {infiniteQuery.hasNextPage && (
        <Box
          display="flex"
          justifyContent="center"
          marginTop={6}
        >
          <Button
            ref={loadMoreButtonRef}
            isDisabled={infiniteQuery.isFetching}
            variant="outline"
            onClick={() => infiniteQuery.fetchNextPage()}
          >
            Carregar mais
          </Button>
        </Box>
      )}
    </>
  );
}

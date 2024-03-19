'use client';

import {
  Badge,
  Box,
  Button,
  Heading,
  Icon,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Portal,
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

import {
  GetCustomersPlanningFilters,
  GetCustomersPlanningResult,
  getCustomersPlanning,
} from '../../../../services/api/customers-planning';

import { CustomersPlanningPeriodFilterModal } from './components/CustomersPlanningFilterModal';
import { CustomersPlanningFilters } from './components/CustomersPlanningFilters';
import { CustomersPlanningFilter } from './components/CustomersPlanningFilters/CustomersPlanningFilter';
import type { DefaultError, InfiniteData } from '@tanstack/query-core';

type ActorTree = AuthUser['actor_tree'][number];

export default function CustomerPlanningPage() {
  const toast = useToast();
  const auth = useAuthContext();
  const loadMoreButtonRef = useRef<HTMLButtonElement>(null);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [periodModalOpen, setPeriodModalOpen] = useState(false);

  const [selectedActorTree, setSelectedActorTree] = useState<ActorTree | null>(
    null,
  );

  const [filters, setFilters] = useState<GetCustomersPlanningFilters>(() => {
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

  useEffect(() => {
    window.document.title = 'Forest | Planejamento de Clientes';
  }, []);

  const isActorTreeFilterOptionActive = (actorTree: ActorTree) => {
    if (!selectedActorTree) return false;
    if (filters.actor_id !== actorTree.actor_id.toString()) return false;
    if (filters.tree_id !== actorTree.tree_id.toString()) return false;
    return true;
  };

  const handleSelectActorTree = (actorTree: ActorTree) => () => {
    if (isActorTreeFilterOptionActive(actorTree)) return;
    // eslint-disable-next-line prettier/prettier
    setFilters({ actor_id: actorTree.actor_id.toString(), tree_id: actorTree.tree_id.toString() });
    setSelectedActorTree(actorTree);
  };

  const handleUnselectActorTree = () => {
    if (auth.is !== 'authenticated') throw new Error('unexpected auth state');
    const { actor_id, tree_id } = auth.user.distributor;

    // eslint-disable-next-line prettier/prettier
    const newFilters = { actor_id: actor_id.toString(), tree_id: tree_id.toString() };
    setFilters(newFilters);

    setSelectedActorTree(null);
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
          <Box maxW={{ md: '20rem' }}>
            <CustomersPlanningFilter
              disabled={infiniteQuery.isFetching}
              label="Data"
              value={filters.period ?? ''}
              inputLeftAddonProps={{
                fontSize: 'base',
                lineHeight: 'base',
                w: 'auto',
              }}
              readOnly
              onClick={() => setPeriodModalOpen(true)}
              onTextChange={(period) => setFilters({ ...filters, period })}
            />
            <CustomersPlanningPeriodFilterModal
              open={periodModalOpen}
              onClose={() => setPeriodModalOpen(false)}
              onSubmit={(period) => setFilters({ ...filters, period })}
            />
          </Box>

          <Menu>
            <MenuButton
              as={Button}
              isLoading={infiniteQuery.isFetching}
              variant="outline"
            >
              Ator / Árvore
            </MenuButton>
            <MenuList>
              {Object.entries(
                auth.user.actor_tree.reduce<Record<string, ActorTree[]>>(
                  (o, actorTree) => {
                    const { tree_name: k } = actorTree;
                    return { ...o, [k]: [...(o[k] ?? []), actorTree] };
                  },
                  {},
                ),
              ).map(([treeName, actorTrees]) => (
                <MenuGroup
                  key={treeName}
                  title={treeName}
                >
                  {actorTrees.map((actorTree) => (
                    <MenuItem
                      key={JSON.stringify(actorTree)}
                      onClick={handleSelectActorTree(actorTree)}
                    >
                      {actorTree.actor_name}
                    </MenuItem>
                  ))}
                </MenuGroup>
              ))}
            </MenuList>
          </Menu>

          {/* eslint-disable prettier/prettier */}
          <Popover closeOnBlur={false} isOpen={popoverOpen} placement="bottom-start" isLazy onClose={() => setPopoverOpen(false)}>
            <PopoverTrigger>
              <Button isLoading={infiniteQuery.isFetching} leftIcon={<Icon as={MdFilterList} />} variant="outline" onClick={() => setPopoverOpen(true)}>
                Filtros
              </Button>
            </PopoverTrigger>
            <Portal>
              <PopoverContent width="20rem">
                <CustomersPlanningFilters
                  disabled={infiniteQuery.isFetching}
                  filters={filters}
                  onApply={setFilters}
                  onClose={() => setPopoverOpen(false)}
                />
              </PopoverContent>
            </Portal>
          </Popover>
          {/* eslint-enable prettier/prettier */}
        </Box>
      </Box>
      {(selectedActorTree ||
        filters.segment ||
        filters.partner ||
        filters.brand ||
        filters.customer_name ||
        filters.city ||
        filters.status ||
        filters.period) && (
        <Box
          display="flex"
          flexWrap="wrap"
          gap={2}
          mt={6}
        >
          {selectedActorTree && (
            <Tag colorScheme="blue">
              <TagLabel>{selectedActorTree.actor_name}</TagLabel>
              <TagCloseButton onClick={handleUnselectActorTree} />
            </Tag>
          )}
          {filters.segment && (
            <Tag colorScheme="blue">
              <TagLabel>Segmento: {filters.segment}</TagLabel>
              <TagCloseButton
                onClick={() => setFilters({ ...filters, segment: undefined })}
              />
            </Tag>
          )}
          {filters.partner && (
            <Tag colorScheme="blue">
              <TagLabel>Parceiro: {filters.partner}</TagLabel>
              <TagCloseButton
                onClick={() => setFilters({ ...filters, partner: undefined })}
              />
            </Tag>
          )}
          {filters.brand && (
            <Tag colorScheme="blue">
              <TagLabel>Rede: {filters.brand}</TagLabel>
              <TagCloseButton
                onClick={() => setFilters({ ...filters, brand: undefined })}
              />
            </Tag>
          )}
          {filters.customer_name && (
            <Tag colorScheme="blue">
              <TagLabel>Cliente: {filters.customer_name}</TagLabel>
              <TagCloseButton
                onClick={() =>
                  setFilters({ ...filters, customer_name: undefined })
                }
              />
            </Tag>
          )}
          {filters.city && (
            <Tag colorScheme="blue">
              <TagLabel>Cidade: {filters.city}</TagLabel>
              <TagCloseButton
                onClick={() => setFilters({ ...filters, city: undefined })}
              />
            </Tag>
          )}
          {filters.status && (
            <Tag colorScheme="blue">
              <TagLabel>Status: {filters.status}</TagLabel>
              <TagCloseButton
                onClick={() => setFilters({ ...filters, status: undefined })}
              />
            </Tag>
          )}
          {filters.period && (
            <Tag colorScheme="blue">
              <TagLabel>Período: {filters.period}</TagLabel>
              <TagCloseButton
                onClick={() => setFilters({ ...filters, period: undefined })}
              />
            </Tag>
          )}
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
                        fontSize="sm"
                        textDecoration="underline"
                      >
                        {item.social_name}
                      </Box>
                      <Box
                        as="span"
                        background="green.50"
                        color="green.500"
                        fontSize="sm"
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
                  <Td textAlign="center">
                    {item.frentistas || item.consultores
                      ? `${item.frentistas ?? 0} / ${item.consultores ?? 0}`
                      : '-'}
                  </Td>
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

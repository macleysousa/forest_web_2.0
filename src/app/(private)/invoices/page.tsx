'use client';

import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Portal,
  useToast,
} from '@chakra-ui/react';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { MdFilterList } from 'react-icons/md';

import {
  GetNFEsFilters,
  GetNFEsResult,
  getNFEs,
} from '../../../services/api/nfes';

import { InvoicesFilters } from './components/InvoicesFilters';
import { InvoicesLoadMore } from './components/InvoicesLoadMore';
import { InvoicesStats } from './components/InvoicesStats';
import { InvoicesTable } from './components/InvoicesTable';
import { InvoicesTags } from './components/InvoicesTags';
import { currentDate, firstDayOfTheMonth } from './utils/date';
import { createPeriod, reverseCreatePeriod } from './utils/period';
import type { Tag } from './components/InvoicesTags';
import type { DefaultError, InfiniteData } from '@tanstack/query-core';

export type Period = [Date, Date];

const defaultPeriod = createPeriod(
  firstDayOfTheMonth(currentDate),
  currentDate,
);

export default function InvoicesPage() {
  const toast = useToast();

  const [filters, setFilters] = useState<GetNFEsFilters>({
    period: defaultPeriod,
  });

  const [popoverOpen, setPopoverOpen] = useState(false);

  const infiniteQuery = useInfiniteQuery<
    GetNFEsResult,
    DefaultError,
    InfiniteData<GetNFEsResult, number>,
    ['nfes', typeof filters],
    number
  >({
    getNextPageParam: (lastPage) =>
      lastPage.nfes.current_page !== lastPage.nfes.last_page
        ? lastPage.nfes.current_page + 1
        : undefined,

    initialPageParam: 1,

    queryFn: ({ pageParam, signal }) =>
      getNFEs({
        ...filters,
        has_filters: '1',
        order: 'desc',
        order_type: 'date',
        page: pageParam.toString(),
        signal,
      }),

    queryKey: ['nfes', filters],
  });

  useEffect(() => {
    if (!infiniteQuery.error) return;
    console.log(infiniteQuery.error);
    toast({ description: 'Não foi possível buscar NFEs', status: 'error' });
  }, [infiniteQuery.error, toast]);

  const createTag = (
    label: string,
    key: keyof GetNFEsFilters,
    defaultValue = '',
  ): Tag => ({
    label,
    onClose: () => setFilters({ ...filters, [key]: defaultValue }),
    show: filters[key] !== undefined && filters[key] !== defaultValue,
    value: filters[key] || defaultValue,
  });

  /* eslint-disable prettier/prettier */
  return (
    <Box p={8}>
      <Flex flexWrap="wrap" gap={4} justify="space-between">
        <Heading flexShrink={0}>Notas Fiscais</Heading>
        <Popover closeOnBlur={false} isOpen={popoverOpen} isLazy onClose={() => setPopoverOpen(false)}>
          <PopoverTrigger>
            <Button isLoading={infiniteQuery.isFetching} leftIcon={<Icon as={MdFilterList} />} size="sm" variant="outline" onClick={() => setPopoverOpen(true)}>
              Filtros
            </Button>
          </PopoverTrigger>
          <Portal>
          <PopoverContent width="20rem">
            <InvoicesFilters
              defaultPeriod={defaultPeriod}
              disabled={infiniteQuery.isFetching}
              filters={filters}
              onApply={setFilters}
              onClose={() => setPopoverOpen(false)}
            />
          </PopoverContent>
          </Portal>
        </Popover>
      </Flex>

      <InvoicesTags
        tags={[
          createTag('Nº NF', 'number_nfe'),
          createTag('Data', 'period', defaultPeriod),
          createTag('Cliente', 'customer'),
          createTag('Árvore', 'tree_name'),
          createTag('Tipo', 'type'),
          createTag('Cidade', 'city'),
          createTag('UF', 'uf'),
          createTag('Cliente Emissor', 'customer_emitter'),
          createTag('Segmento', 'segment'),
          createTag('Parceiro', 'partner'),
          createTag('Bandeira', 'flag'),
          createTag('Rede', 'brand'),
          createTag('Produto', 'product'),
          createTag('DSH/DSO', 'dsh_dso'),
          createTag('Número Pedido Parceiro', 'order_number_customer'),
          createTag('Número Pedido Faturamento', 'order_number_billing'),
        ]}
      />

      <Box mt={4}>
        <InvoicesStats
          pages={infiniteQuery.data?.pages}
          period={reverseCreatePeriod(filters.period)}
        />
      </Box>

      <Box mt={6}>
        <InvoicesTable
          pages={infiniteQuery.data?.pages}
        />
      </Box>

      {infiniteQuery.hasNextPage && (
        <InvoicesLoadMore
          disabled={infiniteQuery.isFetching}
          onClick={() => infiniteQuery.fetchNextPage()}
          onIntersect={() => !infiniteQuery.isFetching && infiniteQuery.fetchNextPage()}
        />
      )}
    </Box>
  );
  /* eslint-enable prettier/prettier */
}

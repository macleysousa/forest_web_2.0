'use client';
import { Box, Stat, StatLabel, StatNumber } from '@chakra-ui/react';
import { GetNFEsResult } from '../../../../services/api/nfes';
import type { Period } from '../page';

const formatDate = (date: Date) => {
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${day}/${month}`;
};

const formatPeriod = ([start, end]: Period) =>
  `${formatDate(start)} a ${formatDate(end)}`;

const getVolume = (pages: GetNFEsResult[]) =>
  pages
    .reduce((acc, result) => acc + result.nfes.totals.total_quantity, 0)
    .toLocaleString('pt-BR');

const getVolumeMix = (pages: GetNFEsResult[]) =>
  pages
    .reduce((acc, result) => acc + result.nfes.totals.total_quantity_mix, 0)
    .toLocaleString('pt-BR');

const getCobertura = (pages: GetNFEsResult[]) =>
  pages
    .reduce((acc, result) => acc + result.nfes.totals.cobertura, 0)
    .toLocaleString('pt-BR');

const getValorTotal = (pages: GetNFEsResult[]) =>
  pages
    .reduce((acc, result) => acc + result.nfes.totals.value_total, 0)
    .toLocaleString('pt-BR', { currency: 'BRL', style: 'currency' });

const Period: React.FC<{ period: Period }> = ({ period: [start, end] }) => (
  <>
    de {formatDate(start)}
    <br />a {formatDate(end)}
  </>
);

type InvoicesStatsProps = {
  pages: GetNFEsResult[] | undefined;
  period: Period;
};

export function InvoicesStats({ period, pages }: InvoicesStatsProps) {
  return (
    <Box
      display="flex"
      gap={4}
      overflow="auto"
      py={2}
      scrollSnapType="x mandatory"
    >
      {[
        { label: 'Período', value: formatPeriod(period) },
        { label: 'Volume', value: pages ? getVolume(pages) : '-' },
        { label: 'Volume Mix', value: pages ? getVolumeMix(pages) : '-' },
        { label: 'Cobertura', value: pages ? getCobertura(pages) : '-' },
        { label: 'Produtos', value: '-' },
        { label: 'Valor Total', value: pages ? getValorTotal(pages) : '-' },
      ].map(({ label, value }) => (
        <Box
          key={label}
          bg="white"
          borderRadius="md"
          flexShrink={0}
          minW="8rem"
          p={4}
          scrollSnapAlign="start"
          shadow="base"
        >
          <Stat>
            <StatLabel>{label}</StatLabel>
            <StatNumber>{value}</StatNumber>
          </Stat>
        </Box>
      ))}
    </Box>
  );
}

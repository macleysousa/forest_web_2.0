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
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { MdApps } from 'react-icons/md';
import { ButtonFilter } from '../../../../components/ButtonFilter';
import { DatePicker } from '../../../../components/DatePicker';
import { getNotSaleReason } from '../../../../services/api/notSaleReason';
import { getVisits } from '../../../../services/api/visits';
import { formatDate, formatDateForQuery } from '../../../../utils/formatters';

type NotSaleReasonType = {
  id: number;
  reason: string;
  title: string;
};

const findNotSaleReason = (id: number, notSaleReasons: NotSaleReasonType[]) => {
  return notSaleReasons?.find((reason: any) => reason?.id === id);
};

export default function VisitsPage() {
  const [dashboardStatus, setDashboardStatus] = useState<boolean>(true);
  const [selectedDates, setSelectedDates] = useState<Date[]>([
    new Date(),
    new Date(),
  ]);

  const { data, refetch } = useQuery({
    queryFn: () =>
      getVisits({
        dateEnd: formatDateForQuery(selectedDates[1] as Date),
        dateInit: formatDateForQuery(selectedDates[0] as Date),
      }),
    queryKey: ['visits'],
  });

  const { data: notSaleReasonsData } = useQuery({
    queryFn: () => getNotSaleReason(),
    queryKey: ['notSaleReasons'],
  });

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDates]);

  const cardsContent = [
    {
      name: 'Válidas',
      value: data?.visits.reduce(
        (acc, curr) => (curr.status === 'Válida' ? acc + 1 : acc),
        0,
      ),
    },
    {
      name: 'Inválidas',
      value: data?.visits.reduce(
        (acc, curr) => (curr.status === 'Inválida' ? acc + 1 : acc),
        0,
      ),
    },
    {
      name: 'Fora de Rota',
      value: data?.visits.reduce(
        (acc, curr) => (curr.status === 'Fora de Rota' ? acc + 1 : acc),
        0,
      ),
    },
    {
      name: 'Fora de Roteiro',
      value: data?.visits.reduce(
        (acc, curr) => (curr.status === 'Fora de Roteiro' ? acc + 1 : acc),
        0,
      ),
    },
    {
      name: 'Ignoradas',
      value: data?.visits.reduce(
        (acc, curr) => (curr.status === 'Ignorada' ? acc + 1 : acc),
        0,
      ),
    },
    {
      name: 'Tempo Médio',
      value: (
        Number(data?.visits.reduce((acc, curr) => acc + curr.duration, 0)) /
          Number(data?.visits.length) || 0
      ).toFixed(2),
    },
  ];

  return (
    <Box p="2rem">
      <Flex>
        <Heading
          minW="30%"
          w="30%"
        >
          Visitas
        </Heading>
        <Flex
          align="flex-end"
          gap="1rem"
          justify="flex-end"
          minW="70%"
          w="70%"
        >
          <DatePicker onChange={setSelectedDates} />
          <ButtonFilter placeContent="flex-start" />
          <Button
            borderColor={!dashboardStatus ? '#89898970' : 'auto'}
            color={!dashboardStatus ? '#898989' : 'inherit'}
            p="0 1rem"
            variant={!dashboardStatus ? 'outline' : 'primary'}
            w="9rem"
            onClick={() => setDashboardStatus(!dashboardStatus)}
          >
            <Icon
              as={MdApps}
              h="24px"
              mr="1rem"
              w="24px"
            />
            Dashboard
          </Button>
          <Button
            borderColor="#1E93FF"
            color="#1E93FF"
            variant="outline"
          >
            Exportar
          </Button>
        </Flex>
      </Flex>
      {dashboardStatus && (
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
      )}
      <TableContainer
        bg="#fff"
        borderRadius="12px"
        mt={!dashboardStatus ? '2rem' : '0'}
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
              <Th pl="1rem">Status</Th>
              <Th textAlign="center">Data Checkin</Th>
              <Th textAlign="center">Vendedor</Th>
              <Th textAlign="center">Região</Th>
              <Th textAlign="center">Cliente</Th>
              <Th textAlign="center">Pedido</Th>
              <Th textAlign="center">Observação</Th>
              <Th textAlign="center">Motivo Não-Venda</Th>
            </Tr>
          </Thead>
          <Tbody h="3rem">
            {data?.visits.map((visit, index) => (
              <Tr
                key={`tr-${index}`}
                fontSize="14px"
                h="3.5rem"
              >
                <Td pl="1rem">
                  {visit.status === 'Válida' && (
                    <Badge
                      bg="#1E93FF20"
                      borderRadius="8px"
                      color="#1E93FF"
                      fontSize="12px"
                      p=".75rem"
                    >
                      {visit.status}
                    </Badge>
                  )}
                  {['Inválida', 'Ignorada'].includes(visit.status) && (
                    <Badge
                      bg="#775DA620"
                      borderRadius="8px"
                      color="#775DA6"
                      fontSize="12px"
                      p=".75rem"
                      textAlign="center"
                      w="5.5rem"
                    >
                      {visit.status}
                    </Badge>
                  )}
                </Td>
                <Td textAlign="center">
                  {formatDate({ date: visit.date_checkin, showHours: true })}
                </Td>
                <Td textAlign="center">{visit.actor_id} ??</Td>
                <Td textAlign="center">
                  {visit.customer.address.city} / {visit.customer.address.state}
                </Td>
                <Td textAlign="center">{visit.customer.social_name}</Td>
                <Td
                  color="#1E93FF"
                  cursor="pointer"
                  textAlign="center"
                  textDecor="underline"
                >
                  <Link
                    href={`/mobile/order-details/${encodeURIComponent(visit.id)}`}
                    legacyBehavior
                    passHref
                  >
                    {visit.id}
                  </Link>
                </Td>
                <Td textAlign="center">
                  <Tooltip label={visit.visit_comments || 'NC'}>
                    <Box
                      as="span"
                      display="inline-block"
                      maxW="8rem"
                      overflow="hidden"
                      textOverflow="ellipsis"
                    >
                      {visit.visit_comments || 'NC'}
                    </Box>
                  </Tooltip>
                </Td>
                <Td textAlign="center">
                  {findNotSaleReason(
                    visit.not_sale_reason_id || 0,
                    notSaleReasonsData as NotSaleReasonType[],
                  )?.reason || 'NC'}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}

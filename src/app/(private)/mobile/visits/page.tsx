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
  Tr,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MdApps } from 'react-icons/md';
import { formatDate, formatDateForQuery } from 'src/commons/formatters';
import { PrivateLayout } from 'src/components/PrivateLayout';
import { ButtonFilter } from 'src/components/ui/ButtonFilter';
import { ButtonOutline } from 'src/components/ui/ButtonOutline';
import DatePicker from 'src/components/ui/DatePicker';
import { isPrivatePage } from 'src/contexts/AuthContext';
import { getVisits } from 'src/services/api/visits';

function VisitsPage() {
  const router = useRouter();

  const [dashboardStatus, setDashboardStatus] = useState<boolean>(true);
  const [selectedDates, setSelectedDates] = useState<Date[]>([
    new Date(),
    new Date(),
  ]);

  const { data, refetch } = useQuery({
    queryKey: ['visits'],
    queryFn: () =>
      getVisits({
        dateInit: formatDateForQuery(selectedDates[0]),
        dateEnd: formatDateForQuery(selectedDates[1]),
      }),
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
    <PrivateLayout>
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
            <ButtonOutline
              borderColor="#1E93FF"
              color="#1E93FF"
            >
              Exportar
            </ButtonOutline>
          </Flex>
        </Flex>
        {dashboardStatus && (
          <SimpleGrid
            columns={{ sm: 2, md: 3, lg: 3, xl: 6 }}
            p="2rem 0"
            spacing={{ sm: 5, md: 5, lg: 7 }}
          >
            {cardsContent.map((card, index) => (
              <Card
                key={index}
                align="center"
                h={{ 'base': '6rem', 'xl': '6rem', '2xl': '9rem' }}
                justify="center"
                variant="outline"
                w={{ 'base': '9rem', 'xl': '9rem', '2xl': '11rem' }}
              >
                <Text
                  fontSize={{ 'base': '14px', 'xl': '14px', '2xl': '20px' }}
                  fontWeight="500"
                >
                  {card.name}
                </Text>
                <Text
                  fontSize={{ 'base': '36px', 'xl': '36px', '2xl': '42px' }}
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
                    {visit.customer.address.city} /{' '}
                    {visit.customer.address.state}
                  </Td>
                  <Td textAlign="center">{visit.customer.social_name}</Td>
                  <Td
                    color="#1E93FF"
                    cursor="pointer"
                    textAlign="center"
                    textDecor="underline"
                    onClick={() =>
                      router.push(
                        `/mobile/order-details/${encodeURIComponent(visit.id)}`,
                      )
                    }
                  >
                    {visit.id} ??
                  </Td>
                  <Td textAlign="center">{visit.visit_comments || 'NC'}</Td>
                  <Td textAlign="center">
                    {visit.not_sale_reason_id || 'NC'} ??
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </PrivateLayout>
  );
}

export default isPrivatePage(VisitsPage);

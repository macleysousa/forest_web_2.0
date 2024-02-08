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
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MdApps } from 'react-icons/md';
import { PrivateLayout } from 'src/components/PrivateLayout';
import { ButtonFilter } from 'src/components/ui/ButtonFilter';
import { ButtonOutline } from 'src/components/ui/ButtonOutline';
import { isPrivatePage } from 'src/contexts/AuthContext';
import { getVisits } from 'src/services/api/visits';
import { useQuery } from '@tanstack/react-query';
import { formatDate, formatDateForQuery } from 'src/commons/formatters';
import DatePicker from 'src/components/ui/DatePicker';

function VisitsPage() {
  const router = useRouter();

  const [dashboardStatus, setDashboardStatus] = useState<boolean>(true);
  const [selectedDates, setSelectedDates] = useState<Date[]>([new Date(), new Date()]);

  const { data, refetch } = useQuery({
    queryKey: ['visits'],
    queryFn: () =>
      getVisits({ dateInit: formatDateForQuery(selectedDates[0]), dateEnd: formatDateForQuery(selectedDates[1]) }),
  });

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDates]);

  const cardsContent = [
    { name: 'Válidas', value: data?.visits.reduce((acc, curr) => (curr.status === 'Válida' ? acc + 1 : acc), 0) },
    { name: 'Inválidas', value: data?.visits.reduce((acc, curr) => (curr.status === 'Inválida' ? acc + 1 : acc), 0) },
    {
      name: 'Fora de Rota',
      value: data?.visits.reduce((acc, curr) => (curr.status === 'Fora de Rota' ? acc + 1 : acc), 0),
    },
    {
      name: 'Fora de Roteiro',
      value: data?.visits.reduce((acc, curr) => (curr.status === 'Fora de Roteiro' ? acc + 1 : acc), 0),
    },
    { name: 'Ignoradas', value: data?.visits.reduce((acc, curr) => (curr.status === 'Ignorada' ? acc + 1 : acc), 0) },
    {
      name: 'Tempo Médio',
      value: (
        Number(data?.visits.reduce((acc, curr) => acc + curr.duration, 0)) / Number(data?.visits.length) || 0
      ).toFixed(2),
    },
  ];

  return (
    <PrivateLayout>
      <Box p="2rem">
        <Flex>
          <Heading w="30%" minW="30%">
            Visitas
          </Heading>
          <Flex align="flex-end" justify="flex-end" minW="70%" w="70%" gap="1rem">
            <DatePicker onChange={setSelectedDates} />
            <ButtonFilter placeContent="flex-start" />
            <Button
              color={!dashboardStatus ? '#898989' : 'inherit'}
              variant={!dashboardStatus ? 'outline' : 'primary'}
              borderColor={!dashboardStatus ? '#89898970' : 'auto'}
              onClick={() => setDashboardStatus(!dashboardStatus)}
              w="9rem"
              p="0 1rem"
            >
              <Icon as={MdApps} mr="1rem" h="24px" w="24px" />
              Dashboard
            </Button>
            <ButtonOutline color="#1E93FF" borderColor="#1E93FF">
              Exportar
            </ButtonOutline>
          </Flex>
        </Flex>
        {dashboardStatus && (
          <SimpleGrid columns={{ sm: 2, md: 3, lg: 3, xl: 6 }} spacing={{ sm: 5, md: 5, lg: 7 }} p="2rem 0">
            {cardsContent.map((card, index) => (
              <Card
                variant="outline"
                w={{ base: '9rem', xl: '9rem', '2xl': '11rem' }}
                h={{ base: '6rem', xl: '6rem', '2xl': '9rem' }}
                justify="center"
                align="center"
                key={index}
              >
                <Text fontWeight="500" fontSize={{ base: '14px', xl: '14px', '2xl': '20px' }}>
                  {card.name}
                </Text>
                <Text fontWeight="700" fontSize={{ base: '36px', xl: '36px', '2xl': '42px' }}>
                  {card.value}
                </Text>
              </Card>
            ))}
          </SimpleGrid>
        )}
        <TableContainer p="1.5rem 1rem" bg="#fff" borderRadius="12px" mt={!dashboardStatus ? '2rem' : '0'}>
          <Table variant="striped" colorScheme="gray" size="xsm" fontSize="12px">
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
                <Tr key={`tr-${index}`} h="3.5rem" fontSize="14px">
                  <Td pl="1rem">
                    {visit.status === 'Válida' && (
                      <Badge fontSize="12px" color="#1E93FF" p=".75rem" borderRadius="8px" bg="#1E93FF20">
                        Válida
                      </Badge>
                    )}
                    {['Inválida', 'Ignorada'].includes(visit.status) && (
                      <Badge
                        fontSize="12px"
                        color="#775DA6"
                        p=".75rem"
                        borderRadius="8px"
                        bg="#775DA620"
                        w="5.5rem"
                        textAlign="center"
                      >
                        {visit.status}
                      </Badge>
                    )}
                  </Td>
                  <Td textAlign="center">{formatDate({ date: visit.date_checkin, showHours: true })}</Td>
                  <Td textAlign="center">{visit.actor_id} ??</Td>
                  <Td textAlign="center">??</Td>
                  <Td textAlign="center">{visit.customer.social_name}</Td>
                  <Td
                    textDecor="underline"
                    color="#1E93FF"
                    textAlign="center"
                    cursor="pointer"
                    onClick={() => router.push(`/mobile/order-details/${encodeURIComponent(visit.id)}`)}
                  >
                    {visit.id} ??
                  </Td>
                  <Td textAlign="center">{visit.visit_comments || 'NC'}</Td>
                  <Td textAlign="center">{visit.not_sale_reason_id || 'NC'} ??</Td>
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

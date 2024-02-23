'use client';

import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  Card,
  Flex,
  Heading,
  Icon,
  Select,
  SimpleGrid,
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

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { MdApps, MdDescription, MdMail } from 'react-icons/md';
import { ButtonFilter } from '../../../../components/ButtonFilter';
import { DatePicker } from '../../../../components/DatePicker';
import { getCustomers } from '../../../../services/api/customer';
import { getOrders } from '../../../../services/api/orders';

import {
  formatCurrency,
  formatDate,
  formatDateForQuery,
} from '../../../../utils/formatters';

const cardsContent = [
  { name: 'Pedidos', value: '374' },
  { name: 'Pendentes', value: '239' },
  { name: 'Faturados', value: '22' },
  { name: 'Cobertura', value: '190' },
  { name: 'Programados', value: '460' },
];

const statusColors = [
  { color: '#1E93FF', status: 'aprovado' },
  { color: '#FFC107', status: 'aguardando aprovação' },
  { color: '#F44336', status: 'cancelado' },
  { color: '#4CAF50', status: 'enviado para faturamento' },
  { color: '#FF9800', status: 'enviado para separação' },
  { color: '#00897B', status: 'faturado' },
  { color: '#FFEB3B', status: 'faturado parcial' },
  { color: '#E91E63', status: 'outras pendências' },
  { color: '#FF5722', status: 'pendência financeira' },
  { color: '#9C27B0', status: 'pendente de estoque' },
  { color: '#00BCD4', status: 'recebido' },
  { color: '#D32F2F', status: 'reprovado' },
];

const setStatusColor = (status: string) => {
  const statusFound = statusColors.find(
    (color) => color.status === status.toLowerCase(),
  );
  return statusFound?.color;
};

export default function OrderDetailsPage() {
  const toast = useToast();
  const [dashboardStatus, setDashboardStatus] = useState<boolean>(true);
  const [selectedDates, setSelectedDates] = useState<Date[]>([
    new Date(),
    new Date(),
  ]);

  const { data: customersData } = useQuery({
    queryFn: getCustomers,
    queryKey: ['customers'],
    retry: 5,
  });

  const {
    data: ordersData,
    error: ordersError,
    refetch: orderRefetch,
  } = useQuery({
    queryFn: () =>
      getOrders({
        dateEnd: formatDateForQuery(selectedDates[1] as Date),
        dateInit: formatDateForQuery(selectedDates[0] as Date),
      }),
    queryKey: ['orders'],
    retry: 5,
  });

  useEffect(() => {
    orderRefetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDates]);

  const handleError = (error: any) => {
    console.error(error);
    toast({ description: 'Erro ao buscar os pedidos', status: 'error' });
  };

  if (ordersError) handleError(ordersError);

  const findCustomerName = (id: string | number) => {
    const customerFound = customersData?.find(
      (customer) => String(customer.id) === String(id),
    );
    return customerFound?.social_name;
  };

  return (
    <Box p="2rem">
      <Flex>
        <Heading
          minW="30%"
          w="30%"
        >
          Pedidos App
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
            color={!dashboardStatus ? '#898989' : '#fff'}
            p="0 1rem"
            variant={!dashboardStatus ? 'outline' : 'solid'}
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
          <Link
            href={`/mobile/order-details/${encodeURIComponent(' ')}`}
            legacyBehavior
            passHref
          >
            <Button
              as="a"
              variant="solid"
            >
              Novo Pedido
            </Button>
          </Link>
        </Flex>
      </Flex>
      {dashboardStatus && (
        <SimpleGrid
          columns={{ lg: 3, md: 3, sm: 2, xl: 5 }}
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
              <Th
                pl="1rem"
                w="18%"
              >
                Status
              </Th>
              <Th textAlign="center">Data</Th>
              <Th textAlign="center">Pedido</Th>
              <Th textAlign="center">Vendedor</Th>
              <Th textAlign="center">Ator</Th>
              <Th textAlign="center">Cliente</Th>
              <Th textAlign="center">Pagamento</Th>
              <Th textAlign="center">Valor Pedido</Th>
            </Tr>
          </Thead>
          <Tbody h="3rem">
            {ordersData?.orders.map((order, index) => (
              <Tr
                key={`tr-${index}`}
                fontSize="14px"
                h="3rem"
              >
                <Td pl="1rem">
                  <Badge
                    bg={setStatusColor(order.status) + '20' || '#1E93FF20'}
                    borderRadius="8px"
                    color={setStatusColor(order.status) || '#1E93FF'}
                    fontSize="12px"
                    p="5px"
                  >
                    {order.status}
                  </Badge>
                </Td>
                <Td textAlign="center">
                  {formatDate({ date: order.date_sync, showHours: true })}
                </Td>
                <Td
                  color="#1E93FF"
                  cursor="pointer"
                  textAlign="center"
                  textDecor="underline"
                >
                  <Link
                    href={`/mobile/order-details/${encodeURIComponent(order.id)}`}
                    legacyBehavior
                    passHref
                  >
                    {order.id}
                  </Link>
                </Td>
                <Td textAlign="center">{order.customer_id}</Td>
                <Td textAlign="center">??</Td>
                <Td
                  textAlign="center"
                  w="15%"
                >
                  <Box
                    as="span"
                    display="inline-block"
                    maxW="10rem"
                    overflow="hidden"
                    textOverflow="ellipsis"
                  >
                    {findCustomerName(order.customer_id)}
                  </Box>
                  <Icon
                    as={MdDescription}
                    h="16px"
                    mx=".25rem"
                    w="16px"
                  />
                  <Icon
                    as={MdMail}
                    h="16px"
                    mx=".25rem"
                    w="16px"
                  />
                </Td>
                <Td textAlign="center">{order.payment_option_name}</Td>
                <Td textAlign="center">
                  {formatCurrency(Number(order.total_value))}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Flex
        color="#898989"
        fontSize="14px"
        justify="space-between"
        my="2rem"
        w="100%"
      >
        <Flex
          align="center"
          w="50%"
        >
          <Text>Mostrando</Text>
          <Select
            h="2rem"
            mx="1rem"
            w="4.5rem"
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </Select>
          <Text>Itens por página</Text>
        </Flex>
        <Box>
          <ButtonGroup spacing={6}>
            <Button
              borderColor="#1E93FF"
              color="#898989"
              colorScheme="white"
              fontSize="14px"
              h="2rem"
              variant="outline"
              w="2rem"
            >
              1
            </Button>
            <Button
              color="#898989"
              fontSize="14px"
              h="2rem"
              variant="ghost"
              w="2rem"
            >
              2
            </Button>
            <Button
              color="#898989"
              fontSize="14px"
              h="2rem"
              variant="ghost"
              w="2rem"
            >
              Prox.
            </Button>
            <Button
              color="#898989"
              fontSize="14px"
              h="2rem"
              variant="ghost"
              w="2rem"
            >
              Fim
            </Button>
          </ButtonGroup>
        </Box>
      </Flex>
    </Box>
  );
}

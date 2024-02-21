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
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MdApps, MdDescription, MdMail } from 'react-icons/md';
import {
  formatCurrency,
  formatDate,
  formatDateForQuery,
} from 'src/commons/formatters';
import { PrivateLayout } from 'src/components/PrivateLayout';
import { ButtonFilter } from 'src/components/ui/ButtonFilter';
import { ButtonOutline } from 'src/components/ui/ButtonOutline';
import { ButtonPrimary } from 'src/components/ui/ButtonPrimary';
import DatePicker from 'src/components/ui/DatePicker';
import { isPrivatePage } from 'src/contexts/AuthContext';
import { getCustomers } from 'src/services/api/customer';
import { getOrders } from 'src/services/api/orders';

function OrderDetailsPage() {
  const router = useRouter();
  const toast = useToast();
  const [dashboardStatus, setDashboardStatus] = useState<boolean>(true);
  const [selectedDates, setSelectedDates] = useState<Date[]>([
    new Date(),
    new Date(),
  ]);

  const cardsContent = [
    { name: 'Pedidos', value: '374' },
    { name: 'Pendentes', value: '239' },
    { name: 'Faturados', value: '22' },
    { name: 'Cobertura', value: '190' },
    { name: 'Programados', value: '460' },
  ];

  const { data: customersData } = useQuery({
    queryKey: ['customers'],
    retry: 5,
    queryFn: getCustomers,
  });

  const {
    data: ordersData,
    error: ordersError,
    refetch: orderRefetch,
  } = useQuery({
    queryKey: ['orders'],
    retry: 5,
    queryFn: () =>
      getOrders({
        dateInit: formatDateForQuery(selectedDates[0]),
        dateEnd: formatDateForQuery(selectedDates[1]),
      }),
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
    const customer = customersData?.find(
      (customer: any) => String(customer.id) === String(id),
    );
    return customer?.social_name;
  };

  return (
    <PrivateLayout>
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
            <ButtonPrimary
              onClick={() =>
                router.push(`/mobile/order-details/${encodeURIComponent(' ')}`)
              }
            >
              Novo Pedido
            </ButtonPrimary>
          </Flex>
        </Flex>
        {dashboardStatus && (
          <SimpleGrid
            columns={{ sm: 2, md: 3, lg: 3, xl: 5 }}
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
                      bg="#1E93FF20"
                      borderRadius="8px"
                      color="#1E93FF"
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
                    onClick={() =>
                      router.push(
                        `/mobile/order-details/${encodeURIComponent(order.id)}`,
                      )
                    }
                  >
                    {order.id}
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
                  <Td textAlign="center">{order.payment_option_id} ??</Td>
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
    </PrivateLayout>
  );
}

export default isPrivatePage(OrderDetailsPage);

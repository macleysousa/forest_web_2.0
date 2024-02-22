'use client';

import {
  Box,
  Heading,
  Flex,
  Icon,
  Card,
  SimpleGrid,
  Text,
  Badge,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Select,
  Button,
  ButtonGroup,
  useToast,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MdApps, MdDescription, MdMail } from 'react-icons/md';
import { useQuery } from '@tanstack/react-query';
import { formatCurrency, formatDate, formatDateForQuery } from 'src/commons/formatters';
import { PrivateLayout } from 'src/components/PrivateLayout';
import { ButtonFilter } from 'src/components/ui/ButtonFilter';
import { ButtonOutline } from 'src/components/ui/ButtonOutline';
import { ButtonPrimary } from 'src/components/ui/ButtonPrimary';
import { isPrivatePage } from 'src/contexts/AuthContext';
import { getCustomers } from 'src/services/api/customer';
import { getOrders } from 'src/services/api/orders';
import DatePicker from 'src/components/ui/DatePicker';

function OrderDetailsPage() {
  const router = useRouter();
  const toast = useToast();
  const [dashboardStatus, setDashboardStatus] = useState<boolean>(true);
  const [selectedDates, setSelectedDates] = useState<Date[]>([new Date(), new Date()]);

  const cardsContent = [
    { name: 'Pedidos', value: '374' },
    { name: 'Pendentes', value: '239' },
    { name: 'Faturados', value: '22' },
    { name: 'Cobertura', value: '190' },
    { name: 'Programados', value: '460' },
  ];

  const { data: customersData } = useQuery({ queryKey: ['customers'], retry: 5, queryFn: getCustomers });

  const {
    data: ordersData,
    error: ordersError,
    refetch: orderRefetch,
  } = useQuery({
    queryKey: ['orders'],
    retry: 5,
    queryFn: () =>
      getOrders({ dateInit: formatDateForQuery(selectedDates[0]), dateEnd: formatDateForQuery(selectedDates[1]) }),
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
    const customer = customersData?.find((customer: any) => String(customer.id) === String(id));
    return customer?.social_name;
  };

  return (
    <PrivateLayout>
      <Box p="2rem">
        <Flex>
          <Heading w="30%" minW="30%">
            Pedidos App
          </Heading>
          <Flex align="flex-end" justify="flex-end" minW="70%" w="70%" gap="1rem">
            <DatePicker onChange={setSelectedDates} />
            <ButtonFilter placeContent="flex-start" />
            <Button
              w="9rem"
              p="0 1rem"
              onClick={() => setDashboardStatus(!dashboardStatus)}
              color={!dashboardStatus ? '#898989' : 'inherit'}
              variant={!dashboardStatus ? 'outline' : 'primary'}
              borderColor={!dashboardStatus ? '#89898970' : 'auto'}
            >
              <Icon as={MdApps} mr="1rem" h="24px" w="24px" />
              Dashboard
            </Button>
            <ButtonOutline color="#1E93FF" borderColor="#1E93FF">
              Exportar
            </ButtonOutline>
            <ButtonPrimary onClick={() => router.push(`/mobile/order-details/${encodeURIComponent(' ')}`)}>
              Novo Pedido
            </ButtonPrimary>
          </Flex>
        </Flex>
        {dashboardStatus && (
          <SimpleGrid columns={{ sm: 2, md: 3, lg: 3, xl: 5 }} spacing={{ sm: 5, md: 5, lg: 7 }} p="2rem 0">
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
                <Th pl="1rem" w="18%">
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
                <Tr key={`tr-${index}`} h="3rem" fontSize="14px">
                  <Td pl="1rem">
                    <Badge fontSize="12px" color="#1E93FF" p="5px" borderRadius="8px" bg="#1E93FF20">
                      {order.status}
                    </Badge>
                  </Td>
                  <Td textAlign="center">{formatDate({ date: order.date_sync, showHours: true })}</Td>
                  <Td
                    textDecor="underline"
                    color="#1E93FF"
                    textAlign="center"
                    cursor="pointer"
                    onClick={() => router.push(`/mobile/order-details/${encodeURIComponent(order.id)}`)}
                  >
                    {order.id}
                  </Td>
                  <Td textAlign="center">{order.customer_id}</Td>
                  <Td textAlign="center">??</Td>
                  <Td textAlign="center" w="15%">
                    <Box maxW="10rem" overflow="hidden" textOverflow="ellipsis" as="span" display="inline-block">
                      {findCustomerName(order.customer_id)}
                    </Box>
                    <Icon as={MdDescription} mx=".25rem" w="16px" h="16px" />
                    <Icon as={MdMail} mx=".25rem" w="16px" h="16px" />
                  </Td>
                  <Td textAlign="center">{order.payment_option_name}</Td>
                  <Td textAlign="center">{formatCurrency(Number(order.total_value))}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        <Flex w="100%" justify="space-between" my="2rem" fontSize="14px" color="#898989">
          <Flex w="50%" align="center">
            <Text>Mostrando</Text>
            <Select w="4.5rem" h="2rem" mx="1rem">
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
            </Select>
            <Text>Itens por página</Text>
          </Flex>
          <Box>
            <ButtonGroup spacing={6}>
              <Button
                h="2rem"
                w="2rem"
                fontSize="14px"
                variant="outline"
                colorScheme="white"
                borderColor="#1E93FF"
                color="#898989"
              >
                1
              </Button>
              <Button h="2rem" w="2rem" fontSize="14px" variant="ghost" color="#898989">
                2
              </Button>
              <Button h="2rem" w="2rem" fontSize="14px" variant="ghost" color="#898989">
                Prox.
              </Button>
              <Button h="2rem" w="2rem" fontSize="14px" variant="ghost" color="#898989">
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

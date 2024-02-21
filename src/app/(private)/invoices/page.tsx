'use client';
import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
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
import { RangeDatepicker } from 'chakra-dayzed-datepicker';
import { useEffect, useState } from 'react';
import {
  MdArrowDownward,
  MdArrowDropDown,
  MdArrowUpward,
  MdCalendarToday,
} from 'react-icons/md';
import { dayNames, monthNames } from 'src/commons/dateUtils';
import { PrivateLayout } from 'src/components/PrivateLayout';
import { getNFEs } from 'src/services/api/nfes';

type Nfe = Awaited<ReturnType<typeof getNFEs>>['nfes']['data'][number];

const OrderType = {
  date: 'Data',
};

const Order = {
  asc: 'Ascendente' as const,
  desc: 'Decrescente' as const,
};

const formatPeriod = (period: string) =>
  period.replace(/(\d{2}-\d{2})-\d{4}/g, '$1').replace(/-/g, '/');
const formatCNPJ = (cnpj: string) =>
  cnpj.replace(/^(\d{3})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');

export default function InvoicesPage() {
  const toast = useToast();

  const [state, setState] = useState({
    orderType: 'date' as keyof typeof OrderType,
    order: 'desc' as keyof typeof Order,
    period: '01-01-2024 a 31-12-2024',
    page: '1',
    hasNextPage: false,
    nfes: [] as Nfe[],
    totalQuantity: 0,
    totalQuantityMix: 0,
    valueTotal: 0,
    cobertura: 0,
  });

  useEffect(() => {
    getNFEs({
      order: state.order,
      order_type: state.orderType,
      period: state.period,
      page: state.page,
      has_filters: '1',
    })
      .then((result) => {
        const { data, totals } = result.nfes;
        const hasNextPage = result.nfes.next_page_url !== null;

        setState((prev) => {
          // this prevents the same data from being concatenated when hot reload happens in dev mode
          // there is a small chance of a bug? yes, but it is a risk taken
          if (process.env.NODE_ENV !== 'production') {
            if (JSON.stringify(data) === JSON.stringify(prev.nfes)) {
              return { ...prev, hasNextPage };
            }
          }

          return {
            ...prev,
            hasNextPage,
            nfes: prev.nfes.concat(data),
            totalQuantity: prev.totalQuantity + totals.total_quantity,
            totalQuantityMix: prev.totalQuantityMix + totals.total_quantity_mix,
            valueTotal: prev.valueTotal + totals.value_total,
            cobertura: prev.cobertura + totals.cobertura,
          };
        });
      })
      .catch((error) => {
        toast({ status: 'error', title: error.message });
      });
  }, [state.order, state.orderType, state.period, state.page, toast]);

  const handleOrderChange = (order: keyof typeof Order) => () => {
    if (state.order === order) return;
    setState({
      ...state,
      order,
      page: '1',
      nfes: [],
      totalQuantity: 0,
      totalQuantityMix: 0,
      valueTotal: 0,
      cobertura: 0,
    });
  };

  const handleNextPage = () => {
    setState({ ...state, page: String(Number(state.page) + 1) });
  };

  return (
    <PrivateLayout>
      <Box padding="2rem">
        <Flex alignItems="center">
          <Heading>Notas Fiscais</Heading>
          <Flex
            gap="1rem"
            marginLeft="auto"
          >
            <Box position="relative">
              <Button
                bg="white"
                border="1px solid #DCDCDC"
                fontWeight="400"
                h="2.5rem"
                rightIcon={<MdArrowDropDown color="#898989" />}
                size="sm"
              >
                <Text
                  as="span"
                  color="#898989"
                  display="inline-block"
                >
                  Período
                </Text>
              </Button>
              <RangeDatepicker
                configs={{ monthNames, dayNames, firstDayOfWeek: 0 }}
                propsConfigs={{
                  inputProps: {
                    position: 'absolute',
                    left: '0',
                    w: '100%',
                    h: '2.5rem',
                    size: 'sm',
                    opacity: '0',
                  },
                }}
                selectedDates={state.period
                  .split(' a ')
                  .map(
                    (value) =>
                      new Date(
                        `${value.split('-').reverse().join('-')}T00:00:00.000-03:00`,
                      ),
                  )}
                onDateChange={(date) => console.log(date)}
              />
            </Box>
            <Menu>
              <MenuButton
                as={Button}
                bg="white"
                border="1px solid #DCDCDC"
                fontWeight="400"
                h="2.5rem"
                rightIcon={<MdArrowDropDown color="#898989" />}
                size="sm"
              >
                <Text
                  as="span"
                  color="#898989"
                  display="inline-block"
                  mr="0.25rem"
                >
                  Ordenar por:
                </Text>
                {OrderType[state.orderType]}
              </MenuButton>
              <MenuList>
                <MenuItem
                  fontSize="sm"
                  icon={<MdCalendarToday />}
                  onClick={() => setState({ ...state, orderType: 'date' })}
                >
                  {OrderType.date}
                </MenuItem>
              </MenuList>
            </Menu>
            <Menu>
              <MenuButton
                as={Button}
                bg="white"
                border="1px solid #DCDCDC"
                fontWeight="400"
                h="2.5rem"
                rightIcon={<MdArrowDropDown color="#898989" />}
                size="sm"
              >
                <Text
                  as="span"
                  color="#898989"
                  display="inline-block"
                  mr="0.25rem"
                >
                  Ordem:
                </Text>
                {Order[state.order]}
              </MenuButton>
              <MenuList>
                <MenuItem
                  fontSize="sm"
                  icon={<MdArrowUpward />}
                  onClick={handleOrderChange('asc')}
                >
                  {Order.asc}
                </MenuItem>
                <MenuItem
                  fontSize="sm"
                  icon={<MdArrowDownward />}
                  onClick={handleOrderChange('desc')}
                >
                  {Order.desc}
                </MenuItem>
              </MenuList>
            </Menu>
            <Button
              bg="#FFFFFF"
              border="1px solid #1E93FF"
              color="#1E93FF"
              h="2.5rem"
              size="sm"
              isDisabled
            >
              Exportar
            </Button>
          </Flex>
        </Flex>
        <Flex
          justifyContent="space-between"
          marginLeft="auto"
          marginRight="auto"
          marginTop="1.5rem"
          maxWidth="80rem"
        >
          {[
            {
              label: 'Período',
              value: (
                <>
                  de {formatPeriod(state.period).split(' a ')[0]}
                  <br />a {formatPeriod(state.period).split(' a ')[1]}
                </>
              ),
              size: 'lg',
            },
            {
              label: 'Volume',
              value: state.totalQuantity.toLocaleString('pt-BR'),
              size: '2xl',
            },
            {
              label: 'Volume Mix',
              value: state.totalQuantityMix.toLocaleString('pt-BR'),
              size: '2xl',
            },
            {
              label: 'Cobertura',
              value: state.cobertura.toLocaleString('pt-BR'),
              size: '4xl',
            },
            { label: 'Produtos', value: '00', size: '4xl' },
            {
              label: 'Valor Total',
              value: state.valueTotal.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }),
              size: 'sm',
            },
          ].map(({ label, value, size }) => (
            <Flex
              key={label}
              background="#FFFFFF"
              border="1px solid #DCDCDC"
              borderRadius="0.5rem"
              flexDirection="column"
              height="6.8125rem"
              paddingBottom="1.25rem"
              paddingTop="1.25rem"
              textAlign="center"
              width="9rem"
            >
              <Text fontSize="sm">{label}</Text>
              <Flex
                alignItems="center"
                flexGrow="1"
                justifyContent="center"
              >
                <Text
                  fontSize={size}
                  fontWeight="700"
                >
                  {value}
                </Text>
              </Flex>
            </Flex>
          ))}
        </Flex>
        <TableContainer
          background="#FFFFFF"
          borderRadius="0.5rem"
          boxShadow="base"
          marginTop="1.5rem"
        >
          <Table>
            <Thead>
              <Tr>
                <Th textTransform="none">Emissor</Th>
                <Th
                  textAlign="center"
                  textTransform="none"
                >
                  Número
                </Th>
                <Th
                  textAlign="center"
                  textTransform="none"
                >
                  Tipo
                </Th>
                <Th
                  textAlign="center"
                  textTransform="none"
                >
                  Data de Emissão
                </Th>
                <Th
                  textAlign="center"
                  textTransform="none"
                >
                  Cliente
                </Th>
                <Th
                  textAlign="center"
                  textTransform="none"
                >
                  Cidade/UF
                </Th>
                <Th
                  textAlign="center"
                  textTransform="none"
                >
                  Segmento
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {state.nfes.map((nfe, i) => (
                <Tr
                  key={`${nfe.id}-${i}`}
                  background={i % 2 === 0 ? '#FFFFFF' : '#F9F9F9'}
                >
                  <Td padding="1.25rem 0.75rem">
                    <Box
                      alignItems="center"
                      display="inline-flex"
                      flexDirection="column"
                      gap="0.5rem"
                      w="100%"
                    >
                      <Text
                        as="span"
                        fontSize="xs"
                        textDecoration="underline"
                      >
                        {nfe.customer_emitter_social_name}
                      </Text>
                      <Text
                        as="span"
                        background="#E9F1F2"
                        color="#70B6C1"
                        fontSize="xs"
                        textAlign="center"
                        w="100%"
                      >
                        {formatCNPJ(nfe.customer_emitter_cnpj)}
                      </Text>
                    </Box>
                  </Td>
                  <Td
                    padding="1.25rem 0.75rem"
                    textAlign="center"
                  >
                    <Text
                      as="span"
                      fontSize="xs"
                    >
                      {nfe.number_nfe}
                    </Text>
                  </Td>
                  <Td
                    padding="1.25rem 0.75rem"
                    textAlign="center"
                  >
                    <Badge
                      background="#E9E6EF"
                      color="#775DA6"
                    >
                      {nfe.type}
                    </Badge>
                  </Td>
                  <Td
                    padding="1.25rem 0.75rem"
                    textAlign="center"
                  >
                    <Text
                      as="span"
                      fontSize="xs"
                    >
                      {(nfe.date.split(' ')[0] ?? '')
                        .split('-')
                        .reverse()
                        .join('/')}
                    </Text>
                    <br />
                    <Text
                      as="span"
                      fontSize="xs"
                    >
                      {(nfe.date.split(' ')[1] ?? '').replace(
                        /^(\d{2}:\d{2}):\d{2}$/,
                        '$1',
                      )}
                    </Text>
                  </Td>
                  <Td padding="1.25rem 0.75rem">
                    <Box
                      alignItems="center"
                      display="inline-flex"
                      flexDirection="column"
                      gap="0.5rem"
                      w="100%"
                    >
                      <Text
                        as="span"
                        fontSize="xs"
                        textDecoration="underline"
                      >
                        {nfe.customer_receiver_social_name}
                      </Text>
                      <Text
                        as="span"
                        background="#E9F1F2"
                        color="#70B6C1"
                        fontSize="xs"
                        textAlign="center"
                        w="100%"
                      >
                        {formatCNPJ(nfe.customer_receiver_cnpj)}
                      </Text>
                    </Box>
                  </Td>
                  <Td
                    padding="1.25rem 0.75rem"
                    textAlign="center"
                  >
                    <Text
                      as="span"
                      fontSize="xs"
                    >
                      {nfe.city} - {nfe.state}
                    </Text>
                  </Td>
                  <Td
                    padding="1.25rem 0.75rem"
                    textAlign="center"
                  >
                    <Text
                      as="span"
                      fontSize="xs"
                    >
                      {nfe.segment_name}
                    </Text>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        <Flex
          justify="center"
          mt="2rem"
        >
          <Button
            bg="#FFFFFF"
            border="1px solid #1E93FF"
            color="#1E93FF"
            h="2.5rem"
            isDisabled={!state.hasNextPage}
            size="sm"
            onClick={handleNextPage}
          >
            Carregar mais
          </Button>
        </Flex>
      </Box>
    </PrivateLayout>
  );
}

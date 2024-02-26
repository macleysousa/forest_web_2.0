'use client';

import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Flex,
  Heading,
  Icon,
  Image,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Table,
  Tbody,
  Td,
  Text,
  Textarea,
  Thead,
  Tr,
  useToast,
} from '@chakra-ui/react';

import { useQuery } from '@tanstack/react-query';
import { SingleDatepicker } from 'chakra-dayzed-datepicker';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BiSolidEditAlt } from 'react-icons/bi';
import { IoMdEye, IoMdEyeOff, IoMdTrash } from 'react-icons/io';
import { IoBagCheckSharp } from 'react-icons/io5';

import {
  MdArrowDropDown,
  MdCheckCircle,
  MdClose,
  MdDescription,
  MdEventNote,
  MdFileDownload,
  MdLocalShipping,
  MdMoreHoriz,
  MdPayments,
  MdViewWeek,
} from 'react-icons/md';

import { getOrderById } from '../../../../../services/api/ordersDetailId';
import {
  formatCNPJ,
  formatCurrency,
  formatDate,
} from '../../../../../utils/formatters';

type PageStatusType = 'create' | 'edit' | 'show';
type CommentsType = 'order' | 'billing';
type OrderProductType = {
  product: { name: string };
  product_code: string;
  quantity: number;
  unity_price: string;
};

export default function ShowOrderPage() {
  const params = useParams();
  const toast = useToast();
  const router = useRouter();

  const [isContentVisible, setIsContentVisible] = useState<boolean>(true);
  const [pageStatus, setPageStatus] = useState<PageStatusType>('create');
  const [currentComments, setCurrentComments] = useState<CommentsType>('order');
  const [newProducts] = useState<OrderProductType[]>([]);
  const [date, setDate] = useState(new Date());

  const canShowContent = isContentVisible && pageStatus !== 'create';
  const isValidParam = params?.id !== ' ' && !!Number(params?.id);

  const { data } = useQuery({
    queryFn: () => getOrderById(String(params?.id)),
    queryKey: ['order', params.id],
  });

  const handleCancel = () => {
    if (pageStatus === 'create') router.replace('/mobile/order-details');
    else if (pageStatus === 'edit') setPageStatus('show');
  };

  useEffect(() => {
    if (isValidParam) setPageStatus('show');
    else setPageStatus('create');
  }, [isValidParam, params.id]);

  return (
    <Box p="2rem">
      <Flex alignItems="end">
        <Heading
          color="#898989"
          fontSize="24px"
          minW="30%"
          w="30%"
        >
          Pedidos/
          <Text
            as="span"
            color="#202020"
          >
            {isValidParam ? params?.id : ''}
          </Text>
        </Heading>
        <Flex
          align="flex-end"
          gap="1rem"
          justify="flex-end"
          minW="70%"
          w="70%"
        >
          {['create', 'edit'].includes(pageStatus) ? (
            <>
              <Button
                p="0 1rem"
                variant="solid"
                w="9rem"
              >
                Salvar
              </Button>
              <Button
                variant="outline"
                onClick={handleCancel}
              >
                Cancelar
              </Button>
            </>
          ) : (
            <>
              <Button
                borderColor="#DCDCDC"
                color="#202020"
                fontWeight="500"
                variant="outline"
              >
                <Icon
                  as={MdFileDownload}
                  h="24px"
                  w="24px"
                />
                Visualizar PDF
              </Button>
              <Button
                maxW="11rem"
                p="0 1rem"
                variant="solid"
                w="fit-content"
              >
                [{data?.status}]
              </Button>
            </>
          )}
        </Flex>
      </Flex>
      <Flex
        my="2rem"
        w="100%"
        direction={{
          'lg': 'column',
          'md': 'column',
          'sm': 'column',
          'xl': 'row',
          // eslint-disable-next-line canonical/sort-keys
          '2xl': 'row',
        }}
      >
        <Flex
          direction="column"
          w={{
            'lg': '100%',
            'md': '100%',
            'sm': '100%',
            'xl': '70%',
            // eslint-disable-next-line canonical/sort-keys
            '2xl': '70%',
            '3xl': '70%',
          }}
        >
          <Flex
            gap={5}
            justifyContent="space-between"
            mb="2rem"
            w="100%"
          >
            <Card
              h="8rem"
              w="17rem"
            >
              <CardHeader>
                <Flex justify="space-between">
                  <Text>Volume Mix</Text>
                  <Icon
                    as={MdViewWeek}
                    color="#1E93FF"
                    h="24px"
                    w="24px"
                  />
                </Flex>
                <Text
                  fontSize="24px"
                  fontWeight="700"
                  my=".5rem"
                >
                  {canShowContent ? data?.total_quantity_mix : '--'}
                </Text>
              </CardHeader>
            </Card>
            <Card
              h="8rem"
              w="17rem"
            >
              <CardHeader>
                <Flex justify="space-between">
                  <Text>Volume</Text>
                  <Icon
                    as={IoBagCheckSharp}
                    color="#1E93FF"
                    h="24px"
                    w="24px"
                  />
                </Flex>
                <Text
                  fontSize="24px"
                  fontWeight="700"
                  my=".5rem"
                >
                  {canShowContent ? data?.total_quantity : '--'} csx
                </Text>
              </CardHeader>
            </Card>
            <Card
              h="8rem"
              w="17rem"
            >
              <CardHeader>
                <Flex justify="space-between">
                  <Text>Valor do Pedido</Text>
                  <Flex>
                    <Icon
                      as={canShowContent ? IoMdEyeOff : IoMdEye}
                      cursor="pointer"
                      h="24px"
                      mr=".5rem"
                      w="24px"
                      onClick={() => setIsContentVisible(!isContentVisible)}
                    />
                    <Icon
                      as={MdPayments}
                      color="#1E93FF"
                      h="24px"
                      w="24px"
                    />
                  </Flex>
                </Flex>
                <Text
                  fontSize="24px"
                  fontWeight="700"
                  my=".5rem"
                >
                  {canShowContent ? data?.total_value : 'R$ --'}
                </Text>
              </CardHeader>
            </Card>
          </Flex>

          <Card
            minW="29.5rem"
            px="1rem"
          >
            <CardHeader
              display="flex"
              justifyContent="space-between"
            >
              <Text>
                {canShowContent ? data?.customer?.fantasy_name : '--'}
              </Text>
              <Menu placement="bottom-end">
                <MenuButton>
                  <Icon
                    as={MdMoreHoriz}
                    cursor="pointer"
                    h="24px"
                    w="24px"
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem
                    fontWeight="500"
                    onClick={() =>
                      pageStatus === 'create'
                        ? toast({
                            description:
                              'Não é possivel editar o pedido no momento',
                            status: 'error',
                          })
                        : setPageStatus('edit')
                    }
                  >
                    <Icon
                      as={BiSolidEditAlt}
                      h="20px"
                      mr="1rem"
                      w="20px"
                    />
                    Editar Pedido
                  </MenuItem>
                  <MenuItem
                    fontWeight="500"
                    onClick={() =>
                      pageStatus === 'create'
                        ? toast({
                            description:
                              'Não é possivel cancelar o pedido no momento',
                            status: 'error',
                          })
                        : console.log('cancelar')
                    }
                  >
                    <Icon
                      as={IoMdTrash}
                      h="20px"
                      mr="1rem"
                      w="20px"
                    />
                    Cancelar
                  </MenuItem>
                </MenuList>
              </Menu>
            </CardHeader>
            <Divider />
            <Box
              display="flex"
              h="15rem"
            >
              <Box
                p="1rem"
                w="50%"
              >
                <Flex
                  align="center"
                  justify="space-between"
                >
                  <Text color="#898989">CNPJ</Text>
                  {pageStatus === 'create' ? (
                    <Input
                      bg="#fff"
                      h="2rem"
                      placeholder="Nome ou CNPJ"
                      w="50%"
                    />
                  ) : (
                    <Text>
                      {canShowContent
                        ? formatCNPJ(data?.customer?.cnpj ?? '')
                        : '--'}
                    </Text>
                  )}
                </Flex>
                <Flex
                  justify="space-between"
                  my="1rem"
                >
                  <Text color="#898989">Endereço</Text>
                  <Flex
                    align="flex-end"
                    direction="column"
                    gap=".75rem"
                    minW="6rem"
                  >
                    <Text
                      maxH="3rem"
                      maxW="80%"
                      overflow="hidden"
                      textAlign="end"
                      textOverflow="ellipsis"
                      w="80%"
                    >
                      {canShowContent
                        ? `${data?.customer.address.address}, ${data?.customer.address.number}`
                        : '--'}
                    </Text>
                    <Text>
                      {canShowContent
                        ? `${data?.customer.address.city} - ${data?.customer.address.state}`
                        : '--'}
                    </Text>
                    <Text>
                      {canShowContent ? data?.customer.address.zip : '--'}
                    </Text>
                  </Flex>
                </Flex>
                <Flex justify="space-between">
                  <Text color="#898989">Grupo</Text>
                  <Text>{canShowContent ? data?.customer.cnpj : ''}</Text>
                </Flex>
              </Box>
              <Divider orientation="vertical" />
              <Flex
                direction="column"
                justify="space-between"
                p="1rem"
                w="50%"
              >
                <Flex justify="space-between">
                  <Text color="#898989">Data do Pedido</Text>
                  {pageStatus === 'create' ? (
                    <Flex
                      align="center"
                      border="1px solid #DCDCDC"
                      borderRadius={5}
                      pr="1rem"
                      w="50%"
                    >
                      <SingleDatepicker
                        date={date}
                        name="date-input"
                        propsConfigs={{
                          inputProps: {
                            bg: '#fff',
                            border: 'none',
                            h: '2rem',
                            placeholder: 'Data do Pedido',
                            w: '90%',
                          },
                        }}
                        onDateChange={setDate}
                      />
                      <Icon as={MdEventNote} />
                    </Flex>
                  ) : (
                    <Text>
                      {(canShowContent &&
                        formatDate({
                          date: data?.date ?? '',
                          showHours: true,
                        })) ||
                        '-'}
                    </Text>
                  )}
                </Flex>
                <Flex justify="space-between">
                  <Text color="#898989">Data do Envio</Text>
                  <Text>
                    {(canShowContent &&
                      formatDate({
                        date: data?.date_send ?? '',
                        showHours: true,
                      })) ||
                      '-'}
                  </Text>
                </Flex>
                <Flex justify="space-between">
                  <Text color="#898989">Data do Faturamento</Text>
                  <Text>
                    {(canShowContent &&
                      formatDate({
                        date: data?.date_billing ?? '',
                        showHours: true,
                      })) ||
                      '-'}
                  </Text>
                </Flex>
                <Flex justify="space-between">
                  <Text color="#898989">Nota Fiscal</Text>
                  <Text>{(canShowContent && data?.order_nfes_str) || '-'}</Text>
                </Flex>
              </Flex>
            </Box>
            <Divider />
            <Flex
              direction="column"
              w="100%"
            >
              {['create', 'edit'].includes(pageStatus) && (
                <>
                  <Flex
                    my="1rem"
                    w="100%"
                  >
                    <Text
                      pl="1rem"
                      w="30%"
                    >
                      Produto
                    </Text>
                    <Text w="17.5%">Qtd. (Cx)</Text>
                    <Text w="17.5%">Código</Text>
                    <Text w="17.5%">Valor Cx. (R$)</Text>
                    <Text w="17.5%">Total (R$)</Text>
                  </Flex>

                  {newProducts.map((product, index) => (
                    <Flex
                      key={`create-edit-${index}`}
                      align="center"
                      color="#898989"
                      h="4rem"
                      position="relative"
                      w="100%"
                    >
                      <Text
                        bg="#fff"
                        pl="1rem"
                        w="30%"
                      >
                        {product.product_code}
                      </Text>
                      <Text
                        bg="#fff"
                        pl="1rem"
                        w="17.5%"
                      >
                        Qtd.
                      </Text>
                      <Text
                        bg="#fff"
                        w="17.5%"
                      >
                        918237
                      </Text>
                      <Text
                        bg="#fff"
                        w="17.5%"
                      >
                        R$ --
                      </Text>
                      <Text
                        bg="#fff"
                        w="17.5%"
                      >
                        R$ --
                      </Text>
                      <Button
                        bg="#fff"
                        h="2rem"
                        position="absolute"
                        right="0"
                        top="25%"
                        variant="outline"
                        w="2rem"
                      >
                        <Icon
                          as={IoMdTrash}
                          h="16px"
                          w="16px"
                        />
                      </Button>
                    </Flex>
                  ))}
                  <Flex
                    align="center"
                    bg="#F9F9F9"
                    borderBottom="1px solid #DCDCDC"
                    borderTop="1px solid #DCDCDC"
                    color="#898989"
                    h="4rem"
                    w="100%"
                  >
                    <Input
                      bg="#fff"
                      ml=".5rem"
                      mr="4.5rem"
                      pl="1rem"
                      placeholder="Nome ou Código"
                      w="20%"
                    />
                    <Input
                      bg="#fff"
                      mr="12rem"
                      placeholder="Qtd."
                      w="10%"
                    />
                    <Input
                      bg="#fff"
                      placeholder="R$ --"
                      w="20%"
                    />
                    <Icon
                      as={MdClose}
                      h="24px"
                      ml="auto"
                      mr="1rem"
                      w="24px"
                    />
                  </Flex>
                </>
              )}

              {pageStatus === 'show' && (
                <Table
                  colorScheme="gray"
                  variant="striped"
                  w="100%"
                >
                  <Thead>
                    <Tr>
                      <Td
                        pl="1rem"
                        w="25%"
                      >
                        Produto
                      </Td>
                      <Td w="20%">Qtd. (Cx)</Td>
                      <Td
                        px="0"
                        w="20%"
                      >
                        Código
                      </Td>
                      <Td
                        px="0"
                        w="20%"
                      >
                        Valor Cx. (R$)
                      </Td>
                      <Td
                        px="0"
                        w="20%"
                      >
                        Total (R$)
                      </Td>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {data?.order_products.map((product, index) => (
                      <Tr key={`product-${index}`}>
                        <Td
                          pl="1rem"
                          w="20%"
                        >
                          <Flex align="center">
                            <Image
                              alt="product photo"
                              h="32px"
                              src="/product-oil.jpg"
                              w="32px"
                            />
                            <Text
                              as="span"
                              maxW="10rem"
                              ml="1rem"
                              overflow="hidden"
                              textOverflow="ellipsis"
                              whiteSpace="nowrap"
                            >
                              {canShowContent ? product.product.name : '--'}
                            </Text>
                          </Flex>
                        </Td>
                        <Td
                          pl="3rem"
                          w="20%"
                        >
                          {canShowContent ? product.product.amount : '--'}
                        </Td>
                        <Td
                          px="0"
                          w="20%"
                        >
                          {canShowContent ? product.product.code : '--'}
                        </Td>
                        <Td
                          px="0"
                          w="20%"
                        >
                          {canShowContent
                            ? formatCurrency(Number(product.unity_price))
                            : '--'}
                        </Td>
                        <Td
                          px="0"
                          w="20%"
                        >
                          {canShowContent
                            ? formatCurrency(
                                Number(product.unity_price) *
                                  product.product.amount,
                              )
                            : '--'}
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              )}

              {['create', 'edit'].includes(pageStatus) ? (
                <>
                  <Divider />
                  <Button
                    color="#1E93FF"
                    mb="2.5rem"
                    mt="1rem"
                    variant="ghost"
                  >
                    Adicionar Novo Produto
                  </Button>
                </>
              ) : (
                <Box my="1.5rem">
                  <Flex
                    fontSize="14px"
                    justify="space-between"
                  >
                    <Text color="#898989">Total de CXs</Text>
                    <Text>
                      {canShowContent
                        ? data?.order_products.reduce(
                            (acc, product) =>
                              acc + Number(product.product.amount),
                            0,
                          )
                        : '-'}
                    </Text>
                  </Flex>
                  <Divider my="1rem" />
                  <Flex
                    fontSize="14px"
                    fontWeight="600"
                    justify="space-between"
                  >
                    <Text>Total</Text>
                    <Text>
                      {canShowContent
                        ? formatCurrency(
                            Number(
                              data?.order_products.reduce(
                                (acc, product) =>
                                  acc +
                                  (Number(product.unity_price) ?? 0) *
                                    product.product.amount,
                                0,
                              ),
                            ),
                          )
                        : '--'}
                    </Text>
                  </Flex>
                </Box>
              )}
            </Flex>
          </Card>
        </Flex>

        <Flex
          direction="column"
          // eslint-disable-next-line canonical/sort-keys
          ml={{ 'sm': '0', 'md': '0', 'lg': '0', 'xl': '2rem', '2xl': '2rem' }}
          // eslint-disable-next-line canonical/sort-keys
          mt={{ 'sm': '0', 'md': '2rem', 'lg': '2rem', 'xl': '0', '2xl': '0' }}
          // eslint-disable-next-line canonical/sort-keys, prettier/prettier
          w={{
            '2xl': '30%',
            '3xl': '30%',
            'lg': '100%',
            'md': '100%',
            'sm': '100%',
            'xl': '30%',
          }}
        >
          <Card
            mb="1rem"
            w="100%"
          >
            <CardHeader>
              <Flex justify="space-between">
                <Text
                  fontSize="18px"
                  fontWeight="600"
                >
                  {pageStatus === 'create'
                    ? 'Tipo de pedido'
                    : `Pedido ${data?.id}`}
                </Text>
                <Text
                  fontSize="14px"
                  fontWeight="400"
                >
                  {pageStatus === 'create' ? 'Venda' : data?.status}
                </Text>
              </Flex>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <Flex
                align="center"
                justify="space-between"
              >
                <Text
                  fontSize="16px"
                  fontWeight="500"
                >
                  Prazo de Faturamento
                </Text>
                <Text
                  fontSize="14px"
                  fontWeight="400"
                  mr="1rem"
                >
                  28d
                </Text>
              </Flex>
              <Flex
                align="baseline"
                justify="space-between"
              >
                <Flex align="baseline">
                  <Icon
                    as={MdDescription}
                    h="16px"
                    mx=".25rem"
                    w="16px"
                  />
                  <Text
                    fontSize="14px"
                    fontWeight="400"
                  >
                    Pedido Total
                  </Text>
                </Flex>
                <Flex
                  align="center"
                  mt="1.5rem"
                >
                  <Icon
                    as={MdCheckCircle}
                    color="#70B6C1"
                    h="16px"
                    mx=".25rem"
                    w="16px"
                  />
                  <Text
                    fontSize="14px"
                    fontWeight="400"
                  >
                    28d
                  </Text>
                  <Icon
                    as={MdArrowDropDown}
                    h="16px"
                    ml=".25rem"
                    w="16px"
                  />
                </Flex>
              </Flex>
              <Button
                borderColor="#1E93FF"
                color="#1E93FF"
                h="2rem"
                isDisabled={pageStatus === 'create'}
                mt="1rem"
                variant="outline"
                w="100%"
              >
                Aprovar
              </Button>
            </CardHeader>
          </Card>

          <Card mt="1rem">
            <CardHeader>
              <Flex justify="space-between">
                <Text
                  fontSize="16px"
                  fontWeight="500"
                >
                  Prazo de Envio
                </Text>
                <Text
                  fontSize="14px"
                  fontWeight="400"
                  mr="1rem"
                >
                  7d
                </Text>
              </Flex>
              <Flex
                align="baseline"
                justify="space-between"
              >
                <Flex align="center">
                  <Icon
                    as={MdLocalShipping}
                    h="16px"
                    mx=".25rem"
                    w="16px"
                  />
                  <Text
                    fontSize="14px"
                    fontWeight="400"
                  >
                    Envio #1
                  </Text>
                </Flex>
                <Flex
                  align="center"
                  mt="1.5rem"
                >
                  <Text
                    fontSize="14px"
                    fontWeight="400"
                  >
                    7d
                  </Text>
                  <Icon
                    as={MdArrowDropDown}
                    h="16px"
                    ml=".25rem"
                    w="16px"
                  />
                </Flex>
              </Flex>
              <Button
                borderColor="#1E93FF"
                color="#1E93FF"
                h="2rem"
                isDisabled={pageStatus === 'create'}
                mt="1rem"
                variant="outline"
                w="100%"
              >
                Aprovar
              </Button>
            </CardHeader>
          </Card>

          <Card mt="1rem">
            <CardBody
              alignItems="center"
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
              <ButtonGroup
                mb="1rem"
                variant="outline"
                w="9rem"
                isAttached
              >
                <Button
                  bg={currentComments === 'billing' ? '#1E93FF' : 'initial'}
                  borderRadius="8px"
                  color={currentComments === 'billing' ? '#fff' : 'initial'}
                  fontSize="12px"
                  h="1.5rem"
                  onClick={() => setCurrentComments('billing')}
                >
                  Fatur.
                </Button>
                <Button
                  bg={currentComments === 'order' ? '#1E93FF' : 'initial'}
                  borderRadius="8px"
                  color={currentComments === 'order' ? '#fff' : 'initial'}
                  fontSize="12px"
                  h="1.5rem"
                  onClick={() => setCurrentComments('order')}
                >
                  Atend.
                </Button>
              </ButtonGroup>
              <Textarea
                h="4rem"
                mt="1rem"
                placeholder="Observações"
                resize="none"
              ></Textarea>
            </CardBody>
          </Card>
        </Flex>
      </Flex>
    </Box>
  );
}

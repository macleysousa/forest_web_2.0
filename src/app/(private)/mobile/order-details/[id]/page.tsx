'use client';

import { isPrivatePage } from 'src/contexts/AuthContext';
import { useParams } from 'next/navigation';
import { PrivateLayout } from 'src/components/PrivateLayout';
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
  Tr,
  Image,
  Thead,
  useToast,
} from '@chakra-ui/react';
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
import { ButtonOutline } from 'src/components/ui/ButtonOutline';
import { ButtonPrimary } from 'src/components/ui/ButtonPrimary';
import { IoBagCheckSharp } from 'react-icons/io5';
import { IoMdEye, IoMdEyeOff, IoMdTrash } from 'react-icons/io';
import { useEffect, useState } from 'react';
import { BiSolidEditAlt } from 'react-icons/bi';
import { formatCurrency } from 'src/commons/formatters';
import { useQuery } from '@tanstack/react-query';
import { getOrderById } from 'src/services/api/ordersDetailId';
import { SingleDatepicker } from 'chakra-dayzed-datepicker';
import { useRouter } from 'next/navigation';

type PageStatusType = 'create' | 'edit' | 'show';
type CommentsType = 'order' | 'billing';
type OrderProductType = { product: { name: string }; product_code: string; quantity: number; unity_price: string };

function ShowOrderPage() {
  const params = useParams();
  const toast = useToast();
  const router = useRouter();

  const [isContentVisible, setIsContentVisible] = useState<boolean>(true);
  const [pageStatus, setPageStatus] = useState<PageStatusType>('create');
  const [currentComments, setCurrentComments] = useState<CommentsType>('order');
  const [newProducts, setNewProducts] = useState<OrderProductType[]>([]);
  const [date, setDate] = useState(new Date());

  const canShowContent = isContentVisible && pageStatus !== 'create';
  const isValidParam = params?.id !== ' ' && !!Number(params?.id);

  const { data } = useQuery({ queryKey: ['order', params.id], queryFn: () => getOrderById(String(params?.id)) });

  useEffect(() => {
    if (isValidParam) setPageStatus('show');
    else setPageStatus('create');
  }, [isValidParam, params.id]);

  return (
    <PrivateLayout>
      <Box p="2rem">
        <Flex alignItems="end">
          <Heading w="30%" minW="30%" color="#898989" fontSize="24px">
            Pedidos/
            <Text as="span" color="#202020">
              {isValidParam ? params?.id : ''}
            </Text>
          </Heading>
          <Flex align="flex-end" justify="flex-end" minW="70%" w="70%" gap="1rem">
            {['create', 'edit'].includes(pageStatus) ? (
              <>
                <ButtonPrimary w="9rem" p="0 1rem">
                  Salvar
                </ButtonPrimary>
                <ButtonOutline onClick={() => router.replace('/mobile/order-details')}>Cancelar</ButtonOutline>
              </>
            ) : (
              <>
                <ButtonOutline color="#202020" borderColor="#DCDCDC" fontWeight="500">
                  <Icon as={MdFileDownload} h="24px" w="24px" />
                  Visualizar PDF
                </ButtonOutline>
                <ButtonPrimary w="9rem" p="0 1rem">
                  [{data?.status}]
                </ButtonPrimary>
              </>
            )}
          </Flex>
        </Flex>
        <Flex w="100%" my="2rem" direction={{ sm: 'column', md: 'column', lg: 'column', xl: 'row', '2xl': 'row' }}>
          <Flex w={{ sm: '100%', md: '100%', lg: '100%', xl: '70%', '2xl': '70%', '3xl': '70%' }} direction="column">
            <Flex w="100%" gap={5} mb="2rem" justifyContent="space-between">
              <Card w="17rem" h="8rem">
                <CardHeader>
                  <Flex justify="space-between">
                    <Text>Volume Mix</Text>
                    <Icon as={MdViewWeek} color="#1E93FF" h="24px" w="24px" />
                  </Flex>
                  <Text my=".5rem" fontWeight="700" fontSize="24px">
                    {canShowContent ? data?.total_quantity_mix : '--'}
                  </Text>
                </CardHeader>
              </Card>
              <Card w="17rem" h="8rem">
                <CardHeader>
                  <Flex justify="space-between">
                    <Text>Volume</Text>
                    <Icon as={IoBagCheckSharp} color="#1E93FF" h="24px" w="24px" />
                  </Flex>
                  <Text my=".5rem" fontWeight="700" fontSize="24px">
                    {canShowContent ? data?.total_quantity : '--'} csx
                  </Text>
                </CardHeader>
              </Card>
              <Card w="17rem" h="8rem">
                <CardHeader>
                  <Flex justify="space-between">
                    <Text>Valor do Pedido</Text>
                    <Flex>
                      <Icon
                        onClick={() => setIsContentVisible(!isContentVisible)}
                        as={canShowContent ? IoMdEyeOff : IoMdEye}
                        cursor="pointer"
                        h="24px"
                        w="24px"
                        mr=".5rem"
                      />
                      <Icon as={MdPayments} color="#1E93FF" h="24px" w="24px" />
                    </Flex>
                  </Flex>
                  <Text my=".5rem" fontWeight="700" fontSize="24px">
                    {canShowContent ? data?.total_value : 'R$ --'}
                  </Text>
                </CardHeader>
              </Card>
            </Flex>

            <Card minW="29.5rem" px="1rem">
              <CardHeader display="flex" justifyContent="space-between">
                <Text>{canShowContent ? data?.customer?.fantasy_name : '--'}</Text>
                <Menu placement="bottom-end">
                  <MenuButton>
                    <Icon as={MdMoreHoriz} h="24px" w="24px" cursor="pointer" />
                  </MenuButton>
                  <MenuList>
                    <MenuItem
                      fontWeight="500"
                      onClick={() =>
                        pageStatus === 'create'
                          ? toast({ status: 'error', description: 'Não é possivel editar o pedido no momento' })
                          : setPageStatus('edit')
                      }
                    >
                      <Icon h="20px" w="20px" as={BiSolidEditAlt} mr="1rem" />
                      Editar Pedido
                    </MenuItem>
                    <MenuItem
                      fontWeight="500"
                      onClick={() =>
                        pageStatus === 'create'
                          ? toast({ status: 'error', description: 'Não é possivel cancelar o pedido no momento' })
                          : console.log('cancelar')
                      }
                    >
                      <Icon h="20px" w="20px" as={IoMdTrash} mr="1rem" />
                      Cancelar
                    </MenuItem>
                  </MenuList>
                </Menu>
              </CardHeader>
              <Divider />
              <Box display="flex" h="13rem">
                <Box p="1rem" w="50%">
                  <Flex justify="space-between" align="center">
                    <Text color="#898989">CNPJ</Text>
                    {pageStatus === 'create' ? (
                      <Input w="50%" h="2rem" bg="#fff" placeholder="Nome ou CNPJ" />
                    ) : (
                      <Text>{canShowContent ? data?.customer?.cnpj : '--'}</Text>
                    )}
                  </Flex>
                  <Flex justify="space-between" my="1rem">
                    <Text color="#898989">Endereço</Text>
                    <Flex direction="column" align="flex-end" gap=".75rem" minW="6rem">
                      <Text>
                        {canShowContent ? `${data?.customer.address.address}, ${data?.customer.address.number}` : '--'}
                      </Text>
                      <Text>
                        {canShowContent ? `${data?.customer.address.city} - ${data?.customer.address.state}` : '--'}
                      </Text>
                      <Text>{canShowContent ? data?.customer.address.zip : '--'}</Text>
                    </Flex>
                  </Flex>
                  <Flex justify="space-between">
                    <Text color="#898989">Grupo</Text>
                    <Text>{canShowContent ? data?.customer.cnpj : ''}</Text>
                  </Flex>
                </Box>
                <Divider orientation="vertical" />
                <Flex p="1rem" w="50%" direction="column" justify="space-between">
                  <Flex justify="space-between">
                    <Text color="#898989">Data do Pedido</Text>
                    {pageStatus === 'create' ? (
                      <Flex border="1px solid #DCDCDC" w="50%" align="center" pr="1rem" borderRadius={5}>
                        <SingleDatepicker
                          name="date-input"
                          date={date}
                          onDateChange={setDate}
                          propsConfigs={{
                            inputProps: {
                              placeholder: 'Data do Pedido',
                              w: '90%',
                              h: '2rem',
                              bg: '#fff',
                              border: 'none',
                            },
                          }}
                        />
                        <Icon as={MdEventNote} />
                      </Flex>
                    ) : (
                      <Text>{data?.date}</Text>
                    )}
                  </Flex>
                  <Flex justify="space-between">
                    <Text color="#898989">Data do Envio</Text>
                    <Text>{data?.date_send || '-'}</Text>
                  </Flex>
                  <Flex justify="space-between">
                    <Text color="#898989">Data do Faturamento</Text>
                    <Text>{data?.date_billing || '-'}</Text>
                  </Flex>
                  <Flex justify="space-between">
                    <Text color="#898989">Nota Fiscal</Text>
                    <Text>{data?.order_nfes || '-'}</Text>
                  </Flex>
                </Flex>
              </Box>
              <Divider />
              <Flex w="100%" direction="column">
                {['create', 'edit'].includes(pageStatus) && (
                  <>
                    <Flex w="100%" my="1rem">
                      <Text w="30%" pl="1rem">
                        Produto
                      </Text>
                      <Text w="17.5%">Qtd. (Cx)</Text>
                      <Text w="17.5%">Código</Text>
                      <Text w="17.5%">Valor Cx. (R$)</Text>
                      <Text w="17.5%">Total (R$)</Text>
                    </Flex>

                    {newProducts.map((product, index) => (
                      <Flex
                        w="100%"
                        h="4rem"
                        align="center"
                        color="#898989"
                        position="relative"
                        key={`create-edit-${index}`}
                      >
                        <Text bg="#fff" w="30%" pl="1rem">
                          {product.product_code}
                        </Text>
                        <Text bg="#fff" w="17.5%" pl="1rem">
                          Qtd.
                        </Text>
                        <Text bg="#fff" w="17.5%">
                          918237
                        </Text>
                        <Text bg="#fff" w="17.5%">
                          R$ --
                        </Text>
                        <Text bg="#fff" w="17.5%">
                          R$ --
                        </Text>
                        <Button w="2rem" h="2rem" bg="#fff" variant="outline" position="absolute" top="25%" right="0">
                          <Icon as={IoMdTrash} h="16px" w="16px" />
                        </Button>
                      </Flex>
                    ))}
                    <Flex
                      w="100%"
                      borderBottom="1px solid #DCDCDC"
                      borderTop="1px solid #DCDCDC"
                      bg="#F9F9F9"
                      h="4rem"
                      align="center"
                      color="#898989"
                    >
                      <Input bg="#fff" w="20%" ml=".5rem" mr="4.5rem" pl="1rem" placeholder="Nome ou Código" />
                      <Input bg="#fff" w="10%" mr="12rem" placeholder="Qtd." />
                      <Input bg="#fff" w="20%" placeholder="R$ --" />
                      <Icon as={MdClose} ml="auto" mr="1rem" h="24px" w="24px" />
                    </Flex>
                  </>
                )}

                {pageStatus === 'show' && (
                  <Table w="100%" variant="striped" colorScheme="gray">
                    <Thead>
                      <Tr>
                        <Td pl="1rem" w="25%">
                          Produto
                        </Td>
                        <Td w="20%">Qtd. (Cx)</Td>
                        <Td px="0" w="20%">
                          Código
                        </Td>
                        <Td px="0" w="20%">
                          Valor Cx. (R$)
                        </Td>
                        <Td px="0" w="20%">
                          Total (R$)
                        </Td>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {data?.order_products.map((product, index) => (
                        <Tr key={`product-${index}`}>
                          <Td pl="1rem" w="20%">
                            <Flex align="center">
                              <Image src="/product-oil.jpg" alt="product photo" h="32px" w="32px" />
                              <Text
                                ml="1rem"
                                as="span"
                                textOverflow="ellipsis"
                                overflow="hidden"
                                whiteSpace="nowrap"
                                maxW="10rem"
                              >
                                {canShowContent ? product.product.name : '--'}
                              </Text>
                            </Flex>
                          </Td>
                          <Td pl="3rem" w="20%">
                            {canShowContent ? product.product.amount : '--'}
                          </Td>
                          <Td px="0" w="20%">
                            {canShowContent ? product.product.code : '--'}
                          </Td>
                          <Td px="0" w="20%">
                            {canShowContent ? formatCurrency(Number(product.unity_price)) : '--'}
                          </Td>
                          <Td px="0" w="20%">
                            {canShowContent
                              ? formatCurrency(Number(product.unity_price) * product.product.amount)
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
                    <Button variant="ghost" color="#1E93FF" mt="1rem" mb="2.5rem">
                      Adicionar Novo Produto
                    </Button>
                  </>
                ) : (
                  <Box my="1.5rem">
                    <Flex justify="space-between" fontSize="14px">
                      <Text color="#898989">Total de CXs</Text>
                      <Text>
                        {canShowContent
                          ? data?.order_products.reduce((acc, product) => acc + Number(product.product.amount), 0)
                          : '-'}
                      </Text>
                    </Flex>
                    <Divider my="1rem" />
                    <Flex justify="space-between" fontSize="14px" fontWeight="600">
                      <Text>TOTAL</Text>
                      <Text>
                        {canShowContent
                          ? 0
                          : // ? formatCurrency(
                            //     data?.order_products.reduce(
                            //       (acc, product) =>
                            //         acc + Number(product.total_price ?? 0) * Number(product.product.amount ?? 0),
                            //       0
                            //     )
                            //   )
                            '--'}
                      </Text>
                    </Flex>
                  </Box>
                )}
              </Flex>
            </Card>
          </Flex>

          <Flex
            w={{ sm: '100%', md: '100%', lg: '100%', xl: '30%', '2xl': '30%', '3xl': '30%' }}
            direction="column"
            ml={{ sm: '0', md: '0', lg: '0', xl: '2rem', '2xl': '2rem' }}
            mt={{ sm: '0', md: '2rem', lg: '2rem', xl: '0', '2xl': '0' }}
          >
            <Card w="100%" mb="1rem">
              <CardHeader>
                <Flex justify="space-between">
                  <Text fontWeight="600" fontSize="18px">
                    Tipo de Pedido
                  </Text>
                  <Text fontWeight="400" fontSize="14px">
                    Venda
                  </Text>
                </Flex>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Flex justify="space-between" align="center">
                  <Text fontWeight="500" fontSize="16px">
                    Prazo de Faturamento
                  </Text>
                  <Text fontWeight="400" fontSize="14px" mr="1rem">
                    28d
                  </Text>
                </Flex>
                <Flex justify="space-between" align="baseline">
                  <Flex align="baseline">
                    <Icon as={MdDescription} mx=".25rem" w="16px" h="16px" />
                    <Text fontWeight="400" fontSize="14px">
                      Pedido Total
                    </Text>
                  </Flex>
                  <Flex align="center" mt="1.5rem">
                    <Icon as={MdCheckCircle} mx=".25rem" w="16px" h="16px" color="#70B6C1" />
                    <Text fontWeight="400" fontSize="14px">
                      28d
                    </Text>
                    <Icon as={MdArrowDropDown} ml=".25rem" w="16px" h="16px" />
                  </Flex>
                </Flex>
                <ButtonOutline
                  isDisabled={pageStatus === 'create'}
                  color="#1E93FF"
                  borderColor="#1E93FF"
                  w="100%"
                  h="2rem"
                  mt="1rem"
                >
                  Aprovar
                </ButtonOutline>
              </CardHeader>
            </Card>

            <Card mt="1rem">
              <CardHeader>
                <Flex justify="space-between">
                  <Text fontWeight="500" fontSize="16px">
                    Prazo de Envio
                  </Text>
                  <Text fontWeight="400" fontSize="14px" mr="1rem">
                    7d
                  </Text>
                </Flex>
                <Flex justify="space-between" align="baseline">
                  <Flex align="center">
                    <Icon as={MdLocalShipping} mx=".25rem" w="16px" h="16px" />
                    <Text fontWeight="400" fontSize="14px">
                      Envio #1
                    </Text>
                  </Flex>
                  <Flex align="center" mt="1.5rem">
                    <Text fontWeight="400" fontSize="14px">
                      7d
                    </Text>
                    <Icon as={MdArrowDropDown} ml=".25rem" w="16px" h="16px" />
                  </Flex>
                </Flex>
                <ButtonOutline
                  isDisabled={pageStatus === 'create'}
                  color="#1E93FF"
                  borderColor="#1E93FF"
                  w="100%"
                  h="2rem"
                  mt="1rem"
                >
                  Aprovar
                </ButtonOutline>
              </CardHeader>
            </Card>

            <Card mt="1rem">
              <CardBody display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                <ButtonGroup isAttached variant="outline" mb="1rem" w="9rem">
                  <Button
                    onClick={() => setCurrentComments('billing')}
                    h="1.5rem"
                    fontSize="12px"
                    borderRadius="8px"
                    bg={currentComments === 'billing' ? '#1E93FF' : 'initial'}
                    color={currentComments === 'billing' ? '#fff' : 'initial'}
                  >
                    Fatur.
                  </Button>
                  <Button
                    onClick={() => setCurrentComments('order')}
                    h="1.5rem"
                    fontSize="12px"
                    borderRadius="8px"
                    bg={currentComments === 'order' ? '#1E93FF' : 'initial'}
                    color={currentComments === 'order' ? '#fff' : 'initial'}
                  >
                    Atend.
                  </Button>
                </ButtonGroup>
                <Textarea h="4rem" mt="1rem" resize="none" placeholder="Observações"></Textarea>
              </CardBody>
            </Card>
          </Flex>
        </Flex>
      </Box>
    </PrivateLayout>
  );
}

export default isPrivatePage(ShowOrderPage);

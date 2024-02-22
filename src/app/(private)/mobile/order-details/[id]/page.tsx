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

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BiSolidEditAlt } from 'react-icons/bi';
import { IoMdEye, IoMdEyeOff, IoMdTrash } from 'react-icons/io';
import { IoBagCheckSharp } from 'react-icons/io5';

import {
  MdArrowDropDown,
  MdCheckCircle,
  MdClose,
  MdDescription,
  MdFileDownload,
  MdLocalShipping,
  MdMoreHoriz,
  MdPayments,
  MdViewWeek,
} from 'react-icons/md';

import { formatCurrency } from '../../../../../utils/formatters';

type PageStatusType = 'create' | 'edit' | 'show';
type CommentsType = 'order' | 'billing';

export default function ShowOrderPage() {
  const productsExample = [
    {
      amount: 12,
      category_id: 1,
      code: 'ST-1231BR',
      id: 1,
      image: 'products/ST-1231BR.png',
      inventory: null,
      name: 'ST-1231BR - 1030003 - DIESEL OIL TREATMENT 12X450ML',
      product_price_actor_default: {
        actor_id: 838,
        created_at: '2020-07-29T16:15:51.000000Z',
        deleted_at: null,
        deleted_by_user_id: null,
        id: 7109,
        price: '586.38',
        price_alt_1: '601.38',
        price_alt_2: '616.38',
        price_alt_3: '631.38',
        price_alt_4: '646.38',
        price_alt_5: '661.38',
        price_alt_6: '676.38',
        price_alt_7: null,
        price_alt_8: null,
        price_alt_9: null,
        price_alt_10: null,
        product_id: 1,
        tree_id: 1,
        updated_at: '2020-07-29T16:15:51.000000Z',
        updated_by_user_id: 556,
      },
      status: 1,
      unity: 'CX',
    },
    {
      amount: 24,
      category_id: 1,
      code: 'ST-1503BR',
      id: 2,
      image: 'products/ST-1503BR.png',
      inventory: null,
      name: 'ST-1503BR - 1030001 - OIL TREATMENT 24X450ML',
      product_price_actor_default: {
        actor_id: 838,
        created_at: '2020-07-29T16:15:51.000000Z',
        deleted_at: null,
        deleted_by_user_id: null,
        id: 7111,
        price: '786.98',
        price_alt_1: '816.98',
        price_alt_2: '846.98',
        price_alt_3: '876.98',
        price_alt_4: '906.98',
        price_alt_5: '936.98',
        price_alt_6: '966.98',
        price_alt_7: null,
        price_alt_8: null,
        price_alt_9: null,
        price_alt_10: null,
        product_id: 2,
        tree_id: 1,
        updated_at: '2020-07-29T16:15:51.000000Z',
        updated_by_user_id: 556,
      },
      status: 1,
      unity: 'CX',
    },
  ];

  const params = useParams();
  const toast = useToast();

  const [isContentVisible, setIsContentVisible] = useState<boolean>(true);
  const [pageStatus, setPageStatus] = useState<PageStatusType>('create');
  const [currentComments, setCurrentComments] = useState<CommentsType>('order');

  const canShowContent = isContentVisible && pageStatus !== 'create';
  const isValidParam = params?.id !== ' ' && !!Number(params?.id);

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
              <Button variant="outline">Cancelar</Button>
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
                p="0 1rem"
                variant="solid"
                w="9rem"
              >
                [Status Pedido]
              </Button>
            </>
          )}
        </Flex>
      </Flex>
      <Flex
        // eslint-disable-next-line canonical/sort-keys, prettier/prettier
        direction={{ 'sm': 'column', 'md': 'column', 'lg': 'column', 'xl': 'row', '2xl': 'row' }}
        my="2rem"
        w="100%"
      >
        <Flex
          direction="column"
          // eslint-disable-next-line canonical/sort-keys, prettier/prettier
          w={{ 'sm': '100%', 'md': '100%', 'lg': '100%', 'xl': '70%', '2xl': '70%', '3xl': '70%' }}
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
                  {canShowContent ? '29.8' : '--'}
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
                  {canShowContent ? '31' : '--'} csx
                </Text>
              </CardHeader>
            </Card>
            <Card
              h="8rem"
              w="17rem"
            >
              <CardHeader>
                <Flex justify="space-between">
                  <Text>Volume do Pedido</Text>
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
                  {canShowContent ? 'R$5.986,92' : 'R$ --'}
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
              <Text>--</Text>
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
              h="13rem"
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
                    <Text>{canShowContent ? '20.360.416/0001-28' : '--'}</Text>
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
                    <Text>{canShowContent ? 'Rua, Número' : '--'}</Text>
                    <Text>{canShowContent ? 'Cidade - Estado' : '--'}</Text>
                    <Text>{canShowContent ? 'CEP' : '--'}</Text>
                  </Flex>
                </Flex>
                <Flex justify="space-between">
                  <Text color="#898989">Grupo</Text>
                  <Text>{canShowContent ? 'Postos JetOil' : ''}</Text>
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
                  <Text>10 Fev 2023 às 13h43</Text>
                </Flex>
                <Flex justify="space-between">
                  <Text color="#898989">Data do Envio</Text>
                  <Text>-</Text>
                </Flex>
                <Flex justify="space-between">
                  <Text color="#898989">Data do Faturamento</Text>
                  <Text>-</Text>
                </Flex>
                <Flex justify="space-between">
                  <Text color="#898989">Nota Fiscal</Text>
                  <Text>-</Text>
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

                  {Array.apply(0, Array(3)).map((_, index) => (
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
                        Nome ou Código
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
                    {productsExample.map((product, index) => (
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
                              {canShowContent ? product.name : '--'}
                            </Text>
                          </Flex>
                        </Td>
                        <Td
                          pl="3rem"
                          w="20%"
                        >
                          {canShowContent ? product.amount : '--'}
                        </Td>
                        <Td
                          px="0"
                          w="20%"
                        >
                          {canShowContent ? product.code : '--'}
                        </Td>
                        <Td
                          px="0"
                          w="20%"
                        >
                          {canShowContent
                            ? formatCurrency(
                                Number(
                                  product.product_price_actor_default.price,
                                ),
                              )
                            : '--'}
                        </Td>
                        <Td
                          px="0"
                          w="20%"
                        >
                          {canShowContent
                            ? formatCurrency(
                                Number(
                                  product.product_price_actor_default.price,
                                ) * product.amount,
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
                        ? productsExample.reduce(
                            (acc, product) => acc + Number(product.amount),
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
                    <Text>TOTAL</Text>
                    <Text>
                      {canShowContent
                        ? formatCurrency(
                            productsExample.reduce(
                              (acc, product) =>
                                acc +
                                Number(
                                  product.product_price_actor_default.price,
                                ) *
                                  Number(product.amount),
                              0,
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
          w={{ 'sm': '100%', 'md': '100%', 'lg': '100%', 'xl': '30%', '2xl': '30%', '3xl': '30%' }}
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
                  Tipo de Pedido
                </Text>
                <Text
                  fontSize="14px"
                  fontWeight="400"
                >
                  Venda
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

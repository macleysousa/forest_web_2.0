'use client';

import { isPrivatePage } from 'src/contexts/AuthContext';
import { useParams } from 'next/navigation';
import { PrivateLayout } from 'src/components/PrivateLayout';
import {
  Box,
  Button,
  Card,
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
  Tr,
  Image,
  Thead,
  useToast,
} from '@chakra-ui/react';
import { MdArrowDropDown, MdCheckCircle, MdClose, MdDescription, MdMoreHoriz } from 'react-icons/md';
import { ButtonOutline } from 'src/components/ui/ButtonOutline';
import { ButtonPrimary } from 'src/components/ui/ButtonPrimary';
import { IoMdTrash } from 'react-icons/io';
import { useEffect, useState } from 'react';
import { BiSolidEditAlt } from 'react-icons/bi';
import { formatCurrency } from 'src/commons/formatters';

type PageStatusType = 'create' | 'edit' | 'show';

function ShowOrderPage() {
  const productsExample = [
    {
      id: 1,
      code: 'ST-1231BR',
      name: 'ST-1231BR - 1030003 - DIESEL OIL TREATMENT 12X450ML',
      unity: 'CX',
      amount: 12,
      category_id: 1,
      status: 1,
      image: 'products/ST-1231BR.png',
      inventory: null,
      product_price_actor_default: {
        id: 7109,
        tree_id: 1,
        actor_id: 838,
        product_id: 1,
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
        updated_by_user_id: 556,
        deleted_by_user_id: null,
        created_at: '2020-07-29T16:15:51.000000Z',
        updated_at: '2020-07-29T16:15:51.000000Z',
        deleted_at: null,
      },
    },
    {
      id: 2,
      code: 'ST-1503BR',
      name: 'ST-1503BR - 1030001 - OIL TREATMENT 24X450ML',
      unity: 'CX',
      amount: 24,
      category_id: 1,
      status: 1,
      image: 'products/ST-1503BR.png',
      inventory: null,
      product_price_actor_default: {
        id: 7111,
        tree_id: 1,
        actor_id: 838,
        product_id: 2,
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
        updated_by_user_id: 556,
        deleted_by_user_id: null,
        created_at: '2020-07-29T16:15:51.000000Z',
        updated_at: '2020-07-29T16:15:51.000000Z',
        deleted_at: null,
      },
    },
  ];

  const params = useParams();
  const toast = useToast();

  const [pageStatus, setPageStatus] = useState<PageStatusType>('create');

  const isValidParam = params?.id !== ' ' && !!Number(params?.id);

  useEffect(() => {
    if (isValidParam) setPageStatus('show');
    else setPageStatus('create');
  }, [isValidParam, params.id]);

  return (
    <PrivateLayout>
      <Box p="2rem">
        <Flex alignItems="end">
          <Heading w="40%" color="#898989" fontSize="24px" display="flex" alignItems="baseline">
            Pedidos/
            {pageStatus === 'create' ? (
              <Flex align="center">
                <Input w="50%" h="2rem" mx="1rem" bg="#fff" placeholder="Nome ou CNPJ" />
                <Button w="10rem" bg="#775DA620" color="#1E93FF">
                  Novo Pedido
                </Button>
              </Flex>
            ) : (
              <Text as="span" color="#202020">
                {isValidParam ? params?.id : ''}
              </Text>
            )}
          </Heading>
          <Flex align="flex-end" justify="flex-end" w="60%" gap="1rem">
            {['create', 'edit'].includes(pageStatus) ? (
              <>
                <ButtonPrimary w="9rem" p="0 1rem">
                  Salvar
                </ButtonPrimary>
                <ButtonOutline>Cancelar</ButtonOutline>
              </>
            ) : (
              <>
                <ButtonPrimary w="9rem" p="0 1rem">
                  Enviar Pedido
                </ButtonPrimary>
              </>
            )}
          </Flex>
        </Flex>
        <Flex w="100%" my="2rem" direction={{ sm: 'column', md: 'column', lg: 'column', xl: 'row', '2xl': 'row' }}>
          <Flex w={{ sm: '100%', md: '100%', lg: '100%', xl: '70%', '2xl': '70%', '3xl': '70%' }} direction="column">
            <Card minW="29.5rem" px="1rem">
              <CardHeader display="flex" justifyContent="space-between">
                <Text>--</Text>
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
                      <Text>20.360.416/0001-28</Text>
                    )}
                  </Flex>
                  <Flex justify="space-between" my="1rem">
                    <Text color="#898989">Endereço</Text>
                    <Flex direction="column" align="flex-end" gap=".75rem" minW="6rem">
                      <Text>Rua, Número</Text>
                      <Text>Cidade - Estado</Text>
                      <Text>CEP</Text>
                    </Flex>
                  </Flex>
                  <Flex justify="space-between">
                    <Text color="#898989">Grupo</Text>
                    <Text>Postos JetOil</Text>
                  </Flex>
                </Box>
                <Divider orientation="vertical" />
                <Flex p="1rem" w="50%" direction="column" justify="space-between">
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

                    {Array.apply(0, Array(3)).map((_, index) => (
                      <Flex
                        w="100%"
                        h="4rem"
                        align="center"
                        color="#898989"
                        position="relative"
                        key={`create-edit-${index}`}
                      >
                        <Text bg="#fff" w="30%" pl="1rem">
                          Nome ou Código
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
                      {productsExample.map((product, index) => (
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
                                {product.name}
                              </Text>
                            </Flex>
                          </Td>
                          <Td pl="3rem" w="20%">
                            {product.amount}
                          </Td>
                          <Td px="0" w="20%">
                            {product.code}
                          </Td>
                          <Td px="0" w="20%">
                            {formatCurrency(Number(product.product_price_actor_default.price))}
                          </Td>
                          <Td px="0" w="20%">
                            {formatCurrency(Number(product.product_price_actor_default.price) * product.amount)}
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
                      <Text>{productsExample.reduce((acc, product) => acc + Number(product.amount), 0)}</Text>
                    </Flex>
                    <Divider my="1rem" />
                    <Flex justify="space-between" fontSize="14px" fontWeight="600">
                      <Text>TOTAL</Text>
                      <Text>
                        {formatCurrency(
                          productsExample.reduce(
                            (acc, product) =>
                              acc + Number(product.product_price_actor_default.price) * Number(product.amount),
                            0
                          )
                        )}
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
          </Flex>
        </Flex>
      </Box>
    </PrivateLayout>
  );
}

export default isPrivatePage(ShowOrderPage);

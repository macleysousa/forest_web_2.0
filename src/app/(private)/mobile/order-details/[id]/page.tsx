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
} from '@chakra-ui/react';
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
import { ButtonOutline } from 'src/components/ui/ButtonOutline';
import { ButtonPrimary } from 'src/components/ui/ButtonPrimary';
import { IoBagCheckSharp } from 'react-icons/io5';
import { IoMdEye, IoMdEyeOff, IoMdTrash } from 'react-icons/io';
import { useState } from 'react';
import { BiSolidEditAlt } from 'react-icons/bi';

type PageStatusType = 'create' | 'edit' | 'show';
type CommentsType = 'order' | 'billing';

function ShowOrderPage() {
  const params = useParams();

  const [isContentVisible, setIsContentVisible] = useState<boolean>(false);
  const [pageStatus, setPageStatus] = useState<PageStatusType>('show');
  const [currentComments, setCurrentComments] = useState<CommentsType>('order');
  const [orderData, setOrderData] = useState<any>({
    visit: {
      actor_id: 0,
      customer_id: 0,
      date_checkin: '2024-02-01T16:29:47.909Z',
      id: 0,
    },
    order: {
      payment_option_need_approval: true,
      type: '',
      status: 'Aguardando aprovação',
      order_comments: '',
      products: [{}],
      payment_option_id: 0,
      billing_comments: '',
      remote_order_number: '',
      scheduled_order_date: '2024-02-01T16:29:47.909Z',
    },
  });

  const canShowContent = isContentVisible && pageStatus !== 'create';

  return (
    <PrivateLayout>
      <Box p="2rem">
        <Flex alignItems="end">
          <Heading w="30%" minW="30%" color="#898989" fontSize="24px">
            Pedidos/
            <Text as="span" color="#202020">
              {params?.id}
            </Text>
          </Heading>
          <Flex align="flex-end" justify="flex-end" minW="70%" w="70%" gap="1rem">
            {pageStatus === 'create' ? (
              <ButtonPrimary w="9rem" p="0 1rem">
                Salvar
              </ButtonPrimary>
            ) : (
              <>
                <ButtonOutline color="#202020" borderColor="#DCDCDC" fontWeight="500">
                  <Icon as={MdFileDownload} h="24px" w="24px" />
                  Visualizar PDF
                </ButtonOutline>
                <ButtonPrimary w="9rem" p="0 1rem">
                  [Status Pedido]
                </ButtonPrimary>
              </>
            )}
          </Flex>
        </Flex>
        <Flex w="100%" my="2rem">
          <Flex w="70%" direction="column">
            <Flex w="100%" gap={5} mb="2rem" justifyContent="space-between">
              <Card w="17rem" h="8rem">
                <CardHeader>
                  <Flex justify="space-between">
                    <Text>Volume Mix</Text>
                    <Icon as={MdViewWeek} color="#1E93FF" h="24px" w="24px" />
                  </Flex>
                  <Text my=".5rem" fontWeight="700" fontSize="24px">
                    {canShowContent ? '29.8' : '--'}
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
                    {canShowContent ? '31' : '--'} csx
                  </Text>
                </CardHeader>
              </Card>
              <Card w="17rem" h="8rem">
                <CardHeader>
                  <Flex justify="space-between">
                    <Text>Volume do Pedido</Text>
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
                    {canShowContent ? 'R$5.986,92' : 'R$ --'}
                  </Text>
                </CardHeader>
              </Card>
            </Flex>

            <Card minW="29.5rem" px="1rem">
              <CardHeader display="flex" justifyContent="space-between">
                <Text>--</Text>
                <Menu placement="bottom-end">
                  <MenuButton>
                    <Icon as={MdMoreHoriz} h="24px" w="24px" cursor="pointer" />
                  </MenuButton>
                  <MenuList>
                    <MenuItem fontWeight="500">
                      <Icon h="20px" w="20px" as={BiSolidEditAlt} mr="1rem" />
                      Editar Pedido
                    </MenuItem>
                    <MenuItem fontWeight="500">
                      <Icon h="20px" w="20px" as={IoMdTrash} mr="1rem" />
                      Cancelar
                    </MenuItem>
                  </MenuList>
                </Menu>
              </CardHeader>
              <Divider />
              <Box display="flex" h="15rem">
                <Box p="1rem" w="50%">
                  <Flex justify="space-between">
                    <Text color="#898989">CNPJ</Text>
                    <Text>{canShowContent ? '20.360.416/0001-28' : '--'}</Text>
                  </Flex>
                  <Flex justify="space-between" my="1rem">
                    <Text color="#898989">Endereço</Text>
                    <Flex direction="column" align="flex-end" gap=".75rem" minW="6rem">
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
                <Flex w="100%" my="1rem" justify={pageStatus === 'show' ? 'unset' : 'space-between'}>
                  <Text
                    w={pageStatus === 'show' ? '20%' : 'initial'}
                    pl="1rem"
                    flex={pageStatus === 'show' ? '2 / 5' : '0'}
                  >
                    Produto
                  </Text>
                  <Text w={pageStatus === 'show' ? '20%' : 'initial'}>Qtd. (Cx)</Text>
                  {pageStatus === 'show' && <Text w="20%">Código</Text>}
                  <Text w={pageStatus === 'show' ? '20%' : 'initial'}>Valor Cx. (R$)</Text>
                  <Text w={pageStatus === 'show' ? '20%' : 'initial'}>Total (R$)</Text>
                </Flex>

                {['create', 'edit'].includes(pageStatus) && (
                  <>
                    <Flex w="100%" h="4rem" align="center" color="#898989" position="relative">
                      <Text bg="#fff" w="25%" pl="1rem">
                        Nome ou Código
                      </Text>
                      <Text bg="#fff" w="25%" pl="1rem">
                        Qtd.
                      </Text>
                      <Text bg="#fff" w="25%">
                        R$ --
                      </Text>
                      <Text bg="#fff" w="25%">
                        R$ --
                      </Text>
                      <Button w="2rem" h="2rem" bg="#fff" variant="outline" position="absolute" top="25%" right="0">
                        <Icon as={IoMdTrash} h="16px" w="16px" />
                      </Button>
                    </Flex>
                    <Flex
                      w="100%"
                      borderBottom="1px solid #DCDCDC"
                      borderTop="1px solid #DCDCDC"
                      bg="#F9F9F9"
                      h="4rem"
                      align="center"
                      color="#898989"
                    >
                      <Input bg="#fff" w="20%" ml=".5rem" mr="2rem" pl="1rem" placeholder="Nome ou Código" />
                      <Input bg="#fff" w="10%" mr="8rem" placeholder="Qtd." />
                      <Input bg="#fff" w="20%" placeholder="R$ --" />
                      <Icon as={MdClose} ml="auto" mr="1rem" h="24px" w="24px" />
                    </Flex>
                  </>
                )}

                {pageStatus === 'show' && (
                  <Table w="100%" variant="striped" colorScheme="gray">
                    <Tbody>
                      {Array.apply(0, Array(3)).map((_, index) => (
                        <Tr key={`product-${index}`}>
                          <Td pl="1rem" w="20%">
                            <Flex align="center">
                              <Image src="/product-oil.jpg" alt="product photo" h="32px" w="32px" />
                              <Text ml="1rem" as="span">
                                Produto 1
                              </Text>
                            </Flex>
                          </Td>
                          <Td w="20%">10</Td>
                          <Td px="0" w="20%">
                            1923874
                          </Td>
                          <Td px="0" w="20%">
                            R$ 1.000,00
                          </Td>
                          <Td px="0" w="20%">
                            R$ 10.000,00
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                )}

                {['create', 'edit'].includes(pageStatus) ? (
                  <>
                    <Divider />
                    <Button variant="ghost" color="#1E93FF">
                      Adicionar Novo Produto
                    </Button>
                  </>
                ) : (
                  <Box my="1.5rem">
                    <Flex justify="space-between" fontSize="14px">
                      <Text color="#898989">Total de CXs</Text>
                      <Text>5</Text>
                    </Flex>
                    <Divider my="1rem" />
                    <Flex justify="space-between" fontSize="14px" fontWeight="600">
                      <Text>TOTAL</Text>
                      <Text>R$ 5.986,92</Text>
                    </Flex>
                  </Box>
                )}
              </Flex>
            </Card>
          </Flex>

          <Flex w="30%" direction="column" ml="2rem">
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
                <Flex justify="space-between">
                  <Text fontWeight="500" fontSize="16px">
                    Prazo de Faturamento
                  </Text>
                  <Text fontWeight="400" fontSize="14px" mr="1rem">
                    28d
                  </Text>
                </Flex>
                <Flex justify="space-between">
                  <Flex align="center">
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
                <Flex justify="space-between">
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

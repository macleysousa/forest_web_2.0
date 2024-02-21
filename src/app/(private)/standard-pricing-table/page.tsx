'use client';
import {
  Box,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
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
import { useId, useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { PrivateLayout } from 'src/components/PrivateLayout';
import { ButtonFilter } from 'src/components/ui/ButtonFilter';
import { ButtonOutline } from 'src/components/ui/ButtonOutline';
import { ButtonPrimary } from 'src/components/ui/ButtonPrimary';
import { isPrivatePage } from 'src/contexts/AuthContext';

const range = (stop: number) => new Array(stop).fill(null).map((_, i) => i);

function StandardPricingTable() {
  const [modal, setModal] = useState({ open: false, loading: false });
  const formId = useId();
  const toast = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setModal({ ...modal, loading: true });

    setTimeout(() => {
      setModal({ ...modal, loading: false });
      toast({
        status: 'error',
        description: 'Não foi possível adicionar, tente novamente mais tarde.',
      });
    }, 3000);
  };

  return (
    <>
      <PrivateLayout>
        <Box p="2rem">
          <Flex align="center">
            <Heading
              mr="auto"
              size="xl"
            >
              Tabela de Preços Padrão
            </Heading>
            <ButtonFilter
              height="2.5rem"
              mr="1rem"
            />
            <ButtonOutline
              borderColor="#1E93FF"
              color="#1E93FF"
              height="2.5rem"
              mr="1rem"
            >
              Exportar
            </ButtonOutline>
            <ButtonPrimary
              height="2.5rem"
              onClick={() => setModal({ ...modal, open: true })}
            >
              Adicionar
            </ButtonPrimary>
          </Flex>
          <TableContainer
            bg="#FFFFFF"
            borderRadius="0.5rem"
            mt="2.5rem"
            shadow="base"
          >
            <Table>
              <Thead>
                <Tr>
                  <Th>Distribuidor</Th>
                  <Th>Produto</Th>
                  <Th textAlign="center">Padrão (UN)</Th>
                  <Th textAlign="center">Padrão (CX)</Th>
                  {range(10).map((n) => (
                    <Th
                      key={n}
                      textAlign="center"
                    >
                      x{n + 1}
                    </Th>
                  ))}
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td fontSize="sm">Multiplebox</Td>
                  <Td>
                    <Text
                      as="span"
                      decoration="underline"
                      display="inline-block"
                      size="sm"
                      w="15rem"
                      whiteSpace="normal"
                    >
                      CROT ST-2085BR FLEX TREAT 236ML REV5
                    </Text>
                  </Td>
                  <Td fontSize="sm">54,01</Td>
                  <Td>
                    <Input
                      h="2rem"
                      placeholder="R$ --"
                      size="xs"
                      w="4.5rem"
                    />
                  </Td>
                  {range(10).map((n) => (
                    <Td key={n}>
                      <Input
                        h="2rem"
                        placeholder="R$ --"
                        size="xs"
                        w="4.5rem"
                      />
                    </Td>
                  ))}
                  <Td>
                    <IconButton
                      aria-label="Opções"
                      bg="transparent"
                      color="#898989"
                      h="2rem"
                      icon={<BsThreeDots />}
                    />
                  </Td>
                </Tr>
                {range(9).map((n1) => (
                  <Tr
                    key={n1}
                    bg={n1 % 2 ? '#FFFFFF' : '#F9F9F9'}
                    userSelect="none"
                  >
                    <Td fontSize="sm">&nbsp;</Td>
                    <Td fontSize="sm">
                      &nbsp;
                      <br />
                      &nbsp;
                    </Td>
                    <Td fontSize="sm">&nbsp;</Td>
                    <Td>&nbsp;</Td>
                    {range(10).map((n2) => (
                      <Td key={n2}>&nbsp;</Td>
                    ))}
                    <Td>&nbsp;</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          <Flex
            align="center"
            justify="space-between"
            mt="2rem"
          >
            <Flex
              align="center"
              gap="0.5rem"
            >
              <Text size="sm">Mostrando</Text>
              <Select
                h="2rem"
                size="xs"
              >
                <option>10</option>
              </Select>
              <Text
                color="#898989"
                size="sm"
                whiteSpace="nowrap"
              >
                itens por página
              </Text>
            </Flex>
            <Flex
              align="center"
              gap="1.25rem"
            >
              <Flex gap="0.5rem">
                <ButtonOutline
                  bg="#FFFFFF"
                  borderColor="#1E93FF"
                  color="#202020"
                  size="sm"
                >
                  1
                </ButtonOutline>
                <ButtonOutline
                  bg="transparent"
                  borderColor="transparent"
                  color="#202020"
                  fontWeight="400"
                  size="sm"
                >
                  2
                </ButtonOutline>
              </Flex>
              <Flex gap="0.5rem">
                <ButtonOutline
                  bg="transparent"
                  borderColor="transparent"
                  color="#898989"
                  fontWeight="400"
                  size="sm"
                >
                  Próx.
                </ButtonOutline>
                <ButtonOutline
                  bg="transparent"
                  borderColor="transparent"
                  color="#898989"
                  fontWeight="400"
                  size="sm"
                >
                  Fim
                </ButtonOutline>
              </Flex>
            </Flex>
          </Flex>
        </Box>
      </PrivateLayout>

      <Modal
        isOpen={modal.open}
        onClose={() => modal.loading || setModal({ ...modal, open: false })}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Adicionar Preço para Produto</ModalHeader>
          <ModalCloseButton isDisabled={modal.loading} />
          <ModalBody>
            <form
              id={formId}
              method="POST"
              onSubmit={handleSubmit}
            >
              <Grid
                gap="1.5rem"
                templateColumns="repeat(2, minmax(0, 1fr))"
              >
                <GridItem colSpan={2}>
                  <FormControl isDisabled={modal.loading}>
                    <FormLabel fontSize="sm">Distribuidor</FormLabel>
                    <Select height="3rem">
                      <option value="">Defina o Distribuidor</option>
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem colSpan={2}>
                  <FormControl isDisabled={modal.loading}>
                    <FormLabel fontSize="sm">Produto</FormLabel>
                    <Select height="3rem">
                      <option value="">Escolha o Produto</option>
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl isDisabled={modal.loading}>
                    <FormLabel fontSize="sm">Preço de Tabela</FormLabel>
                    <Input placeholder="Digite o Valor de Tabela em R$" />
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl isDisabled={modal.loading}>
                    <FormLabel fontSize="sm">Fator</FormLabel>
                    <Input placeholder="Digite o Fator de Multiplicação" />
                  </FormControl>
                </GridItem>
              </Grid>
              <Divider my="1.75rem" />
              <Grid
                gap="1.5rem"
                templateColumns="repeat(2, minmax(0, 1fr))"
              >
                {range(10).map((n) => (
                  <GridItem key={n}>
                    <FormControl isDisabled={modal.loading}>
                      <FormLabel fontSize="sm">Preço X{n + 1}</FormLabel>
                      <Input placeholder="Digite o Valor" />
                    </FormControl>
                  </GridItem>
                ))}
              </Grid>
            </form>
          </ModalBody>
          <ModalFooter gap="0.5rem">
            <ButtonOutline
              borderColor="#1E93FF"
              color="#1E93FF"
              h="2.5rem"
              isDisabled={modal.loading}
              onClick={() => setModal({ ...modal, open: false })}
            >
              Cancelar
            </ButtonOutline>
            <ButtonPrimary
              form={formId}
              h="2.5rem"
              isDisabled={modal.loading}
              type="submit"
            >
              Salvar
            </ButtonPrimary>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default isPrivatePage(StandardPricingTable);

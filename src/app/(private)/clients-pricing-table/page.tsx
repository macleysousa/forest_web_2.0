'use client';

import {
  Box,
  Button,
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
import { ButtonFilter } from '../../../components/ButtonFilter';

const range = (stop: number) =>
  Array.from({ length: stop })
    .fill(null)
    .map((_, i) => i);

export default function StandardPricingTable() {
  const [modal, setModal] = useState({ loading: false, open: false });
  const formId = useId();
  const toast = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setModal({ ...modal, loading: true });

    setTimeout(() => {
      setModal({ ...modal, loading: false });
      toast({
        description: 'Não foi possível adicionar, tente novamente mais tarde.',
        status: 'error',
      });
    }, 3000);
  };

  return (
    <>
      <Box p="2rem">
        <Flex align="center">
          <Heading
            mr="auto"
            size="xl"
          >
            Tabela de Preços por Cliente
          </Heading>
          <ButtonFilter
            height="2.5rem"
            mr="1rem"
          />
          <Button
            borderColor="#1E93FF"
            color="#1E93FF"
            height="2.5rem"
            mr="1rem"
            variant="outline"
          >
            Exportar
          </Button>
          <Button
            height="2.5rem"
            variant="solid"
            onClick={() => setModal({ ...modal, open: true })}
          >
            Adicionar
          </Button>
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
                <Th>Cliente</Th>
                <Th>Produto</Th>
                <Th textAlign="center">Preço (UN)</Th>
                <Th textAlign="center">Preço (CX)</Th>
                <Th textAlign="center">Incentivo</Th>
                <Th textAlign="center">Atualização</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td fontSize="sm">Multiplebox</Td>
                <Td>
                  <Text
                    as="span"
                    display="inline-block"
                    size="sm"
                    w="15rem"
                    whiteSpace="normal"
                  >
                    PPK Dist. Autopeças LTDA 43.316.960/0001-41
                  </Text>
                </Td>
                <Td>
                  <Text
                    as="span"
                    display="inline-block"
                    size="sm"
                    w="15rem"
                    whiteSpace="normal"
                  >
                    CROT ST-2085BR FLEX TREAT 236ML REV5
                  </Text>
                </Td>
                <Td
                  align="center"
                  fontSize="sm"
                >
                  33,05
                </Td>
                <Td>
                  <Input
                    h="2rem"
                    placeholder="R$ --"
                    size="xs"
                    w="4.5rem"
                  />
                </Td>
                <Td>
                  <Input
                    h="2rem"
                    placeholder="R$ --"
                    size="xs"
                    w="4.5rem"
                  />
                </Td>
                <Td>
                  <Text
                    align="center"
                    as="span"
                    display="inline-block"
                    size="sm"
                    w="8rem"
                    whiteSpace="normal"
                  >
                    14/09/23 22:48{' '}
                    <Text
                      as="span"
                      fontWeight="600"
                    >
                      Eric Rodrigues
                    </Text>
                  </Text>
                </Td>
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
                  <Td fontSize="sm">
                    &nbsp;
                    <br />
                    &nbsp;
                  </Td>
                  <Td fontSize="sm">&nbsp;</Td>
                  <Td fontSize="sm">&nbsp;</Td>
                  <Td fontSize="sm">&nbsp;</Td>
                  <Td fontSize="sm">&nbsp;</Td>
                  <Td fontSize="sm">&nbsp;</Td>
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
              <Button
                bg="#FFFFFF"
                borderColor="#1E93FF"
                color="#202020"
                size="sm"
                variant="outline"
              >
                1
              </Button>
              <Button
                bg="transparent"
                borderColor="transparent"
                color="#202020"
                fontWeight="400"
                size="sm"
                variant="outline"
              >
                2
              </Button>
            </Flex>
            <Flex gap="0.5rem">
              <Button
                bg="transparent"
                borderColor="transparent"
                color="#898989"
                fontWeight="400"
                size="sm"
                variant="outline"
              >
                Próx.
              </Button>
              <Button
                bg="transparent"
                borderColor="transparent"
                color="#898989"
                fontWeight="400"
                size="sm"
                variant="outline"
              >
                Fim
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Box>

      <Modal
        isOpen={modal.open}
        onClose={() => modal.loading || setModal({ ...modal, open: false })}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Adicionar Produto</ModalHeader>
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
                    <FormLabel fontSize="sm">Cliente</FormLabel>
                    <Select height="3rem">
                      <option value="">Defina o Cliente</option>
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
                    <FormLabel fontSize="sm">Preço</FormLabel>
                    <Input placeholder="Digite o Valor em R$" />
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl isDisabled={modal.loading}>
                    <FormLabel fontSize="sm">Incentivo</FormLabel>
                    <Input placeholder="Digite o Fator de Multiplicação" />
                  </FormControl>
                </GridItem>
              </Grid>
            </form>
          </ModalBody>
          <ModalFooter gap="0.5rem">
            <Button
              borderColor="#1E93FF"
              color="#1E93FF"
              h="2.5rem"
              isDisabled={modal.loading}
              variant="outline"
              onClick={() => setModal({ ...modal, open: false })}
            >
              Cancelar
            </Button>
            <Button
              form={formId}
              h="2.5rem"
              isDisabled={modal.loading}
              type="submit"
              variant="solid"
            >
              Salvar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

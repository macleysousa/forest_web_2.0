'use client';

import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Select,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Table,
  TableContainer,
  Tabs,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

import { BsThreeDots } from 'react-icons/bs';
import { ButtonFilter } from '../../../../components/ButtonFilter';

const range = (stop: number) =>
  Array.from({ length: stop })
    .fill(null)
    .map((_, i) => i);

export default function GroupPricingTable() {
  return (
    <Box p="2rem">
      <Flex align="center">
        <Heading
          mr="auto"
          size="xl"
        >
          Tabela de Preço por Grupo
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
        >
          Adicionar
        </Button>
      </Flex>

      <Tabs
        defaultIndex={1}
        mt="2rem"
      >
        <TabList>
          <Tab>Produtos</Tab>
          <Tab>Clientes</Tab>
        </TabList>
        <TabPanels mt="0.5rem">
          <TabPanel></TabPanel>
          <TabPanel>
            <TableContainer
              bg="#FFFFFF"
              borderRadius="0.5rem"
              shadow="base"
            >
              <Table>
                <Thead>
                  <Tr>
                    <Th>Distribuidor</Th>
                    <Th>Nome da Tabela</Th>
                    <Th align="center">Produto</Th>
                    <Th align="center">Preço (UN)</Th>
                    <Th align="center">Preço (CX)</Th>
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td fontSize="sm">Leal</Td>
                    <Td fontSize="sm">LEAL - ATLAS</Td>
                    <Td fontSize="sm">
                      <Text
                        as="span"
                        fontWeight="600"
                      >
                        Atlas Veículos e Peça LTDA
                      </Text>
                      <br />
                      <span>053.129.460/0001-07</span>
                    </Td>
                    <Td
                      align="center"
                      fontSize="sm"
                    >
                      33,05
                    </Td>
                    <Td
                      align="center"
                      fontSize="sm"
                    >
                      665,52
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
                      <Td fontSize="sm">&nbsp;</Td>
                      <Td fontSize="sm">
                        &nbsp;
                        <br />
                        &nbsp;
                      </Td>
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
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

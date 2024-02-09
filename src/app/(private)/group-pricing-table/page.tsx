'use client';
import { Box, Flex, Heading, IconButton, Select, Tab, TabList, TabPanel, TabPanels, Table, TableContainer, Tabs, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { useId, useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { PrivateLayout } from 'src/components/PrivateLayout';
import { ButtonFilter } from 'src/components/ui/ButtonFilter';
import { ButtonOutline } from 'src/components/ui/ButtonOutline';
import { ButtonPrimary } from 'src/components/ui/ButtonPrimary';
import { isPrivatePage } from 'src/contexts/AuthContext';

const range = (stop: number) => new Array(stop).fill(null).map((_, i) => i);

function GroupPricingTable() {
  return (
    <PrivateLayout>
      <Box p="2rem">
        <Flex align="center">
          <Heading size="xl" mr="auto">
            Tabela de Preço por Grupo
          </Heading>
          <ButtonFilter height="2.5rem" mr="1rem" />
          <ButtonOutline borderColor="#1E93FF" color="#1E93FF" height="2.5rem" mr="1rem">
            Exportar
          </ButtonOutline>
          <ButtonPrimary height="2.5rem">
            Adicionar
          </ButtonPrimary>
        </Flex>

        <Tabs defaultIndex={1} mt="2rem">
          <TabList>
            <Tab>Produtos</Tab>
            <Tab>Clientes</Tab>
          </TabList>
          <TabPanels mt="0.5rem">
            <TabPanel></TabPanel>
            <TabPanel>
              <TableContainer shadow="base" bg="#FFFFFF" borderRadius="0.5rem">
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
                      <Td fontSize="sm">
                        Leal
                      </Td>
                      <Td fontSize="sm">
                        LEAL - ATLAS
                      </Td>
                      <Td fontSize="sm">
                        <Text as="span" fontWeight="600">Atlas Veículos e Peça LTDA</Text>
                        <br />
                        <span>053.129.460/0001-07</span>
                      </Td>
                      <Td fontSize="sm" align="center">
                        33,05
                      </Td>
                      <Td fontSize="sm" align="center">
                        665,52
                      </Td>
                      <Td>
                        <IconButton aria-label="Opções" icon={<BsThreeDots />} h="2rem" bg="transparent" color="#898989" />
                      </Td>
                    </Tr>
                    {range(9).map((n1) => (
                      <Tr key={n1} bg={n1 % 2 ? '#FFFFFF' : '#F9F9F9'} userSelect="none">
                        <Td fontSize="sm">&nbsp;</Td>
                        <Td fontSize="sm">&nbsp;</Td>
                        <Td fontSize="sm">&nbsp;<br />&nbsp;</Td>
                        <Td fontSize="sm">&nbsp;</Td>
                        <Td fontSize="sm">&nbsp;</Td>
                        <Td fontSize="sm">&nbsp;</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
              <Flex mt="2rem" align="center" justify="space-between">
                <Flex align="center" gap="0.5rem">
                  <Text size="sm">
                    Mostrando
                  </Text>
                  <Select size="xs" h="2rem">
                    <option>10</option>
                  </Select>
                  <Text size="sm" color="#898989" whiteSpace="nowrap">
                    itens por página
                  </Text>
                </Flex>
                <Flex align="center" gap="1.25rem">
                  <Flex gap="0.5rem">
                    <ButtonOutline bg="#FFFFFF" borderColor="#1E93FF" color="#202020" size="sm">
                      1
                    </ButtonOutline>
                    <ButtonOutline bg="transparent" borderColor="transparent" color="#202020" fontWeight="400" size="sm">
                      2
                    </ButtonOutline>
                  </Flex>
                  <Flex gap="0.5rem">
                    <ButtonOutline bg="transparent" borderColor="transparent" color="#898989" fontWeight="400" size="sm">
                      Próx.
                    </ButtonOutline>
                    <ButtonOutline bg="transparent" borderColor="transparent" color="#898989" fontWeight="400" size="sm">
                      Fim
                    </ButtonOutline>
                  </Flex>
                </Flex>
              </Flex>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </PrivateLayout>
  );
}

export default isPrivatePage(GroupPricingTable);

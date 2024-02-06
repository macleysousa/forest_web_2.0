'use client';
import { Box, Flex, Heading, IconButton, Input, Select, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { BsThreeDots } from 'react-icons/bs';
import { PrivateLayout } from 'src/components/PrivateLayout';
import { ButtonFilter } from 'src/components/ui/ButtonFilter';
import { ButtonOutline } from 'src/components/ui/ButtonOutline';
import { ButtonPrimary } from 'src/components/ui/ButtonPrimary';
import { isPrivatePage } from 'src/contexts/AuthContext';

function StandardPricingTable() {
  return (
    <PrivateLayout>
      <Box p="2rem">
        <Flex align="center">
          <Heading size="xl" mr="auto">
            Tabela de Preços Padrão
          </Heading>
          <ButtonFilter height="2.5rem" mr="1rem" />
          <ButtonOutline borderColor="#1E93FF" color="#1E93FF" height="2.5rem" mr="1rem">
            Exportar
          </ButtonOutline>
          <ButtonPrimary height="2.5rem">
            Adicionar
          </ButtonPrimary>
        </Flex>
        <TableContainer mt="2.5rem" shadow="base" bg="#FFFFFF" borderRadius="0.5rem">
          <Table >
            <Thead>
              <Tr>
                <Th>Distribuidor</Th>
                <Th>Produto</Th>
                <Th textAlign="center">Padrão (UN)</Th>
                <Th textAlign="center">Padrão (CX)</Th>
                {new Array(10).fill(null).map((_, i) => i + 1).map((key) => (
                  <Th key={key} textAlign="center">
                    x{key}
                  </Th>
                ))}
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td fontSize="sm">
                  Multiplebox
                </Td>
                <Td>
                  <Text as="span" display="inline-block" size="sm" decoration="underline" whiteSpace="normal" w="15rem">
                    CROT ST-2085BR FLEX TREAT 236ML REV5
                  </Text>
                </Td>
                <Td fontSize="sm">
                  54,01
                </Td>
                <Td>
                  <Input placeholder="R$ --" size="xs" w="4.5rem" h="2rem" />
                </Td>
                {new Array(10).fill(null).map((_, i) => i).map((key) => (
                  <Td key={key}>
                    <Input placeholder="R$ --" size="xs" w="4.5rem" h="2rem" />
                  </Td>
                ))}
                <Td>
                  <IconButton aria-label="Opções" icon={<BsThreeDots />} h="2rem" bg="transparent" color="#898989" />
                </Td>
              </Tr>
              {new Array(9).fill(null).map((_, i) => i).map((key) => (
                <Tr key={key} bg={key % 2 ? '#FFFFFF' : '#F9F9F9'} userSelect="none">
                  <Td fontSize="sm">
                    &nbsp;
                  </Td>
                  <Td fontSize="sm">
                    &nbsp;<br />&nbsp;
                  </Td>
                  <Td fontSize="sm">
                    &nbsp;
                  </Td>
                  <Td>
                    &nbsp;
                  </Td>
                  {new Array(10).fill(null).map((_, i) => i).map((key) => (
                    <Td key={key}>
                      &nbsp;
                    </Td>
                  ))}
                  <Td>
                    &nbsp;
                  </Td>
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
              <ButtonOutline bg="#FFFFFF" border="#1E93FF" color="#202020" size="sm">
                1
              </ButtonOutline>
              <ButtonOutline bg="transparent" border="transparent" color="#202020" fontWeight="400" size="sm">
                2
              </ButtonOutline>
            </Flex>
            <Flex gap="0.5rem">
              <ButtonOutline bg="transparent" border="transparent" color="#898989" fontWeight="400" size="sm">
                Próx.
              </ButtonOutline>
              <ButtonOutline bg="transparent" border="transparent" color="#898989" fontWeight="400" size="sm">
                Fim
              </ButtonOutline>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </PrivateLayout>
  );
}

export default isPrivatePage(StandardPricingTable);

'use client';
import { Badge, Box, Flex, Heading, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { PrivateLayout } from 'src/components/PrivateLayout';
import { ButtonFilter } from 'src/components/ui/ButtonFilter';
import { ButtonOutline } from 'src/components/ui/ButtonOutline';

export default function InvoicesPage() {
  return (
    <PrivateLayout>
      <Box padding="2rem">
        <Flex alignItems="center">
          <Heading>
            Notas Fiscais
          </Heading>
          <Flex marginLeft="auto" gap="2rem">
            <ButtonFilter placeContent="flex-start" width="22.5rem" isDisabled />
            <ButtonOutline color="#1E93FF" borderColor="#1E93FF">
              Exportar
            </ButtonOutline>
          </Flex>
        </Flex>
        <Flex marginTop="1.5rem" gap="3.25rem">
          {
            [
              { label: 'Período', value: (<span>de 03/04<br /> a 06/09</span>), size: 'lg' },
              { label: 'Volume', value: '76.321', size: '2xl' },
              { label: 'Volume Mix', value: '37.097', size: '2xl' },
              { label: 'Cobertura', value: '364', size: '4xl' },
              { label: 'Produtos', value: '25', size: '4xl' },
              { label: 'Valor Total', value: 'R$ 3.250.103.99', size: 'sm' },
            ].map(({ label, value, size }) => (
              <Flex
                background="#FFFFFF"
                border="1px solid #DCDCDC"
                textAlign="center"
                width="9rem"
                height="6.8125rem"
                flexDirection="column"
                borderRadius="0.5rem"
                paddingTop="1.25rem"
                paddingBottom="1.25rem"
                key={label}
              >
                <Text fontSize="sm">
                  {label}
                </Text>
                <Flex flexGrow="1" justifyContent="center" alignItems="center">
                  <Text fontSize={size} fontWeight="700">
                    {value}
                  </Text>
                </Flex>
              </Flex>
            ))
          }
        </Flex>
        <TableContainer marginTop="1.5rem" background="#FFFFFF" borderRadius="0.5rem" boxShadow="base">
          <Table>
            <Thead>
              <Tr>
                <Th textTransform="none">Emissor</Th>
                <Th textTransform="none" textAlign="center">Número</Th>
                <Th textTransform="none" textAlign="center">Tipo</Th>
                <Th textTransform="none" textAlign="center">Data de Emissão</Th>
                <Th textTransform="none" textAlign="center">Cliente</Th>
                <Th textTransform="none" textAlign="center">Cidade/UF</Th>
                <Th textTransform="none" textAlign="center">Segmento</Th>
              </Tr>
            </Thead>
            <Tbody>
              {
                new Array(6).fill(null).map((_, i) => i).map((key, i) => (
                  <Tr key={key} background={i % 2 === 0 ? '#FFFFFF' : '#F9F9F9'}>
                    <Td padding="1.25rem 0.75rem">
                      <Box display="inline-flex" flexDirection="column" gap="0.5rem">
                        <Text as="span" fontSize="xs" textDecoration="underline">
                          PETROMAIS AUTOMOTIVE LTDA.
                        </Text>
                        <Text as="span" fontSize="xs" background="#E9F1F2" color="#70B6C1" textAlign="center">
                          759.288.380/001-49
                        </Text>
                      </Box>
                    </Td>
                    <Td padding="1.25rem 0.75rem" textAlign="center">
                      <Text as="span" fontSize="xs">
                        3040
                      </Text>
                    </Td>
                    <Td padding="1.25rem 0.75rem" textAlign="center">
                      <Badge background="#E9E6EF" color="#775DA6">
                        Venda
                      </Badge>
                    </Td>
                    <Td padding="1.25rem 0.75rem" textAlign="center">
                        <Text as="span" fontSize="xs">
                          17/01/2024
                        </Text>
                        <br />
                        <Text as="span" fontSize="xs">
                          13:45
                        </Text>
                    </Td>
                    <Td padding="1.25rem 0.75rem">
                      <Box display="inline-flex" flexDirection="column" gap="0.5rem">
                        <Text as="span" fontSize="xs" textDecoration="underline">
                          DIVEL DISTRI DE VEICULOS LTDA
                        </Text>
                        <Text as="span" fontSize="xs" background="#E9F1F2" color="#70B6C1" textAlign="center">
                          759.288.380/001-49
                        </Text>
                      </Box>
                    </Td>
                    <Td padding="1.25rem 0.75rem" textAlign="center">
                      <Text as="span" fontSize="xs">
                        Dois Vizinhos - PR
                      </Text>
                    </Td>
                    <Td padding="1.25rem 0.75rem" textAlign="center">
                      <Text as="span" fontSize="xs">
                        Montadoras
                      </Text>
                    </Td>
                  </Tr>
                ))
              }
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </PrivateLayout>
  );
}

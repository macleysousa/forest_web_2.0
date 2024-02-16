'use client';
import { Badge, Box, Flex, Heading, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { CgMenuGridR } from 'react-icons/cg';
import { PrivateLayout } from 'src/components/PrivateLayout';
import { ButtonFilter } from 'src/components/ui/ButtonFilter';
import { ButtonPrimary } from 'src/components/ui/ButtonPrimary';
import { isPrivatePage } from 'src/contexts/AuthContext';


function CustomerPlanningPage() {
  return (
    <PrivateLayout>
      <Box p="2rem">
        <Flex alignItems="center">
          <Heading marginRight="auto">
            Planejamento de Clientes
          </Heading>
          <ButtonFilter width="22.5rem" marginRight="1rem" justifyContent="flex-start" isDisabled />
          <ButtonPrimary leftIcon={<CgMenuGridR fontSize="1.5rem" />} isDisabled>
            Dashboard
          </ButtonPrimary>
        </Flex>
        <Flex marginTop="1.75rem" maxWidth="80rem" justifyContent="space-between" marginLeft="auto" marginRight="auto">
          {
            [
              { label: 'Totais', value: 364 },
              { label: 'Ativos', value: 364 },
              { label: 'Inativos', value: 364 },
              { label: 'Prospects', value: 364 },
              { label: 'Volume Mix', value: 25 },
            ]
              .map(({ label, value }) => (
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
                    <Text fontSize="4xl" fontWeight="700">
                      {value}
                    </Text>
                  </Flex>
                </Flex>
              ))
          }
        </Flex>
        <TableContainer marginTop="2rem" background="#FFFFFF" borderRadius="0.5rem" boxShadow="base">
          <Table>
            <Thead>
              <Tr>
                <Th>Região</Th>
                <Th>Segmento</Th>
                <Th>Parceiro</Th>
                <Th>Bandeira</Th>
                <Th>Cliente</Th>
                <Th>Cidade</Th>
                <Th>Status</Th>
                <Th>Frentistas/Consultores</Th>
              </Tr>
            </Thead>
            <Tbody>
              {
                new Array(6).fill(null).map((_, i) => i).map((key, i) => (
                  <Tr key={key} background={i % 2 === 0 ? '#FFFFFF' : '#F9F9F9'}>
                    <Td padding="1.25rem 0.75rem" textAlign="center">
                      <Text as="span" fontSize="xs">
                        3R - Vitória
                      </Text>
                    </Td>
                    <Td padding="1.25rem 0.75rem" textAlign="center">
                      <Text as="span" fontSize="xs">
                        Outros
                      </Text>
                    </Td>
                    <Td padding="1.25rem 0.75rem" textAlign="center">
                      <Text as="span" fontSize="xs">
                        Bosch
                      </Text>
                    </Td>
                    <Td padding="1.25rem 0.75rem" textAlign="center">
                      <Text as="span" fontSize="xs" display="inline-block" maxWidth="4rem" whiteSpace="normal" lineHeight="1rem">
                        Bosch - Integração
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
                        Campinas
                      </Text>
                    </Td>
                    <Td padding="1.25rem 0.75rem" textAlign="center">
                      <Badge background="#DBEEE7" color="#00A163">
                        A
                      </Badge>
                    </Td>
                    <Td padding="1.25rem 0.75rem" textAlign="center">
                      <Text as="span" fontSize="xs">
                        -
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

export default isPrivatePage(CustomerPlanningPage);
